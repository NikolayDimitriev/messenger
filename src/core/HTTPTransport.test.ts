/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import { HTTPTransport } from './HTTPTransport';
import { expect } from 'chai';

describe('Класс HTTPTransport', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const originalXHR = global.XMLHttpRequest;

  before(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  beforeEach(() => {
    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  it('должен отправляться GET запрос', () => {
    const transport = new HTTPTransport('/');
    transport.get();
    const request = requests[0];

    expect(request.method.toUpperCase()).to.equal('GET');
  });
});
