/**
 * Checks whether response had a http error and throws an error
 * @param response
 * @returns {Promise}
 */
export async function checkStatus(response) {
  if (response && response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  throw error;
}

/**
 * Await response and then parse as JSON
 * @param response
 * @returns {null|{}}
 */
export async function parseJSON(response) {
  const text = await response.text();
  if (!text) return null;
  return JSON.parse(text);
}
