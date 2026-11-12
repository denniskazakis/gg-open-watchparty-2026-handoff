import React from 'react';
import {registerRoot,Composition,Sequence,Img,staticFile,useCurrentFrame,interpolate,Easing} from 'remotion';
const D=90,X=15; // 3s pro Slide, 0.5s Überblendung
const Slide=({n})=>{const f=useCurrentFrame();
  const o=interpolate(f,[0,X,D-X,D],[n==1?1:0,1,1,n==3?1:0],{extrapolateRight:'clamp'});
  const s=interpolate(f,[0,D+X],[1,1.04],{easing:Easing.out(Easing.quad)});
  const y=interpolate(f,[0,X],[n==1?0:40,0],{easing:Easing.out(Easing.cubic),extrapolateRight:'clamp'});
  return <Img src={staticFile(`slide${n}.png`)} style={{opacity:o,transform:`translateY(${y}px) scale(${s})`}}/>};
const Reel=()=><div style={{width:1080,height:1350,background:'#218f5b'}}>{[1,2,3].map(n=><Sequence key={n} from={(n-1)*(D-X)} durationInFrames={D+(n<3?X:0)}><Slide n={n}/></Sequence>)}</div>;
registerRoot(()=><Composition id="Reel" component={Reel} durationInFrames={3*D-2*X} fps={30} width={1080} height={1350}/>);
