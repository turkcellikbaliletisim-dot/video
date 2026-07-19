import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {Character, Chip, CountUp, Icon, Logo, Phone, palette, clamp, rise, FONT} from '../components';

/* ============ SCENE 1 — Eski duzen (0-9s) ============ */
export const SceneChaos: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();

  const ring = Math.sin(f / 2.2) * (f > 20 && f < 200 ? 4 : 0);
  const papers = [0, 1, 2, 3, 4];
  const bubbles = [
    {t: 'Sipariş geldi mi?', d: 25},
    {t: '50 adet şarj cihazı', d: 55},
    {t: 'Fiyat güncel mi?', d: 90},
    {t: 'Kampanya görseli??', d: 125},
    {t: 'Acil cevap lütfen', d: 160},
  ];
  const tired = interpolate(f, [150, 240], [0, 1], clamp);

  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 90, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 64, fontWeight: 800, letterSpacing: -1.5, color: palette.ink}}>
          Eski düzen: mesajlar, kâğıtlar, kargaşa
        </div>
        <div style={{fontSize: 30, color: palette.muted, marginTop: 12}}>
          Telekom bayisi her gün aynı döngüyle boğuşuyor
        </div>
      </div>

      {/* counter */}
      <div
        style={{
          position: 'absolute',
          left: 120,
          bottom: 170,
          width: 560,
          height: 180,
          borderRadius: 24,
          background: '#fff',
          boxShadow: '0 24px 60px rgba(6,26,70,0.15)',
          border: '1px solid #E1EAF8',
        }}
      />
      {/* dealer */}
      <div style={{position: 'absolute', left: 270, bottom: 320, transform: `rotate(${tired * 3}deg)`}}>
        <Character variant="dealer" scale={1.05} />
      </div>
      {/* ringing phone */}
      <div style={{position: 'absolute', left: 500, bottom: 380, transform: `rotate(${ring}deg)`}}>
        <div style={{background: palette.navy, borderRadius: 20, padding: 14, boxShadow: '0 10px 30px rgba(6,26,70,0.3)'}}>
          {Icon.phone({size: 52, color: palette.yellow})}
        </div>
        {[0, 1].map((i) => {
          const rr = (f % 40) / 40;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: -10 - i * 12 - rr * 30,
                border: `3px solid rgba(255,211,41,${0.7 * (1 - rr)})`,
                borderRadius: 30,
              }}
            />
          );
        })}
      </div>
      {/* paper stack */}
      {papers.map((i) => {
        const p = rise(f, 20 + i * 22);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 155 + (i % 2) * 26,
              bottom: 370 + i * 14,
              opacity: p,
              transform: `translateY(${(1 - p) * 60}px) rotate(${(i % 2 ? -1 : 1) * (3 + i)}deg)`,
            }}
          >
            <div style={{background: '#fff', border: '1px solid #D9E4F5', borderRadius: 10, padding: 10, width: 120, boxShadow: '0 8px 20px rgba(6,26,70,0.12)'}}>
              <div style={{height: 6, borderRadius: 3, background: '#C9D8F0', margin: '6px 4px'}} />
              <div style={{height: 6, borderRadius: 3, background: '#DCE7F7', margin: '6px 4px', width: '70%'}} />
              <div style={{height: 6, borderRadius: 3, background: '#DCE7F7', margin: '6px 4px', width: '50%'}} />
            </div>
          </div>
        );
      })}
      {/* chat bubbles */}
      {bubbles.map((b, i) => {
        const p = spring({frame: Math.max(0, f - b.d), fps, config: {damping: 12}});
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              right: 150 + (i % 2) * 70,
              top: 250 + i * 108,
              opacity: p,
              transform: `translateX(${(1 - p) * 120}px) scale(${0.6 + p * 0.4})`,
            }}
          >
            <div
              style={{
                background: i % 2 ? '#DCF8C6' : '#fff',
                borderRadius: '20px 20px 4px 20px',
                padding: '16px 24px',
                fontSize: 26,
                fontWeight: 600,
                color: palette.ink,
                boxShadow: '0 10px 26px rgba(6,26,70,0.14)',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              {Icon.chat({size: 30, color: palette.success})}
              {b.t}
            </div>
          </div>
        );
      })}
      {/* stress mark */}
      <div style={{position: 'absolute', left: 320, bottom: 640, opacity: tired, transform: `translateY(${(1 - tired) * 20}px)`}}>
        <div style={{fontSize: 60, fontWeight: 900, color: palette.danger}}>!?</div>
      </div>
    </div>
  );
};

