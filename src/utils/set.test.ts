/* eslint-disable @typescript-eslint/ban-ts-comment */
import { set } from './set';
import { expect } from 'chai';

describe('функция SET', () => {
  const value = 'value';
  const keypath = 'a.b';
  let obj = {};

  beforeEach(() => {
    obj = {};
  });

  it('должна установить значение по ключу', () => {
    set(obj, keypath, value);

    expect(obj).to.deep.equal({ ...obj, a: { b: value } });
  });

  it('должна вернуть входной элемент, если это не объект', () => {
    const wrongObj = 'string';

    const result = set(wrongObj, keypath, value);

    expect(result).to.equal(wrongObj);
  });

  it('должна вернуть ошибку, если переданный путь не строка', () => {
    const wrongPath = 4;

    // @ts-ignore
    const func = () => set(obj, wrongPath, value);

    expect(func).to.throw(Error);
  });

  it('должна мутировать исходный массив', () => {
    set(obj, keypath, value);

    expect(obj).to.haveOwnProperty('a');
  });
});
