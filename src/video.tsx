import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Scene} from './components';
import {SceneChaos, SceneLoss, SceneReveal} from './scenes/a';
import {SceneMarket} from './scenes/market';
import {SceneSpeed, SceneMedia, SceneCost, SceneTdm, SceneNetwork, SceneFinal} from './scenes/b';

const SUBS = [
  'Dijitalleşen dünyada, manuel süreçler zaman ve kazanç kaybettirir.',
  'Her geciken sipariş ve eksik görsel, kaçan bir satış fırsatıdır.',
  'BayiGo, bayi operasyonlarını tek dijital ekosistemde birleştirir.',
  'BayiGo Market ile stok, fiyat ve sipariş tek ekranda yönetilir.',
  'Daha hızlı sipariş, daha doğru stok ve daha yüksek gelir.',
  'BayiGo Medya ile profesyonel görsel ve videolar otomatik hazırlanır.',
  'Ajans ve tekil üretim maliyetleri azalır.',
  'TDM tüm bayi ağını tek merkezden yönetir.',
  'Dijital dünyaya ayak uyduran örnek bir yapı kurulur.',
  'BayiGo. Geleceğin bayi ekosistemi, bugün başlar.',
];

export const BayiGoFilm: React.FC = () => (
  <AbsoluteFill style={{background: '#061A46'}}>
    <Sequence from={0} durationInFrames={270}>
      <Scene dur={270} subtitle={SUBS[0]}>
        <SceneChaos />
      </Scene>
    </Sequence>
    <Sequence from={270} durationInFrames={270}>
      <Scene dur={270} dark subtitle={SUBS[1]}>
        <SceneLoss />
      </Scene>
    </Sequence>
    <Sequence from={540} durationInFrames={240}>
      <Scene dur={240} dark subtitle={SUBS[2]}>
        <SceneReveal />
      </Scene>
    </Sequence>
    <Sequence from={780} durationInFrames={390}>
      <Scene dur={390} subtitle={SUBS[3]}>
        <SceneMarket />
      </Scene>
    </Sequence>
    <Sequence from={1170} durationInFrames={300}>
      <Scene dur={300} dark subtitle={SUBS[4]}>
        <SceneSpeed />
      </Scene>
    </Sequence>
    <Sequence from={1470} durationInFrames={420}>
      <Scene dur={420} subtitle={SUBS[5]}>
        <SceneMedia />
      </Scene>
    </Sequence>
    <Sequence from={1890} durationInFrames={270}>
      <Scene dur={270} dark subtitle={SUBS[6]}>
        <SceneCost />
      </Scene>
    </Sequence>
    <Sequence from={2160} durationInFrames={300}>
      <Scene dur={300} dark subtitle={SUBS[7]}>
        <SceneTdm />
      </Scene>
    </Sequence>
    <Sequence from={2460} durationInFrames={240}>
      <Scene dur={240} dark subtitle={SUBS[8]}>
        <SceneNetwork />
      </Scene>
    </Sequence>
    <Sequence from={2700} durationInFrames={180}>
      <Scene dur={180} dark>
        <SceneFinal />
      </Scene>
    </Sequence>
  </AbsoluteFill>
);
