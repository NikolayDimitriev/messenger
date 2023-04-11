import Router, { BlockConstructable } from './Router';
import { expect } from 'chai';
import sinon from 'sinon';

describe('Router', () => {
  const originalBack = global.window.history.back;
  const originalForward = global.window.history.forward;

  before(() => {
    global.window.history.back = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({
          currentTarget: window,
        } as unknown as PopStateEvent);
      }
    };
    global.window.history.forward = () => {
      if (typeof window.onpopstate === 'function') {
        window.onpopstate({
          currentTarget: window,
        } as unknown as PopStateEvent);
      }
    };
  });

  after(() => {
    global.window.history.back = originalBack;
    global.window.history.forward = originalForward;
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
    dispatchComponentDidMount = () => {
      return;
    };
  } as unknown as BlockConstructable;

  it('метод use() должен вернуть Router instance', () => {
    const result = Router.use('/', BlockMock);

    expect(result).to.eq(Router);
  });

  it('должен отрендорить страницу при старте', () => {
    Router.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('должен рендорить страницу при вызове метода back()', () => {
    Router.use('/', BlockMock).start();

    Router.back();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('должен рендорить страницу при вызове метода forward()', () => {
    Router.use('/', BlockMock).start();

    Router.forward();

    expect(getContentFake.callCount).to.eq(1);
  });

  it('должен установить страницу 404, если не найден route', () => {
    const getContentFakeTwo = sinon.fake.returns(document.createElement('div'));

    const BlockMockTwo = class {
      getContent = getContentFakeTwo;
      dispatchComponentDidMount = () => {
        return;
      };
    } as unknown as BlockConstructable;

    Router.use('/', BlockMock).use('/404', BlockMockTwo).start();

    Router.go('/some-strange-url');
    

    expect(getContentFakeTwo.callCount).to.eq(1);
  });
});
