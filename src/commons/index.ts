export interface IResponseError {
  status?: number | null;
  timestamp?: Date | number | null;
  message?: string | null;
  errors?: string[] | null;
}

export const formatRoundNumber = (numero: number | string) => {
  const num = typeof numero === "string" ? Number(numero) : numero;
  return Math.round(num);
};
