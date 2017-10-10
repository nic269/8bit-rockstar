import { request } from '@App/helpers';

export function getRates(params = {}) {
  return request('get', 'http://api.fixer.io/latest', {
    params
  });
}

