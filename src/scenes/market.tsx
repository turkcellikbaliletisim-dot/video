import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {CountUp, Icon, Phone, palette, clamp, rise} from '../components';

/* ============ SCENE 4 — BayiGo Market (26-39s) ============ */
const PRODUCTS = [
  {name: 'Type-C Şarj Cihazı', price: '850 ₺', stock: 'Stokta 240', icon: 'cable'},
  {name: 'Bluetooth Kulaklık', price: '1.499 ₺', stock: 'Stokta 96', icon: 'headphones'},
  {name: 'Powerbank 20.000', price: '1.250 ₺', stock: 'Stokta 180', icon: 'battery'},
  {name: 'Koruyucu Kılıf', price: '399 ₺', stock: 'Stokta 410', icon: 'box'},
] as const;

const PRESSES = [70, 115, 160];

export const SceneMarket: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phoneP = spring({frame: f, fps, config: {damping: 15}});
  const listY = interpolate(f, [30, 150], [10, -190], clamp);
  const cartCount = Math.min(3, Math.max(0, Math.floor((f - 60) / 45)));
  const panelP = rise(f, 40);
  const stepP = rise(f, 170);

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5, color: palette.ink}}>BayiGo Market</div>
        <div style={{fontSize: 29, color: palette.muted, marginTop: 10}}>Stok, fiyat, sepet ve cari — tek ekranda</div>
      </div>

      {/* phone with catalog */}
      <div style={{position: 'absolute', left: 300, top: 240, transform: `translateY(${(1 - phoneP) * 80}px) scale(${0.85 + phoneP * 0.15})`, opacity: phoneP}}>
        <Phone w={380} glow>
          <div style={{height: 620, position: 'relative', overflow: 'hidden'}}>
            <div style={{background: palette.navy, padding: '40px 22px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <div style={{color: '#fff', fontSize: 22, fontWeight: 800}}>BayiGo <span style={{color: palette.yellow}}>Market</span></div>
              <div style={{position: 'relative'}}>
                {Icon.cart({size: 34, color: '#fff'})}
                <div
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -10,
                    background: palette.yellow,
                    color: palette.navy,
                    fontSize: 17,
                    fontWeight: 900,
                    borderRadius: 999,
                    minWidth: 24,
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `scale(${cartCount > 0 ? 1 + Math.sin(f / 3) * 0.06 : 0})`,
                  }}
                >
                  {cartCount}
                </div>
              </div>
            </div>
            <div style={{transform: `translateY(${listY}px)`}}>
              {PRODUCTS.map((p, i) => {
                const isPressed = Math.abs(f - PRESSES[i]) < 12;
                return (
                  <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, background: '#fff', margin: '12px 14px', borderRadius: 18, padding: 14, boxShadow: '0 6px 18px rgba(6,26,70,0.08)'}}>
                    <div style={{width: 64, height: 64, borderRadius: 14, background: '#EAF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      {p.icon === 'cable' && Icon.cable({size: 34})}
                      {p.icon === 'headphones' && Icon.headphones({size: 34})}
                      {p.icon === 'battery' && Icon.battery({size: 34})}
                      {p.icon === 'box' && Icon.box({size: 34})}
                    </div>
                    <div style={{flex: 1, minWidth: 0}}>
                      <div style={{fontSize: 20, fontWeight: 800, color: palette.ink, whiteSpace: 'nowrap'}}>{p.name}</div>
                      <div style={{fontSize: 16, color: palette.muted, marginTop: 2}}>{p.stock}</div>
                      <div style={{fontSize: 21, fontWeight: 900, color: palette.blue, marginTop: 2}}>{p.price}</div>
                    </div>
                    <div
                      style={{
                        background: isPressed ? palette.yellow : palette.blue,
                        color: isPressed ? palette.navy : '#fff',
                        fontSize: 15,
                        fontWeight: 800,
                        borderRadius: 12,
                        padding: '10px 12px',
                        transform: `scale(${isPressed ? 0.88 : 1})`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {isPressed ? '✓ Eklendi' : 'Sepete Ekle'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Phone>
      </div>

      {/* cari panel */}
      <div style={{position: 'absolute', right: 300, top: 300, opacity: panelP, transform: `translateX(${(1 - panelP) * 80}px)`}}>
        <div style={{background: palette.navy, borderRadius: 28, padding: '30px 38px', color: '#fff', boxShadow: '0 30px 70px rgba(6,26,70,0.35)', width: 430}}>
          <div style={{fontSize: 22, color: '#9FB4E4', fontWeight: 600}}>CARİ HESAP</div>
          <div style={{fontSize: 46, fontWeight: 900, marginTop: 8}}>
            <CountUp to={24750} start={45} end={100} suffix=" ₺" />
          </div>
          <div style={{height: 1, background: 'rgba(255,255,255,0.15)', margin: '18px 0'}} />
          {['Sipariş #4821 onaylandı', 'Sipariş #4822 hazırlanıyor'].map((s, i) => (
            <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: i ? 12 : 0, opacity: rise(f, 120 + i * 20)}}>
              {Icon.check({size: 24, color: palette.success})}
              <div style={{fontSize: 21, color: '#D5E1F8'}}>{s}</div>
            </div>
          ))}
          <div style={{marginTop: 22, background: palette.yellow, color: palette.navy, borderRadius: 14, padding: '14px 0', textAlign: 'center', fontSize: 22, fontWeight: 900, opacity: rise(f, 150), transform: `scale(${0.9 + rise(f, 150) * 0.1})`}}>
            Cari ile Sipariş Ver
          </div>
        </div>
      </div>

      {/* steps */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 120, display: 'flex', justifyContent: 'center', gap: 26, opacity: stepP, transform: `translateY(${(1 - stepP) * 30}px)`}}>
        {['Ürünü incele', 'Sepete ekle', 'Cari ile gönder'].map((s, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <div style={{width: 40, height: 40, borderRadius: 12, background: palette.blue, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900}}>{i + 1}</div>
            <div style={{fontSize: 25, fontWeight: 700, color: palette.ink}}>{s}</div>
            {i < 2 && <div style={{fontSize: 26, color: '#A8BBDD', marginLeft: 12}}>→</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
