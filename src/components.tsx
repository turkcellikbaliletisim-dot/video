import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const palette = {navy:'#061A46',blue:'#1268F3',cyan:'#19C5FF',yellow:'#FFD329',white:'#fff',ink:'#101828',success:'#12B76A',danger:'#F04438'};

export const Title: React.FC<{children:React.ReactNode; sub?:string}> = ({children,sub}) => {
  const f=useCurrentFrame(); const {fps}=useVideoConfig(); const p=spring({frame:f,fps,config:{damping:14}});
  return <div style={{transform:`translateY(${(1-p)*45}px)`,opacity:p,textAlign:'center'}}>
    <div style={{fontSize:72,fontWeight:900,letterSpacing:-2}}>{children}</div>
    {sub&&<div style={{fontSize:32,opacity:.78,marginTop:18}}>{sub}</div>}
  </div>;
};

export const Card: React.FC<{title:string; value?:string; icon?:string; delay?:number}> = ({title,value,icon='●',delay=0}) => {
  const f=useCurrentFrame(); const op=interpolate(f,[delay,delay+15],[0,1],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
  return <div style={{opacity:op,transform:`translateY(${(1-op)*30}px)`,background:'#fff',borderRadius:28,padding:28,boxShadow:'0 20px 50px rgba(6,26,70,.14)',minWidth:250}}>
    <div style={{fontSize:30}}>{icon}</div><div style={{fontSize:26,fontWeight:800,marginTop:16,color:palette.ink}}>{title}</div>{value&&<div style={{fontSize:42,fontWeight:900,color:palette.blue,marginTop:10}}>{value}</div>}
  </div>;
};

export const Background:React.FC<{children:React.ReactNode; dark?:boolean}> = ({children,dark=false}) => <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',padding:90,boxSizing:'border-box',background:dark?`radial-gradient(circle at 50% 35%, #143B7A, ${palette.navy} 65%)`:'linear-gradient(135deg,#F7FAFF,#EAF3FF)',color:dark?'#fff':palette.ink,fontFamily:'Arial, sans-serif',overflow:'hidden'}}>{children}</div>;
