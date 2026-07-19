import React from 'react';
import {AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {Background, Card, palette, Title} from './components';

const Chaos=()=>{const f=useCurrentFrame();return <Background><div style={{width:'100%'}}><Title sub="Mesajlar, tablolar, kagitlar...">Eski duzen bayinin zamanini tuketiyor</Title><div style={{display:'flex',gap:24,justifyContent:'center',marginTop:70,transform:`rotate(${Math.sin(f/15)*1.5}deg)`}}><Card title="Bekleyen mesaj" value="47" icon="MESAJ"/><Card title="Manuel siparis" value="18" icon="LISTE" delay={8}/><Card title="Geciken urun" value="9" icon="SURE" delay={16}/></div></div></Background>};
const Loss=()=> <Background><div><Title sub="Daginik surec, kacan satis demektir">Her gecikme bir gelir kaybi</Title><div style={{display:'flex',gap:26,marginTop:70}}><Card title="Yanlis stok" icon="!"/><Card title="Eksik gorsel" icon="X" delay={8}/><Card title="Yuksek maliyet" icon="TL" delay={16}/></div></div></Background>;
const Reveal=()=>{const f=useCurrentFrame();const s=interpolate(f,[0,35],[.5,1],{extrapolateRight:'clamp'});return <Background dark><div style={{textAlign:'center',transform:`scale(${s})`,opacity:s}}><Img src={staticFile('assets/logo/bayigo.svg')} style={{width:620}}/><div style={{display:'flex',gap:30,justifyContent:'center',marginTop:45}}><div style={{padding:'20px 42px',borderRadius:40,background:palette.yellow,color:palette.navy,fontSize:34,fontWeight:900}}>MARKET</div><div style={{padding:'20px 42px',borderRadius:40,background:palette.cyan,color:palette.navy,fontSize:34,fontWeight:900}}>MEDIA</div></div></div></Background>};
const Market=()=> <Background><div style={{width:'100%'}}><Title sub="Stok, fiyat, sepet ve cari tek ekranda">BayiGo Market</Title><div style={{display:'flex',gap:25,justifyContent:'center',marginTop:55}}><Card title="Sarj Cihazi" value="Stokta" icon="SARJ"/><Card title="Kulaklik" value="899 TL" icon="SES" delay={8}/><Card title="Powerbank" value="Sepette" icon="PIL" delay={16}/></div></div></Background>;
const Speed=()=>{const f=useCurrentFrame();const x=interpolate(f,[10,90],[0,900],{extrapolateRight:'clamp'});return <Background dark><div style={{width:'100%'}}><Title sub="TDM - Depo - Kurye - Bayi">Siparis hizi kazanca donusur</Title><div style={{position:'relative',height:220,marginTop:60}}><div style={{position:'absolute',left:160,right:160,top:110,height:12,background:'#ffffff33',borderRadius:10}}/><div style={{position:'absolute',left:160+x,top:72,fontSize:52,fontWeight:900}}>KUTU</div></div></div></Background>};
const Media=()=> <Background><div style={{width:'100%'}}><Title sub="Bayi bilgileri otomatik yerlestirilir">BayiGo Media</Title><div style={{display:'flex',gap:28,justifyContent:'center',marginTop:50}}><Card title="Kare gorsel" value="1080x1080" icon="KARE"/><Card title="Story" value="1080x1920" icon="DIKEY" delay={8}/><Card title="Animasyon video" value="Hazir" icon="VIDEO" delay={16}/></div></div></Background>;
const Cost=()=> <Background><div><Title sub="Tek sistem, surekli profesyonel icerik">Ajans maliyetlerini azaltir</Title><div style={{display:'flex',gap:30,marginTop:65}}><Card title="Ajans + video + tasarim" value="Yuksek" icon="TL"/><Card title="BayiGo Media" value="Sabit paket" icon="OK" delay={15}/></div></div></Background>;
const Tdm=()=> <Background dark><div style={{width:'100%'}}><Title sub="Tum bayi agi tek kontrol merkezinde">TDM daha hizli aksiyon alir</Title><div style={{display:'flex',gap:24,justifyContent:'center',marginTop:55}}><Card title="Aktif bayi" value="500" icon="BAYI"/><Card title="Siparis" value="1.248" icon="KUTU" delay={8}/><Card title="Buyume" value="+%27" icon="ARTIS" delay={16}/></div></div></Background>;
const Network=()=> <Background><div><Title sub="Profesyonel, olceklenebilir ve ornek bir yapi">Dijital bayi ekosistemi</Title><div style={{fontSize:54,fontWeight:900,textAlign:'center',marginTop:60}}>BAYI 1 ---- BAYI 2 ---- BAYI 3 ---- BAYI 4</div></div></Background>;
const Final=()=>{const f=useCurrentFrame();const op=interpolate(f,[0,35],[0,1],{extrapolateRight:'clamp'});return <Background dark><div style={{textAlign:'center',opacity:op}}><Img src={staticFile('assets/logo/bayigo.svg')} style={{width:650}}/><div style={{fontSize:48,fontWeight:900,marginTop:36}}>Bayinin isini kolaylastirir.</div><div style={{fontSize:48,fontWeight:900,color:palette.yellow,marginTop:10}}>TDM'nin hizini ve kazancini artirir.</div><div style={{fontSize:28,marginTop:34,opacity:.8}}>Gelecegin bayi ekosistemi, bugun baslar.</div></div></Background>};

export const BayiGoFilm:React.FC=()=> <AbsoluteFill>
  <Sequence from={0} durationInFrames={270}><Chaos/></Sequence>
  <Sequence from={270} durationInFrames={270}><Loss/></Sequence>
  <Sequence from={540} durationInFrames={240}><Reveal/></Sequence>
  <Sequence from={780} durationInFrames={390}><Market/></Sequence>
  <Sequence from={1170} durationInFrames={300}><Speed/></Sequence>
  <Sequence from={1470} durationInFrames={420}><Media/></Sequence>
  <Sequence from={1890} durationInFrames={270}><Cost/></Sequence>
  <Sequence from={2160} durationInFrames={300}><Tdm/></Sequence>
  <Sequence from={2460} durationInFrames={240}><Network/></Sequence>
  <Sequence from={2700} durationInFrames={180}><Final/></Sequence>
</AbsoluteFill>;
