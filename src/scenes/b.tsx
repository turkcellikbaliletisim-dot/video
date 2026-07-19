import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Bars, Character, CountUp, Icon, Phone, palette, clamp, rise, FONT} from '../components';

/* ============ SCENE 5 — Lojistik hiz (39-49s) ============ */
export const SceneSpeed: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const nodes = [
    {label: 'TDM', icon: Icon.store({size: 44, color: palette.cyan})},
    {label: 'Depo', icon: Icon.box({size: 44, color: palette.cyan})},
    {label: 'Kurye', icon: Icon.truck({size: 44, color: palette.cyan})},
    {label: 'Bayi', icon: Icon.pin({size: 44, color: palette.yellow})},
  ];
  const pkg = interpolate(f, [30, 170], [0, 1], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const lineDraw = interpolate(f, [10, 50], [0, 1], clamp);
  const y0 = 500;
  const x0 = 260;
  const x1 = 1660;
  const px = x0 + (x1 - x0) * pkg;
  const py = y0 - Math.sin(pkg * Math.PI) * 90;

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5, color: '#fff'}}>Sipariş hızı kazanca dönüşür</div>
        <div style={{fontSize: 29, color: '#9FB4E4', marginTop: 10}}>TDM → Depo → Kurye → Bayi</div>
      </div>

      {/* pipeline */}
      <svg style={{position: 'absolute', inset: 0}} viewBox="0 0 1920 1080">
        <line x1={x0} y1={y0} x2={x1} y2={y0} stroke="rgba(255,255,255,0.25)" strokeWidth={6} strokeDasharray="14 18" />
        <line x1={x0} y1={y0} x2={x0 + (x1 - x0) * lineDraw} y2={y0} stroke={palette.cyan} strokeWidth={6} strokeLinecap="round" />
      </svg>
      {nodes.map((n, i) => {
        const p = spring({frame: Math.max(0, f - (12 + i * 12)), fps, config: {damping: 13}});
        const active = pkg >= i / 3 - 0.02;
        return (
          <div key={i} style={{position: 'absolute', left: x0 + i * ((x1 - x0) / 3) - 85, top: y0 - 120, width: 170, textAlign: 'center', opacity: p, transform: `scale(${0.6 + p * 0.4})`}}>
            <div
              style={{
                width: 110,
                height: 110,
                margin: '0 auto',
                borderRadius: 30,
                background: active ? 'rgba(255,211,41,0.15)' : 'rgba(255,255,255,0.07)',
                border: `2px solid ${active ? palette.yellow : 'rgba(255,255,255,0.2)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: active ? '0 0 40px rgba(255,211,41,0.35)' : 'none',
              }}
            >
              {n.icon}
            </div>
            <div style={{marginTop: 14, fontSize: 26, fontWeight: 800, color: '#fff'}}>{n.label}</div>
            <div style={{fontSize: 19, color: active ? palette.yellow : '#7E92C4', marginTop: 4, fontWeight: 600}}>
              {active ? '✓ tamam' : 'bekliyor'}
            </div>
          </div>
        );
      })}
      {/* moving package */}
      <div style={{position: 'absolute', left: px - 34, top: py - 120, transform: `rotate(${Math.sin(f / 4) * 6}deg)`}}>
        <div style={{background: palette.yellow, borderRadius: 16, padding: 12, boxShadow: '0 14px 40px rgba(255,211,41,0.5)'}}>
          {Icon.box({size: 44, color: palette.navy})}
        </div>
      </div>
      {/* courier character */}
      <div style={{position: 'absolute', left: x0 + (x1 - x0) * pkg - 110, top: y0 + 40, opacity: pkg > 0.35 && pkg < 0.95 ? 1 : 0}}>
        <Character variant="courier" scale={0.62} />
      </div>

      {/* KPI cards */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 110, display: 'flex', justifyContent: 'center', gap: 40}}>
        <div style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 24, padding: '24px 36px', opacity: rise(f, 150), transform: `translateY(${(1 - rise(f, 150)) * 30}px)`, display: 'flex', alignItems: 'center', gap: 18}}>
          {Icon.clock({size: 44, color: palette.cyan})}
          <div>
            <div style={{fontSize: 20, color: '#9FB4E4'}}>Sipariş süresi</div>
            <div style={{fontSize: 38, fontWeight: 900, color: '#fff'}}>
              <CountUp from={48} to={5} start={150} end={200} suffix=" dk" />
            </div>
          </div>
        </div>
        <div style={{background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 24, padding: '24px 36px', opacity: rise(f, 170), transform: `translateY(${(1 - rise(f, 170)) * 30}px)`, display: 'flex', alignItems: 'center', gap: 18}}>
          {Icon.chartUp({size: 44, color: palette.success})}
          <div>
            <div style={{fontSize: 20, color: '#9FB4E4'}}>Aksesuar satışı</div>
            <div style={{fontSize: 38, fontWeight: 900, color: palette.success}}>
              <CountUp to={27} start={170} end={220} prefix="+%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ SCENE 6 — BayiGo Media (49-63s) ============ */
const STAMPS = [
  {t: 'Bayi Adı', d: 100},
  {t: '0537 527 80 80', d: 130},
  {t: 'Mağaza Adresi', d: 160},
  {t: 'Bayi Logosu', d: 190},
];

export const SceneMedia: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phoneP = spring({frame: f, fps, config: {damping: 15}});
  const leftP = rise(f, 10);
  const formatsP = rise(f, 230);

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 76, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5, color: palette.ink}}>BayiGo Medya</div>
        <div style={{fontSize: 29, color: palette.muted, marginTop: 10}}>Profesyonel içerik, bayi bilgileriyle otomatik hazırlanır</div>
      </div>

      {/* left: template selection */}
      <div style={{position: 'absolute', left: 170, top: 250, opacity: leftP, transform: `translateX(${(1 - leftP) * 60}px)`}}>
        <div style={{fontSize: 24, fontWeight: 800, color: palette.muted, marginBottom: 18, letterSpacing: 1}}>KAMPANYA ŞABLONLARI</div>
        {['Süper Fırsat Haftası', 'Tablet + Aksesuar Seti', 'Yeni Sezon Kulaklık'].map((t, i) => {
          const sel = i === 0;
          const p = rise(f, 20 + i * 14);
          return (
            <div
              key={i}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 24}px)`,
                background: '#fff',
                border: sel ? `3px solid ${palette.blue}` : '1px solid #E1EAF8',
                borderRadius: 20,
                padding: '20px 24px',
                width: 380,
                marginBottom: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                boxShadow: sel ? '0 16px 40px rgba(18,104,243,0.22)' : '0 8px 20px rgba(6,26,70,0.08)',
              }}
            >
              <div style={{width: 56, height: 56, borderRadius: 14, background: sel ? palette.blue : '#EAF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {Icon.image({size: 30, color: sel ? '#fff' : palette.blue})}
              </div>
              <div>
                <div style={{fontSize: 23, fontWeight: 800, color: palette.ink}}>{t}</div>
                <div style={{fontSize: 18, color: palette.muted, marginTop: 2}}>{sel ? '✓ Seçildi' : 'Hazır şablon'}</div>
              </div>
            </div>
          );
        })}
        <div style={{display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, opacity: rise(f, 80)}}>
          {Icon.spark({size: 28, color: palette.blue})}
          <div style={{fontSize: 22, fontWeight: 700, color: palette.blue}}>Otomatik kişiselleştirme başladı</div>
        </div>
      </div>

      {/* center arrow */}
      <div style={{position: 'absolute', left: 600, top: 520, fontSize: 54, color: palette.blue, opacity: rise(f, 90)}}>→</div>

      {/* phone: story visual with stamps */}
      <div style={{position: 'absolute', right: 330, top: 210, transform: `scale(${0.8 + phoneP * 0.2})`, opacity: phoneP}}>
        <Phone w={330} glow>
          <div style={{height: 660, position: 'relative', background: `linear-gradient(160deg, ${palette.navy} 0%, #123A8C 70%, ${palette.blue} 100%)`, overflow: 'hidden'}}>
            <div style={{position: 'absolute', top: 46, left: 24, right: 24}}>
              <div style={{color: palette.yellow, fontSize: 19, fontWeight: 800, letterSpacing: 2}}>SÜPER FIRSAT</div>
              <div style={{color: '#fff', fontSize: 40, fontWeight: 900, lineHeight: 1.15, marginTop: 8}}>Haftanın Kampanyası</div>
            </div>
            <div style={{position: 'absolute', top: 210, left: 0, right: 0, display: 'flex', justifyContent: 'center'}}>
              <div style={{width: 150, height: 150, borderRadius: 30, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {Icon.headphones({size: 84, color: '#fff'})}
              </div>
            </div>
            <div style={{position: 'absolute', top: 390, left: 0, right: 0, textAlign: 'center'}}>
              <div style={{color: palette.yellow, fontSize: 44, fontWeight: 900}}>%30 İndirim</div>
              <div style={{color: '#C9D8F5', fontSize: 20, marginTop: 6}}>Tüm aksesuarlarda</div>
            </div>
            {/* stamps */}
            {STAMPS.map((s, i) => {
              const p = spring({frame: Math.max(0, f - s.d), fps, config: {damping: 11}});
              const flash = Math.max(0, 1 - Math.abs(f - s.d - 6) / 10);
              return (
                <div key={i} style={{position: 'absolute', left: 24, right: 24, bottom: 118 - i * 0, top: 470 + i * 42, opacity: p}}>
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.14)',
                      border: `1.5px solid rgba(255,255,255,${0.3 + flash * 0.6})`,
                      boxShadow: flash > 0 ? `0 0 ${30 * flash}px rgba(255,211,41,${flash * 0.8})` : 'none',
                      borderRadius: 12,
                      padding: '7px 14px',
                      color: '#fff',
                      fontSize: 19,
                      fontWeight: 700,
                      transform: `scale(${0.7 + p * 0.3})`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    {Icon.check({size: 20, color: palette.yellow})}
                    {s.t}
                  </div>
                </div>
              );
            })}
          </div>
        </Phone>
      </div>

      {/* formats */}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 96, display: 'flex', justifyContent: 'center', gap: 30, opacity: formatsP, transform: `translateY(${(1 - formatsP) * 30}px)`}}>
        {[
          {icon: Icon.image({size: 34, color: palette.blue}), t: 'Kare 1080×1080'},
          {icon: Icon.video({size: 34, color: palette.blue}), t: 'Story 1080×1920'},
          {icon: Icon.play({size: 34, color: palette.blue}), t: 'Animasyon video'},
        ].map((c, i) => (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, background: '#fff', borderRadius: 999, padding: '14px 28px', boxShadow: '0 10px 26px rgba(6,26,70,0.12)', border: '1px solid #E1EAF8'}}>
            {c.icon}
            <div style={{fontSize: 23, fontWeight: 800, color: palette.ink}}>{c.t}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============ SCENE 7 — Maliyet avantaji (63-72s) ============ */
export const SceneCost: React.FC = () => {
  const f = useCurrentFrame();
  const items = [
    {label: 'Ajans', value: 90, price: '85.000 ₺/ay'},
    {label: 'Tasarımcı', value: 70, price: '60.000 ₺/ay'},
    {label: 'Tekil video', value: 52, price: '25.000 ₺/ay'},
  ];
  const flatP = rise(f, 90);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5, color: '#fff'}}>Maliyetler ayrı ayrı değil, tek pakette</div>
        <div style={{fontSize: 29, color: '#9FB4E4', marginTop: 10}}>Sürekli, hızlı ve kurumsal içerik üretimi</div>
      </div>

      {/* rising cost bars */}
      <div style={{position: 'absolute', left: 220, top: 300, display: 'flex', gap: 46, alignItems: 'flex-end', height: 560}}>
        {items.map((it, i) => {
          const p = rise(f, 15 + i * 18);
          const h = it.value * 5.4 * p;
          return (
            <div key={i} style={{textAlign: 'center', width: 190}}>
              <div style={{fontSize: 26, fontWeight: 900, color: palette.danger, opacity: p, marginBottom: 10}}>{it.price}</div>
              <div
                style={{
                  height: h,
                  borderRadius: '18px 18px 0 0',
                  background: 'linear-gradient(180deg, rgba(240,68,56,0.9), rgba(240,68,56,0.35))',
                  border: '1px solid rgba(240,68,56,0.5)',
                  borderBottom: 'none',
                }}
              />
              <div style={{marginTop: 14, fontSize: 24, fontWeight: 700, color: '#D5E1F8'}}>{it.label}</div>
            </div>
          );
        })}
      </div>

      {/* BayiGo flat package */}
      <div style={{position: 'absolute', right: 300, top: 340, opacity: flatP, transform: `translateX(${(1 - flatP) * 80}px)`}}>
        <div
          style={{
            background: palette.yellow,
            borderRadius: 30,
            padding: '38px 46px',
            width: 460,
            boxShadow: '0 40px 100px rgba(255,211,41,0.35)',
            transform: `scale(${0.9 + flatP * 0.1})`,
          }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            {Icon.check({size: 40, color: palette.navy})}
            <div style={{fontSize: 34, fontWeight: 900, color: palette.navy}}>BayiGo Medya</div>
          </div>
          <div style={{fontSize: 24, fontWeight: 700, color: '#4A3A00', marginTop: 16, lineHeight: 1.5}}>
            Tek sabit paket — tasarım, video ve otomasyon dahil
          </div>
          <div style={{marginTop: 22, height: 16, borderRadius: 8, background: palette.navy, width: '38%'}} />
          <div style={{fontSize: 20, color: '#4A3A00', marginTop: 10, fontWeight: 600}}>Öngörülebilir düşük aylık maliyet</div>
        </div>
        <div style={{marginTop: 26, textAlign: 'center', fontSize: 25, fontWeight: 700, color: '#C9D8F5', opacity: rise(f, 130)}}>
          Ek ekip yok. Ek fatura yok.
        </div>
      </div>
    </div>
  );
};

