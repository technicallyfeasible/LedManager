import { parseJSON, checkStatus } from '../utils';
import { API } from '../constants/ActionTypes';

export async function fetchData(url, args) {
  return await parseJSON(await checkStatus(await fetch(url, args)));
}

function encode(params) {
  if (!params) return '';
  return Object.keys(params).map((p, i) => {
    return `${p}=${encodeURIComponent(params[p])}`;
  }).join('&');
}

/**
 * Do the actual api call and process the result
 * @param endpoint
 * @param urlBase
 * @param headers
 * @param method
 * @param params
 * @param data
 * @returns {{responseData: *}}
 */
async function callApi(endpoint, {url: urlBase, headers}, method, params, data) {
  const url = `${urlBase}/${endpoint}?${encode(params)}`;

  let responseData = await fetchData(url, {
    method,
    body: JSON.stringify(data),
    headers: headers(),
  });

  const processed = {
    responseData,
  };
  return processed;
}

// Symbol('Call API')
export const CALL_API = 'CALL_API';

export const Methods = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete',
  PATCH: 'patch',
  OPTIONS: 'options',
};

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, method } = callAPI;
  const { config, data, params, navigate } = callAPI;

  if (method === undefined) {
    method = Methods.GET;
  }

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  function actionWith(patch) {
    const finalAction = Object.assign({}, action, patch);
    delete finalAction[CALL_API];
    return finalAction;
  }

  next(actionWith({ type: API.REQUEST, data: data }));
  return callApi(endpoint, config, method, params, data)
    .then(
      response => {
        next(actionWith({
          response,
          type: API.SUCCESS,
          data: data,
        }));
      },
      error => next(actionWith({
        type: API.FAILURE,
        error: error.message || 'Something bad happened',
        errors: error.errors,
        data: data,
      }))
    );
};
