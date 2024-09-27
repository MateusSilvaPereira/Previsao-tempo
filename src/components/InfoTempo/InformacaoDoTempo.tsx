import { FC, memo } from "react";
import { formatRoundNumber } from "../../commons";
import { TipoPrevisaoTempo } from "../../pages/previsao-tempo/PrevisaoTempoType";
import "./InformacaoDoTempo.scss";

interface InformacaoDoTempoProps {
  tempo: TipoPrevisaoTempo | null;
}

const InformacaoDoTempo: FC<InformacaoDoTempoProps> = ({ tempo }) => {
  if (!tempo || !tempo.name) return <div></div>;
  console.log(tempo!.name);
  return (
    <div className="weather-container">
      <h2>{tempo!.name}</h2>
      <div className="weather-info">
        <img
          src={`http://openweathermap.org/img/wn/${tempo.weather[0].icon}.png`}
        />

        <p className="temperature">{formatRoundNumber(tempo.main.temp)}℃</p>
      </div>
      <p className="description">{tempo.weather[0].description}</p>

      <div className="details">
        <p>Sensação Térmica: {formatRoundNumber(tempo.main.feels_like)}℃</p>
        <p>Umidade: {tempo.main.humidity}%</p>
        <p>Pressão: {tempo.main.pressure}</p>
      </div>
    </div>
  );
};

export default memo(InformacaoDoTempo);