/* ============ SCENE 2 — Kayiplar (9-18s) ============ */
export const SceneLoss: React.FC = () => {
  const f = useCurrentFrame();
  const items = [
    {icon: Icon.box({size: 54, color: palette.danger}), t: 'Yanlış sipariş', d: 10},
    {icon: Icon.clock({size: 54, color: palette.danger}), t: 'Geciken ürün', d: 25},
    {icon: Icon.image({size: 54, color: palette.danger}), t: 'Kayıp kampanya görseli', d: 40},
  ];
  const pts = '0,0 80,30 160,20 240,90 320,120 400,190 480,230';
  const draw = interpolate(f, [20, 110], [0, 1], clamp);
  return (
    <div style={{position: 'absolute', inset: 0}}>
      <div style={{position: 'absolute', top: 100, left: 0, right: 0, textAlign: 'center'}}>
        <div style={{fontSize: 64, fontWeight: 800, letterSpacing: -1.5, color: '#fff'}}>
          Her gecikme, kaçan bir satış
        </div>
        <div style={{fontSize: 30, color: '#9FB4E4', marginTop: 12}}>Dağınık süreç gelir kaybına dönüşür</div>
      </div>
      <div style={{position: 'absolute', top: 300, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 44}}>
        {items.map((it, i) => {
          const p = rise(f, it.d);
          return (
            <div
              key={i}
              style={{
                opacity: p,
                transform: `translateY(${(1 - p) * 40}px)`,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.14)',
                borderRadius: 26,
                padding: '30px 36px',
                width: 330,
                textAlign: 'center',
              }}
            >
              <div style={{display: 'flex', justifyContent: 'center'}}>{it.icon}</div>
              <div style={{fontSize: 27, fontWeight: 700, color: '#fff', marginTop: 16}}>{it.t}</div>
              <div style={{marginTop: 12, display: 'flex', justifyContent: 'center'}}>{Icon.warn({size: 30, color: palette.yellow})}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 150, display: 'flex', justifyContent: 'center'}}>
        <svg width={560} height={260} viewBox="0 0 560 260" style={{overflow: 'visible'}}>
          <polyline
            points={pts}
            fill="none"
            stroke={palette.danger}
            strokeWidth={7}
            strokeLinecap="round"
            strokeDasharray={900}
            strokeDashoffset={900 * (1 - draw)}
          />
          <g opacity={draw > 0.95 ? 1 : 0}>
            <circle cx={480} cy={230} r={10} fill={palette.danger} />
            <text x={470} y={200} fontSize={34} fontWeight={800} fill={palette.danger} fontFamily={FONT} textAnchor="end">
              -%18 gelir
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/* ============ SCENE 3 — BayiGo giris (18-26s) ============ */
export const SceneReveal: React.FC = () => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const lineP = interpolate(f, [0, 30], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});
  const logoP = spring({frame: Math.max(0, f - 18), fps, config: {damping: 13}});
  const chip1 = spring({frame: Math.max(0, f - 60), fps, config: {damping: 14}});
  const chip2 = spring({frame: Math.max(0, f - 72), fps, config: {damping: 14}});
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <svg style={{position: 'absolute', inset: 0, width: '100%', height: '100%'}} viewBox="0 0 1920 1080" preserveAspectRatio="none">
        <path d="M-50 900 C 500 700, 900 1000, 1970 500" fill="none" stroke={palette.blue} strokeWidth={5} opacity={0.8}
          strokeDasharray={2600} strokeDashoffset={2600 * (1 - lineP)} />
        <path d="M-50 300 C 600 500, 1100 100, 1970 700" fill="none" stroke={palette.yellow} strokeWidth={5} opacity={0.9}
          strokeDasharray={2600} strokeDashoffset={2600 * (1 - lineP)} />
        <path d="M-50 640 C 700 640, 1200 900, 1970 300" fill="none" stroke={palette.cyan} strokeWidth={3} opacity={0.5}
          strokeDasharray={2600} strokeDashoffset={2600 * (1 - lineP)} />
      </svg>
      <div style={{textAlign: 'center', transform: `scale(${0.6 + logoP * 0.4})`, opacity: logoP}}>
        <div style={{filter: 'drop-shadow(0 30px 80px rgba(18,104,243,0.5))'}}>
          <Logo w={620} />
        </div>
        <div style={{marginTop: 40, fontSize: 34, color: '#C9D8F5', fontWeight: 500, opacity: chip1}}>
          Bayi operasyonları tek dijital ekosistemde
        </div>
        <div style={{display: 'flex', gap: 34, justifyContent: 'center', marginTop: 44}}>
          <div style={{opacity: chip1, transform: `translateY(${(1 - chip1) * 40}px)`}}>
            <Chip text="BAYİGO MARKET" bg={palette.yellow} size={34} />
          </div>
          <div style={{opacity: chip2, transform: `translateY(${(1 - chip2) * 40}px)`}}>
            <Chip text="BAYİGO MEDYA" bg={palette.cyan} size={34} />
          </div>
        </div>
      </div>
    </div>
  );
};
