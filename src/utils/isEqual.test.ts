import { isEqual } from './isEqual';
import { Indexed } from '../typing/';
import { expect } from 'chai';

describe('функция isEqual', () => {
  it('должна вернуть true для одинаковых объектов', () => {
    const item1: Indexed = {
      a: 1,
      b: { c: { d: false }, e: 'string' },
      f: 123,
    };
    const item2: Indexed = {
      a: 1,
      b: { c: { d: false }, e: 'string' },
      f: 123,
    };

    expect(isEqual(item1, item2)).to.eq(true);
  });

  it('должна вернуть false для разных объектов', () => {
    const item1: Indexed = {
      a: 1,
      b: { c: { d: false }, e: 'strin' },
      f: 123,
    };
    const item2: Indexed = {
      a: 1,
      b: { c: { d: false }, e: 'string' },
      f: 123,
    };

    expect(isEqual(item1, item2)).to.eq(false);
  });

});
