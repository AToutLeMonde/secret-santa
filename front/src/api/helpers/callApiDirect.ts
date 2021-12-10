import { ApiResp, isOk } from '.';


export async function callApiDirect<Type>(callFunc: Function, options: {

  notToThrowStatuses?: number[],
  onError?: Function

}):
  Promise<ApiResp<Type>> {

  let resp = null;
  let error = null;

  try {

    resp = await callFunc();

  } catch (err) {
    if (isOk(err?.response, options?.notToThrowStatuses)) {
      resp = err.response;
    } else {
      error = err;
    }
  }

  const result = {
    status: resp?.status || 0,
    body: resp?.data,
    url: resp?.config?.url,
    error
  };

  if (typeof options?.onError === 'function') {
    options.onError(result)
  }

  return result;
}