/* ============ SCENE 8 — TDM paneli (72-82s) ============ */
export const SceneTdm: React.FC = () => {
  const f = useCurrentFrame();
  const kpis = [
    {label: 'Aktif Bayi', value: 500, icon: Icon.store({size: 40, color: palette.cyan}), suffix: ''},
    {label: 'Bu Ay Sipariş', value: 1248, icon: Icon.box({size: 40, color: palette.cyan}), suffix: ''},
    {label: 'Kampanya Kullanımı', value: 86, icon: Icon.chartUp({size: 40, color: palette.success}), suffix: '%'},
  ];
  const chartDraw = interpolate(f, [60, 170], [0, 1], clamp);
  const rows = [
    {n: 'Bayi Merkez Şube', s: 'Aktif', c: palette.success},
    {n: 'Bayi Cadde Mağaza', s: 'Sipariş hazırlanıyor', c: palette.yellow},
    {n: 'Bayi AVM Nokta', s: 'Aktif', c: palette.success},
  ];
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5, color: '#fff'}}>TDM kontrol merkezi</div>
        <div style={{fontSize: 29, color: '#9FB4E4', marginTop: 10}}>Tüm bayi ağı, siparişler ve performans tek panelde</div>
      </div>

      {/* dashboard */}
      <div style={{position: 'absolute', left: 190, top: 240, width: 1330, borderRadius: 30, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', padding: 34, backdropFilter: 'blur(4px)'}}>
        <div style={{display: 'flex', gap: 26}}>
          {kpis.map((k, i) => {
            const p = rise(f, 12 + i * 12);
            return (
              <div key={i} style={{flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 22, padding: '22px 26px', opacity: p, transform: `translateY(${(1 - p) * 26}px)`}}>
                <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
                  {k.icon}
                  <div style={{fontSize: 21, color: '#9FB4E4', fontWeight: 600}}>{k.label}</div>
                </div>
                <div style={{fontSize: 44, fontWeight: 900, color: '#fff', marginTop: 8}}>
                  <CountUp to={k.value} start={12 + i * 12} end={70 + i * 12} suffix={k.suffix} />
                </div>
              </div>
            );
          })}
        </div>
        <div style={{display: 'flex', gap: 26, marginTop: 26}}>
          {/* chart */}
          <div style={{flex: 1.35, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 22, padding: 24}}>
            <div style={{fontSize: 21, color: '#9FB4E4', fontWeight: 600, marginBottom: 8}}>Satış Performansı</div>
            <svg width={640} height={250} viewBox="0 0 640 250" style={{overflow: 'visible'}}>
              {[0, 1, 2, 3].map((i) => (
                <line key={i} x1={0} y1={40 + i * 60} x2={640} y2={40 + i * 60} stroke="rgba(255,255,255,0.08)" strokeWidth={1.5} />
              ))}
              <polyline
                points="0,210 90,190 180,200 270,150 360,140 450,90 540,70 640,40"
                fill="none"
                stroke={palette.cyan}
                strokeWidth={6}
                strokeLinecap="round"
                strokeDasharray={1400}
                strokeDashoffset={1400 * (1 - chartDraw)}
              />
              <polyline
                points="0,210 90,190 180,200 270,150 360,140 450,90 540,70 640,40 L640,250 0,250 Z"
                fill="url(#g)"
                opacity={0.25 * chartDraw}
                stroke="none"
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor={palette.cyan} />
                  <stop offset="1" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          {/* dealer list */}
          <div style={{flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 22, padding: 24}}>
            <div style={{fontSize: 21, color: '#9FB4E4', fontWeight: 600, marginBottom: 12}}>Bayi Durumu</div>
            {rows.map((r, i) => {
              const p = rise(f, 90 + i * 16);
              return (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none', opacity: p, transform: `translateX(${(1 - p) * 30}px)`}}>
                  <div style={{width: 12, height: 12, borderRadius: 6, background: r.c, boxShadow: `0 0 12px ${r.c}`}} />
                  <div style={{flex: 1, fontSize: 21, fontWeight: 700, color: '#fff'}}>{r.n}</div>
                  <div style={{fontSize: 18, color: '#9FB4E4'}}>{r.s}</div>
                </div>
              );
            })}
            <div style={{marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, opacity: rise(f, 150)}}>
              {Icon.eye({size: 26, color: palette.yellow})}
              <div style={{fontSize: 20, color: palette.yellow, fontWeight: 700}}>500+ bayi anlık izleniyor</div>
            </div>
          </div>
        </div>
      </div>
      {/* manager */}
      <div style={{position: 'absolute', right: 60, bottom: 0, opacity: rise(f, 30)}}>
        <Character variant="manager" scale={0.8} wave />
      </div>
    </div>
  );
};

