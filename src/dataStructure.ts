export interface Lines {
  [name: string]: {
    up: string;
    down: string;
    color: string;
    eta: boolean;
  };
}

export interface Stations {
  [name: string]: string[];
}

export interface Option {
  value: string;
  label: string;
}

export type OptionList = Option[];

export interface Train {
  seq: string;
  dest: string;
  plat: string;
  time: string;
}

export type TrainList = Train[];

export interface Error {
  isdelay: boolean;
  message: string;
}
