import { FC, memo } from "react";
import { formatRoundNumber } from "../../commons";
import {
  TipoDays,
  TipoPrevisaoTempo,
} from "../../pages/previsao-tempo/PrevisaoTempoType";
import "./PrevisaoTempo.scss";

interface PrevisaoTempo5DaysProps {
  previsao5Days: TipoDays;
  tempo: TipoPrevisaoTempo;
}
interface DailyForecast {
  [date: string]: any;
}
const PrevisaoTempoDays: FC<PrevisaoTempo5DaysProps> = ({
  previsao5Days,
  tempo,
}) => {
  let dailyForecast: DailyForecast = {};

  for (let forecast of previsao5Days.list) {
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    if (!dailyForecast[date]) {
      dailyForecast[date] = forecast;
    }
  }

  const nextFiveDays = Object.values(dailyForecast).slice(1, 6);

  const convertDate = (forecast: any) => {
    return new Date(forecast.dt * 1000).toLocaleDateString("pt-br", {
      weekday: "long",
      day: "2-digit",
    });
  };

  return (
    <div className="weather-container">
      <h3>Previsão para os Próximos 5 Dias</h3>
      <div className="weather-list">
        {nextFiveDays.map((forecast) => (
          <div className="weather-item" key={forecast.dt}>
            <p className="forecast-days">{convertDate(forecast)}</p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
            />
            <p className="forecast-description">
              {forecast.weather[0].description}
            </p>
            <p>
              {formatRoundNumber(tempo.main.temp_min)} ℃ min /{" "}
              {formatRoundNumber(tempo.main.temp_max)} ℃ máx
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(PrevisaoTempoDays);
