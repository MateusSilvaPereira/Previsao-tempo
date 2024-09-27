import { FC, memo, useRef, useState } from "react";
import InformacaoDoTempo from "../../components/InfoTempo/InformacaoDoTempo";
import PrevisaoTempo5Days from "../../components/previsao/PrevisaoTempoDays";
import { previsaoTempoService } from "./PrevisaoTempoService";
import { TipoDays, TipoPrevisaoTempo } from "./PrevisaoTempoType";

interface PrevisaoTempoPageProps {}

export const NOVO_PREVISAO_TEMPO5Days: TipoDays = { list: [{ dt: 0 }] };
export const NOVO_PREVISAO_TEMPO: TipoPrevisaoTempo = {
  name: "",
  weather: [{ icon: "", description: "" }],
  main: {
    temp: "",
    feels_like: "",
    humidity: "",
    pressure: "",
    temp_max: "",
    temp_min: "",
  },
};

const PrevisaoTempoPage: FC<PrevisaoTempoPageProps> = () => {
  const [tempo, setTempo] = useState<TipoPrevisaoTempo>(NOVO_PREVISAO_TEMPO);
  const [previsao5Days, setPrevisao5Days] = useState<TipoDays>(
    NOVO_PREVISAO_TEMPO5Days
  );
  const [erro, setErro] = useState<string | null>(null); // Para tratar erros
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchCity = async () => {
    const cidade = inputRef.current?.value;
    if (!cidade) {
      setErro("Por favor, insira o nome da cidade.");
      return;
    }

    try {
      const dataApi = await previsaoTempoService.pesquisarCidade(cidade);
      const clima5Dias = await previsaoTempoService.previsaoTempo5Dias(cidade!);

      setTempo(dataApi);
      setPrevisao5Days(clima5Dias);
      setErro(null);
    } catch (error) {
      console.error("Erro ao buscar previsão do tempo:", error);
      setErro("Falha ao buscar a previsão do tempo. Tente novamente.");
    }
  };

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>

      <input ref={inputRef} type="text" placeholder="Digite o nome da Cidade" />
      <button onClick={searchCity}>Buscar</button>

      {erro && <p style={{ color: "red" }}>{erro}</p>}
      {tempo && <InformacaoDoTempo tempo={tempo} />}

      {tempo.name && (
        <PrevisaoTempo5Days previsao5Days={previsao5Days} tempo={tempo} />
      )}
    </div>
  );
};

export default memo(PrevisaoTempoPage);
