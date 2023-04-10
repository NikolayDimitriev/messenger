/* eslint-disable @typescript-eslint/ban-ts-comment */
import sinon from 'sinon';
import Router from '../../core/Router';
import { BaseLink as Link } from '.';
import { expect } from 'chai';

describe('Компонент Link', () => {
  const to = '/';
  const value = 'Home';
  const callback = sinon.stub();

  // @ts-ignore
  const router = { go: callback } as typeof Router;

  beforeEach(() => {
    callback.reset();
  });

  it('должен отрендориться', () => {
    new Link({
      to,
      value,
      router,
    });
  });

  it('должен отрендориться с переданным label', () => {
    const link = new Link({
      to,
      value,
      router,
    });

    const element = link.getContent();

    expect(element?.textContent).to.eq(value);
  });

  it('должен сработать метод Router.go при клике', () => {
    const link = new Link({ to, value, router });

    link.element?.click();

    expect(callback.calledOnce).to.equal(true);
  });

  it('должен перенаправить на переданный роут', () => {
    const link = new Link({ to, value, router });

    link.element?.click();

    expect(callback.calledOnceWith(to)).to.equal(true);
  });
});
