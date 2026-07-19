import React from 'react';
import {Composition} from 'remotion';
import {BayiGoFilm} from './video';

export const Root: React.FC = () => (
  <Composition
    id="BayiGoFilm"
    component={BayiGoFilm}
    durationInFrames={2880}
    fps={30}
    width={1920}
    height={1080}
  />
);
