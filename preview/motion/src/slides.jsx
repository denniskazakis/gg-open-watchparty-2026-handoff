import React from 'react';
import {registerRoot,Composition,AbsoluteFill,Img,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
// Kleine Animation: nur transform + opacity, ease-out, Endbild == freigegebene PNG.
const ease=Easing.bezier(0.23,1,0.32,1);
const L=({n,from=0,dur=20,y=0,s=1})=>{const f=useCurrentFrame();const p=interpolate(f,[from,from+dur],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp',easing:ease});
  return <AbsoluteFill style={{opacity:p,transform:`translateY(${(1-p)*y}px) scale(${s+(1-s)*p})`}}><Img src={staticFile(`layers/${n}.png`)}/></AbsoluteFill>};
const S1=()=><AbsoluteFill><L n="s1_bg" dur={1}/><L n="s1_ill" from={0} dur={30} y={70}/><L n="s1_logo" from={10} dur={22} s={0.95}/><L n="s1_lol" from={22} y={24}/><L n="s1_wf" from={28} y={30}/><L n="s1_lobby" from={34} y={24}/></AbsoluteFill>;
const S2=()=><AbsoluteFill><L n="s2_bg" dur={1}/><L n="s2_ill" dur={1}/><L n="s2_date" from={6} y={24}/><L n="s2_t19" from={16} y={36}/><L n="s2_t20" from={24} y={36}/><L n="s2_addr" from={34} y={24}/></AbsoluteFill>;
const c={fps:30,width:1080,height:1350,durationInFrames:150};
registerRoot(()=><><Composition id="Slide1" component={S1} {...c}/><Composition id="Slide2" component={S2} {...c}/></>);
