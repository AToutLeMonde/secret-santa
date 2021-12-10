export type ApiResp<Type> = {
  body?: Type,
  status: number,
  url: string,
  error?: any
}