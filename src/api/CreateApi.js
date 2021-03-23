import apisauce from 'apisauce';
import Toast from "../view/Toast";

const baseHeader = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const CreateApi = () => {
  const api = apisauce.create({baseURL: 'http://elm.cangdu.org', headers: baseHeader, timeout: 15000});

  api.addAsyncResponseTransform(async response => {
    if (response.status === 401) {
      // refresh token
    }
    console.log(response.config.url, {
      duration: response.duration,
      problem: response.problem,
      status: response.status,
      method: response.config.method,
      headers: response.config.headers,
      params: response.config.method === 'get' ? response.config.params : response.config.data,
      baseURL: response.config.baseURL,
      data: response.data,
    });
    response.status > 300 && Toast.show(response.problem);
    return response
  });

  return api
}

