import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { mockUserData } from './userData';

export const handlers = [
  http.get('/api/user', () => {
    return HttpResponse.json(mockUserData);
  }),
];

export const server = setupServer(...handlers);
