/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import { HTTPTransport } from './HTTPTransport';
import { expect } from 'chai';

describe('Класс HTTPTransport', () => {
  const requests: sinon.SinonFakeXMLHttpRequest[] = [];
  const originalXHR = global.XMLHttpRequest;
  let transport = new HTTPTransport('/');

  before(() => {
    const XHR = sinon.useFakeXMLHttpRequest();

    // @ts-ignore
    global.XMLHttpRequest = XHR;

    XHR.onCreate = (xhr) => {
      requests.push(xhr);
    };
  });

  afterEach(() => {
    transport = new HTTPTransport('/');

    requests.length = 0;
  });

  after(() => {
    global.XMLHttpRequest = originalXHR;
  });

  it('должен отправляться GET запрос', () => {
    transport.get();
    const request = requests[0];

    expect(request.method.toUpperCase()).to.eq('GET');
  });

  it('должен отправляться POST запрос', () => {
    transport.post('data');
    const request = requests[0];

    expect(request.method.toUpperCase()).to.eq('POST');
  });

  it('должен отправляться PUT запрос', () => {
    transport.put('data', {});
    const request = requests[0];

    expect(request.method.toUpperCase()).to.eq('PUT');
  });

  it('должен отправляться DELETE запрос', () => {
    transport.delete('data');
    const request = requests[0];

    expect(request.method.toUpperCase()).to.eq('DELETE');
  });

  it('должен отправлять данные с запросом', () => {
    const data = { first_name: 'name', second_name: 'name' };

    transport.post('/user', data);

    const request = requests[0];

    expect(request.requestBody).to.eq(JSON.stringify(data));
  });

  it('должен отправлять данные формата FormData', () => {
    const data = new FormData();

    transport.put('/user', data);

    const request = requests[0];

    expect(request.requestBody).to.eq(data);
  });
});
