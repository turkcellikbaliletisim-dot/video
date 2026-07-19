import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig, Easing} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Manrope';

const {fontFamily} = loadFont();

export const palette = {
  navy: '#061A46',
  navy2: '#0B2A66',
  blue: '#1268F3',
  cyan: '#19C5FF',
  yellow: '#FFD329',
  white: '#FFFFFF',
  ink: '#101828',
  muted: '#5C6B8F',
  success: '#12B76A',
  danger: '#F04438',
  paper: '#F7FAFF',
};

export const FONT = `${fontFamily}, Arial, sans-serif`;
export const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const rise = (f: number, start: number, end = start + 18) =>
  interpolate(f, [start, end], [0, 1], {...clamp, easing: Easing.out(Easing.cubic)});

/* ---------------- Backgrounds ---------------- */

export const Bg: React.FC<{dark?: boolean; children: React.ReactNode}> = ({dark, children}) => {
  const f = useCurrentFrame();
  const drift = Math.sin(f / 50) * 8;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        fontFamily: FONT,
        background: dark
          ? `radial-gradient(1200px 800px at 50% ${30 + drift / 4}%, #16408C 0%, ${palette.navy} 62%)`
          : 'linear-gradient(135deg,#F7FAFF 0%,#E9F2FF 100%)',
        color: dark ? palette.white : palette.ink,
      }}
    >
      {/* subtle grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: dark ? 0.12 : 0.5,
          backgroundImage: dark
            ? 'linear-gradient(#ffffff14 1px, transparent 1px), linear-gradient(90deg,#ffffff14 1px, transparent 1px)'
            : 'linear-gradient(#1268F30D 1px, transparent 1px), linear-gradient(90deg,#1268F30D 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {children}
    </div>
  );
};

/* ---------------- Scene frame with in/out + subtitle ---------------- */

export const Scene: React.FC<{
  dur: number;
  subtitle?: string;
  dark?: boolean;
  children: React.ReactNode;
}> = ({dur, subtitle, dark, children}) => {
  const f = useCurrentFrame();
  const inOp = interpolate(f, [0, 14], [0, 1], clamp);
  const outOp = interpolate(f, [dur - 12, dur - 1], [1, 0], clamp);
  const op = Math.min(inOp, outOp);
  const scale = interpolate(f, [0, dur], [1.03, 1], clamp);
  const subP = rise(f, 8);
  return (
    <Bg dark={dark}>
      <div style={{position: 'absolute', inset: 0, opacity: op, transform: `scale(${scale})`}}>
        {children}
      </div>
      {subtitle ? (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 42,
            display: 'flex',
            justifyContent: 'center',
            opacity: subP * op,
            transform: `translateY(${(1 - subP) * 16}px)`,
          }}
        >
          <div
            style={{
              background: 'rgba(6,26,70,0.82)',
              border: '1px solid rgba(255,255,255,0.16)',
              backdropFilter: 'blur(6px)',
              color: '#fff',
              fontSize: 30,
              fontWeight: 600,
              padding: '14px 34px',
              borderRadius: 18,
              maxWidth: 1500,
              textAlign: 'center',
              lineHeight: 1.35,
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            }}
          >
            {subtitle}
          </div>
        </div>
      ) : null}
    </Bg>
  );
};

/* ---------------- Titles ---------------- */

export const Title: React.FC<{children: React.ReactNode; sub?: string; dark?: boolean}> = ({
  children,
  sub,
  dark,
}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = spring({frame: f, fps, config: {damping: 16, stiffness: 90}});
  const p2 = spring({frame: Math.max(0, f - 5), fps, config: {damping: 16, stiffness: 90}});
  return (
    <div style={{textAlign: 'center'}}>
      <div
        style={{
          fontSize: 66,
          fontWeight: 800,
          letterSpacing: -1.5,
          transform: `translateY(${(1 - p) * 40}px)`,
          opacity: p,
          color: dark ? '#fff' : palette.ink,
        }}
      >
        {children}
      </div>
      {sub ? (
        <div
          style={{
            fontSize: 31,
            fontWeight: 500,
            marginTop: 14,
            opacity: p2 * 0.85,
            transform: `translateY(${(1 - p2) * 24}px)`,
            color: dark ? '#B9CCF2' : palette.muted,
          }}
        >
          {sub}
        </div>
      ) : null}
    </div>
  );
};

