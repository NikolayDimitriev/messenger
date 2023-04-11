import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Block';

const eventBusMock = {
  on: sinon.stub(),
  emit: sinon.stub(),
};

const { default: Block } = proxyquire('./Block', {
  './EventBus': {
    EventBus: class {
      emit = eventBusMock.emit;
      on = eventBusMock.on;
    },
  },
}) as { default: typeof BlockType };

describe('Block', () => {
  beforeEach(() => {
    eventBusMock.on.reset();
    eventBusMock.emit.reset();
  });

  it('должен сработать init при инициализация компонента', () => {
    class ComponentMock extends Block {}

    new ComponentMock({});

    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });

  it('должен сработать flow:component-did-mount при dispatchComponentDidMount', () => {
    class ComponentMock extends Block {}

    const component = new ComponentMock({});

    component.dispatchComponentDidMount();

    expect(eventBusMock.emit.calledWith('flow:component-did-mount')).to.eq(
      true
    );
  });

  it('должен сработать flow:component-did-update при установке props', () => {
    class ComponentMock extends Block {}

    const component = new ComponentMock({});

    component.setProps({ a: 2 });

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(
      true
    );
  });

  it('должен выбросить ошибку при удалении пропсов', () => {
    class ComponentMock extends Block {}

    const component = new ComponentMock({ a: 2 });

    const func = () => {
      delete component.props.a;
    };

    expect(func).to.throw(Error);
  });
});