/* ============ SCENE 9 — Dijital ag (82-90s) ============ */
export const SceneNetwork: React.FC = () => {
  const f = useCurrentFrame();
  const hub = {x: 960, y: 560};
  const nodes = [
    {x: 480, y: 380, d: 15},
    {x: 1380, y: 340, d: 30},
    {x: 620, y: 760, d: 45},
    {x: 1290, y: 790, d: 60},
    {x: 960, y: 300, d: 75},
    {x: 340, y: 620, d: 90},
    {x: 1580, y: 600, d: 105},
  ];
  const hubP = rise(f, 5);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 80, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 62, fontWeight: 800, letterSpacing: -1.5, color: '#fff'}}>Örnek olan dijital ağ</div>
        <div style={{fontSize: 29, color: '#9FB4E4', marginTop: 10}}>Profesyonel, ölçeklenebilir ve modern bir yapı</div>
      </div>
      {/* connections */}
      <svg style={{position: 'absolute', inset: 0}} viewBox="0 0 1920 1080">
        {nodes.map((n, i) => {
          const draw = rise(f, n.d);
          return (
            <line
              key={i}
              x1={hub.x}
              y1={hub.y}
              x2={hub.x + (n.x - hub.x) * draw}
              y2={hub.y + (n.y - hub.y) * draw}
              stroke={palette.cyan}
              strokeWidth={2.5}
              opacity={0.55}
              strokeDasharray="8 10"
            />
          );
        })}
      </svg>
      {/* hub */}
      <div style={{position: 'absolute', left: hub.x - 95, top: hub.y - 95, opacity: hubP, transform: `scale(${0.5 + hubP * 0.5})`}}>
        {[0, 1].map((i) => {
          const rr = ((f + i * 30) % 60) / 60;
          return (
            <div key={i} style={{position: 'absolute', inset: -rr * 70, border: `3px solid rgba(255,211,41,${0.6 * (1 - rr)})`, borderRadius: 999}} />
          );
        })}
        <div style={{width: 190, height: 190, borderRadius: 48, background: palette.yellow, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 80px rgba(255,211,41,0.55)'}}>
          <div style={{fontSize: 44, fontWeight: 900, color: palette.navy}}>BayiGo</div>
        </div>
      </div>
      {/* nodes */}
      {nodes.map((n, i) => {
        const p = rise(f, n.d + 6);
        const pulse = 1 + Math.sin((f - n.d) / 8) * 0.05;
        return (
          <div key={i} style={{position: 'absolute', left: n.x - 46, top: n.y - 46, opacity: p, transform: `scale(${p * pulse})`}}>
            <div style={{width: 92, height: 92, borderRadius: 26, background: 'rgba(255,255,255,0.09)', border: `2px solid ${palette.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px rgba(25,197,255,${0.4 * p})`}}>
              {Icon.store({size: 42, color: '#fff'})}
            </div>
            <div style={{textAlign: 'center', marginTop: 8, fontSize: 17, fontWeight: 700, color: '#C9D8F5'}}>Bayi {i + 1}</div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 90, textAlign: 'center', opacity: rise(f, 120)}}>
        <span style={{fontSize: 30, fontWeight: 800, color: '#fff'}}>
          <CountUp to={500} start={110} end={170} suffix="+ " />
        </span>
        <span style={{fontSize: 30, color: '#9FB4E4', fontWeight: 600}}>bayi aynı dijital çatı altında</span>
      </div>
    </div>
  );
};

/* ============ SCENE 10 — Final (90-96s) ============ */
export const SceneFinal: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const logoP = spring({frame: f, fps, config: {damping: 13}});
  const t1 = rise(f, 25);
  const t2 = rise(f, 45);
  const cta = rise(f, 70);
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{textAlign: 'center', transform: `scale(${0.7 + logoP * 0.3})`, opacity: logoP}}>
        <div style={{filter: 'drop-shadow(0 30px 90px rgba(18,104,243,0.55))'}}>
          <svg width={600} height={600 * 0.3125} viewBox="0 0 960 300">
            <rect width="960" height="300" rx="50" fill={palette.navy} stroke="rgba(255,255,255,0.2)" strokeWidth={2} />
            <text x="75" y="205" fontFamily={FONT} fontSize="170" fontWeight={800} fill="#FFFFFF">Bayi</text>
            <rect x="535" y="58" width="330" height="185" rx="42" fill={palette.yellow} />
            <text x="575" y="205" fontFamily={FONT} fontSize="150" fontWeight={900} fill={palette.navy}>Go</text>
          </svg>
        </div>
        <div style={{fontSize: 44, fontWeight: 800, color: '#fff', marginTop: 42, opacity: t1, transform: `translateY(${(1 - t1) * 24}px)`}}>
          Bayinin işini kolaylaştırır.
        </div>
        <div style={{fontSize: 44, fontWeight: 800, color: palette.yellow, marginTop: 8, opacity: t2, transform: `translateY(${(1 - t2) * 24}px)`}}>
          TDM'nin hızını ve kazancını artırır.
        </div>
        <div style={{marginTop: 42, opacity: cta, transform: `translateY(${(1 - cta) * 24}px)`, display: 'inline-flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 999, padding: '18px 44px'}}>
          {Icon.globe({size: 32, color: palette.cyan})}
          <span style={{fontSize: 32, fontWeight: 800, color: '#fff'}}>bayigo.net</span>
          <span style={{fontSize: 24, color: '#9FB4E4', fontWeight: 600}}>— Geleceğin bayi ekosistemi, bugün başlar</span>
        </div>
      </div>
    </div>
  );
};