/* ---------------- Icons (24x24 stroke) ---------------- */

const I: React.FC<{d: string | string[]; size?: number; color?: string; sw?: number}> = ({
  d,
  size = 48,
  color = palette.blue,
  sw = 1.9,
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {(Array.isArray(d) ? d : [d]).map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

export const Icon = {
  phone: (p?: {size?: number; color?: string}) => <I {...p} d={['M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.9.6 2.8.7a2 2 0 0 1 1.7 2z']} />,
  chat: (p?: {size?: number; color?: string}) => <I {...p} d={['M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z']} />,
  doc: (p?: {size?: number; color?: string}) => <I {...p} d={['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M9 13h6', 'M9 17h6']} />,
  warn: (p?: {size?: number; color?: string}) => <I {...p} d={['M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z', 'M12 9v4', 'M12 17h.01']} />,
  image: (p?: {size?: number; color?: string}) => <I {...p} d={['M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M21 15l-5-5L5 21']} />,
  coin: (p?: {size?: number; color?: string}) => <I {...p} d={['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M15 9.5c-.6-1-1.7-1.5-3-1.5-1.8 0-3 1-3 2.3 0 3 6 1.6 6 4.4 0 1.4-1.3 2.3-3 2.3-1.4 0-2.6-.6-3.2-1.7', 'M12 6v2', 'M12 16v2']} />,
  cart: (p?: {size?: number; color?: string}) => <I {...p} d={['M6 6h15l-1.7 8.5a2 2 0 0 1-2 1.5H8.6a2 2 0 0 1-2-1.6L4.5 4.9A1 1 0 0 0 3.5 4H2', 'M9 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z', 'M17 20.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z']} />,
  box: (p?: {size?: number; color?: string}) => <I {...p} d={['M21 8l-9-5-9 5v8l9 5 9-5V8z', 'M3.3 8.3 12 13l8.7-4.7', 'M12 13v9']} />,
  truck: (p?: {size?: number; color?: string}) => <I {...p} d={['M10 17h4V5H2v12h3', 'M14 8h4l3 4v5h-3', 'M7.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z', 'M17.5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z']} />,
  store: (p?: {size?: number; color?: string}) => <I {...p} d={['M3 9l1.5-5h15L21 9', 'M3 9h18v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9z', 'M9 21v-7h6v7', 'M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0']} />,
  chartUp: (p?: {size?: number; color?: string}) => <I {...p} d={['M3 17l6-6 4 4 8-8', 'M15 7h6v6']} />,
  chartDown: (p?: {size?: number; color?: string}) => <I {...p} d={['M3 7l6 6 4-4 8 8', 'M15 17h6v-6']} />,
  check: (p?: {size?: number; color?: string}) => <I {...p} d="M20 6 9 17l-5-5" />,
  clock: (p?: {size?: number; color?: string}) => <I {...p} d={['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M12 6v6l4 2']} />,
  user: (p?: {size?: number; color?: string}) => <I {...p} d={['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z']} />,
  pin: (p?: {size?: number; color?: string}) => <I {...p} d={['M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z', 'M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z']} />,
  play: (p?: {size?: number; color?: string}) => <I {...p} d="M6 4l14 8-14 8V4z" />,
  video: (p?: {size?: number; color?: string}) => <I {...p} d={['M23 7l-7 5 7 5V7z', 'M14 5H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2z']} />,
  spark: (p?: {size?: number; color?: string}) => <I {...p} d={['M12 2v4', 'M12 18v4', 'M2 12h4', 'M18 12h4', 'M5 5l2.5 2.5', 'M16.5 16.5 19 19', 'M19 5l-2.5 2.5', 'M7.5 16.5 5 19']} />,
  battery: (p?: {size?: number; color?: string}) => <I {...p} d={['M2 7h13v10H2z', 'M18 10h3v4h-3', 'M5 10v4', 'M8 10v4']} />,
  headphones: (p?: {size?: number; color?: string}) => <I {...p} d={['M4 15v-3a8 8 0 0 1 16 0v3', 'M4 15a2 2 0 0 1 2-2h1v6H6a2 2 0 0 1-2-2v-2z', 'M20 15a2 2 0 0 0-2-2h-1v6h1a2 2 0 0 0 2-2v-2z']} />,
  cable: (p?: {size?: number; color?: string}) => <I {...p} d={['M9 2v6', 'M15 2v6', 'M7 8h10v4a5 5 0 0 1-10 0V8z', 'M12 17v5']} />,
  send: (p?: {size?: number; color?: string}) => <I {...p} d={['M22 2 11 13', 'M22 2l-7 20-4-9-9-4 20-7z']} />,
  eye: (p?: {size?: number; color?: string}) => <I {...p} d={['M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z', 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z']} />,
  globe: (p?: {size?: number; color?: string}) => <I {...p} d={['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M2 12h20', 'M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z']} />,
};

/* ---------------- Character (stylized corporate) ---------------- */

export const Character: React.FC<{
  variant: 'dealer' | 'manager' | 'courier' | 'customer';
  scale?: number;
  flip?: boolean;
  wave?: boolean;
}> = ({variant, scale = 1, flip, wave}) => {
  const f = useCurrentFrame();
  const bob = Math.sin(f / 9) * 4;
  const waveRot = wave ? Math.sin(f / 6) * 14 - 14 : 0;
  const skin = '#F2C89B';
  const suit =
    variant === 'manager' ? palette.navy : variant === 'courier' ? palette.blue : variant === 'customer' ? '#3B4A6B' : '#2E3D5C';
  const accent = variant === 'courier' ? palette.yellow : palette.cyan;
  return (
    <svg
      width={220 * scale}
      height={300 * scale}
      viewBox="0 0 220 300"
      style={{transform: flip ? 'scaleX(-1)' : undefined, overflow: 'visible'}}
    >
      <g transform={`translate(0,${bob})`}>
        {/* legs */}
        <rect x="82" y="210" width="22" height="70" rx="10" fill="#1B2742" />
        <rect x="116" y="210" width="22" height="70" rx="10" fill="#16223A" />
        {/* shoes */}
        <rect x="76" y="272" width="34" height="14" rx="7" fill="#0E1730" />
        <rect x="112" y="272" width="34" height="14" rx="7" fill="#0E1730" />
        {/* body */}
        <path d="M60 118 Q60 96 84 92 L136 92 Q160 96 160 118 L160 216 Q160 224 152 224 L68 224 Q60 224 60 216 Z" fill={suit} />
        {variant === 'dealer' && (
          <path d="M78 100 L142 100 L150 224 L70 224 Z" fill={palette.yellow} opacity={0.92} />
        )}
        {variant === 'manager' && <path d="M104 96 L116 96 L112 150 L108 150 Z" fill={palette.yellow} />}
        {variant === 'courier' && <rect x="88" y="120" width="44" height="14" rx="7" fill={accent} />}
        {/* arms */}
        <rect x="42" y="104" width="20" height="86" rx="10" fill={suit} transform="rotate(8 52 108)" />
        <rect x="158" y="104" width="20" height="86" rx="10" fill={suit} transform={`rotate(${-8 + waveRot} 168 108)`} />
        <circle cx="48" cy="192" r="11" fill={skin} />
        <circle cx="172" cy={192 - (wave ? 34 : 0)} r="11" fill={skin} />
        {/* head */}
        <circle cx="110" cy="58" r="34" fill={skin} />
        {/* hair / cap */}
        {variant === 'courier' ? (
          <path d="M76 52 Q76 22 110 22 Q144 22 144 52 L144 56 L76 56 Z" fill={palette.blue} />
        ) : (
          <path d="M78 50 Q82 20 110 20 Q140 20 142 52 Q128 38 110 40 Q90 42 78 50 Z" fill="#26314E" />
        )}
        {variant === 'courier' && <rect x="74" y="50" width="72" height="10" rx="5" fill={palette.navy} />}
        {/* face */}
        <circle cx="98" cy="60" r="4" fill="#26314E" />
        <circle cx="122" cy="60" r="4" fill="#26314E" />
        <path d="M100 74 Q110 80 120 74" stroke="#26314E" strokeWidth={3.5} fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
};

/* ---------------- Phone mockup ---------------- */

export const Phone: React.FC<{w?: number; children: React.ReactNode; glow?: boolean}> = ({
  w = 340,
  children,
  glow,
}) => (
  <div
    style={{
      width: w,
      borderRadius: 44,
      background: '#0B1226',
      padding: 12,
      boxShadow: glow
        ? '0 30px 90px rgba(18,104,243,0.45), 0 0 0 1px rgba(255,255,255,0.08)'
        : '0 30px 70px rgba(6,26,70,0.35)',
    }}
  >
    <div style={{borderRadius: 34, background: '#F4F8FF', overflow: 'hidden', position: 'relative'}}>
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 90,
          height: 16,
          borderRadius: 10,
          background: '#0B1226',
          zIndex: 5,
        }}
      />
      {children}
    </div>
  </div>
);

/* ---------------- Count up number ---------------- */

export const CountUp: React.FC<{
  from?: number;
  to: number;
  start?: number;
  end?: number;
  prefix?: string;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({from = 0, to, start = 0, end = 40, prefix = '', suffix = '', style}) => {
  const f = useCurrentFrame();
  const v = interpolate(f, [start, end], [from, to], {...clamp, easing: Easing.out(Easing.cubic)});
  return <span style={style}>{prefix}{Math.round(v).toLocaleString('tr-TR')}{suffix}</span>;
};

/* ---------------- Logo ---------------- */

export const Logo: React.FC<{w?: number}> = ({w = 560}) => (
  <svg width={w} height={w * 0.3125} viewBox="0 0 960 300">
    <rect width="960" height="300" rx="50" fill={palette.navy} />
    <text x="75" y="205" fontFamily={FONT} fontSize="170" fontWeight={800} fill="#FFFFFF">Bayi</text>
    <rect x="535" y="58" width="330" height="185" rx="42" fill={palette.yellow} />
    <text x="575" y="205" fontFamily={FONT} fontSize="150" fontWeight={900} fill={palette.navy}>Go</text>
  </svg>
);

/* ---------------- Bar chart ---------------- */

export const Bars: React.FC<{
  values: number[];
  labels: string[];
  color?: string;
  start?: number;
  w?: number;
  h?: number;
  highlightLast?: boolean;
}> = ({values, labels, color = palette.blue, start = 0, w = 460, h = 300, highlightLast}) => {
  const f = useCurrentFrame();
  const max = Math.max(...values);
  const bw = 56;
  const gap = (w - values.length * bw) / (values.length + 1);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      {values.map((v, i) => {
        const p = rise(f, start + i * 6);
        const bh = (v / max) * (h - 60) * p;
        const x = gap + i * (bw + gap);
        const c = highlightLast && i === values.length - 1 ? palette.yellow : color;
        return (
          <g key={i}>
            <rect x={x} y={h - 40 - bh} width={bw} height={bh} rx={8} fill={c} opacity={0.95} />
            <text x={x + bw / 2} y={h - 14} textAnchor="middle" fontSize={19} fontWeight={600} fill="#8FA3CC" fontFamily={FONT}>
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ---------------- Chip ---------------- */

export const Chip: React.FC<{text: string; color?: string; bg?: string; size?: number}> = ({
  text,
  color = palette.navy,
  bg = palette.yellow,
  size = 30,
}) => (
  <div
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '12px 30px',
      borderRadius: 999,
      background: bg,
      color,
      fontSize: size,
      fontWeight: 800,
      letterSpacing: 0.5,
      boxShadow: '0 10px 30px rgba(6,26,70,0.25)',
    }}
  >
    {text}
  </div>
);
