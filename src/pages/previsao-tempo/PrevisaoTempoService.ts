import axios from "axios";

const API_KEY = "15d527066ac98c63c3e685e3fa624ca1";

const PrevisaoTempoService = {
  async pesquisarCidade(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`;

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar previsão do tempo:", error);
      throw error;
    }
  },

  async previsaoTempo5Dias(city: string) {
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&lang=pt_br&units=metric`;

    try {
      const response = await axios.get(url5Days);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar previsão do tempo:", error);
      throw error;
    }
  },
};

export { PrevisaoTempoService as previsaoTempoService };
