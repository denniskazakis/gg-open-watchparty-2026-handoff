import React from 'react';
import {registerRoot,Composition,AbsoluteFill,Img,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
// Frame 0 = fertige Slide, alle Buchstaben sichtbar. Animation nur transform, kehrt zum Ausgangszustand zurück (loopbar, Naht S1|S2 bleibt deckungsgleich).
const D=150, ease=Easing.bezier(0.23,1,0.32,1);
const pulse=(f,at,amp=.04,len=24)=>1+amp*Math.sin(Math.PI*interpolate(f,[at,at+len],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease}));
const float=f=>-8*Math.sin(2*Math.PI*f/D); // gemeinsamer Schwebe-Zyklus der Illustration
const L=({n,tf=()=>'',origin='50% 50%'})=>{const f=useCurrentFrame();return <AbsoluteFill style={{transform:tf(f),transformOrigin:origin}}><Img src={staticFile(`layers/${n}.png`)}/></AbsoluteFill>};
const ill=f=>`translateY(${float(f)}px)`;
const S1=()=><AbsoluteFill><L n="s1_bg"/><L n="s1_ill" tf={ill}/><L n="s1_logo" origin="540px 110px" tf={f=>`scale(${pulse(f,8,.05)})`}/><L n="s1_lol"/><L n="s1_wf" origin="540px 320px" tf={f=>`scale(${pulse(f,22,.03)})`}/><L n="s1_lobby"/></AbsoluteFill>;
const S2=()=><AbsoluteFill><L n="s2_bg"/><L n="s2_ill" tf={ill}/><L n="s2_date"/><L n="s2_t19" origin="290px 340px" tf={f=>`scale(${pulse(f,10,.06)})`}/><L n="s2_t20" origin="790px 340px" tf={f=>`scale(${pulse(f,30,.06)})`}/><L n="s2_addr"/></AbsoluteFill>;
const c={fps:30,width:1080,height:1350,durationInFrames:D};
registerRoot(()=><><Composition id="Slide1" component={S1} {...c}/><Composition id="Slide2" component={S2} {...c}/></>);
