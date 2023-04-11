/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AuthAPI } from './AuthAPI';
import sinon from 'sinon';
import { expect } from 'chai';

import { TSignInData, TSignUpData } from '../typing';

describe('AuthAPI', () => {
  class AuthAPIMock extends AuthAPI {}

  const originalXHR = global.XMLHttpRequest;
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  let authAPI: AuthAPIMock;

  before(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  beforeEach(() => {
    authAPI = new AuthAPIMock();
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('должен отправить запрос на вход', () => {
    authAPI.signin({} as TSignInData);
    const request = requests[0];

    expect(request.url.includes('/signin')).to.eq(true);
  });

  it('должен отправить запрос на регистрацию', () => {
    authAPI.signup({} as TSignUpData);
    const request = requests[0];

    expect(request.url.includes('/signup')).to.eq(true);
  });

  it('должен отправлять запрос на получение пользователя', () => {
    authAPI.getUser();
    const request = requests[0];

    expect(request.url.includes('/user')).to.eq(true);
  });

  it('должен отправлять запрос на выход', () => {
    authAPI.logout();
    const request = requests[0];

    expect(request.url.includes('/logout')).to.eq(true);
  });
});
