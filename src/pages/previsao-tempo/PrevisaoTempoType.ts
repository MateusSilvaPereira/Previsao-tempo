export interface TipoPrevisaoTempo {
  name: string;
  weather: {
    icon: string;
    description: string;
  }[];

  main: {
    temp: string;
    feels_like: string;
    humidity: string;
    pressure: string;
    temp_min: string;
    temp_max: string;
  };
}

export interface TipoDays {
  list: {
    dt: number;
  }[];
}
