export const isOk = (resp: any, notToThrowStatuses?: number[]) => {
  if (!resp) return false;

  const { status } = resp;

  if (status === 200 || status === 302) {
    return true
  }

  if (!notToThrowStatuses?.length) {
    return false;
  } else if (notToThrowStatuses.includes(status)) {
    return true;
  }

  return false;
}

export async function callApi<Type>(callFunc: Function, options?: any):
  Promise<Type> {

  let resp = null;

  try {
    resp = await callFunc();
  } catch (err) {
    if (isOk(err?.response, options?.notToThrowStatusCodes)) {
      resp = err.response;
    } else {
      throw err;
    }
  }

  return resp?.data;
}