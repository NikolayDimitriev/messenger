import Block from './Block';
import { EventBus } from './EventBus';

import { set } from '../utils/set';
import { TMessage, TChatInfo, TUser } from '../typing';

const StoreEvents = {
  Updated: 'updated',
} as const;

export type StoreEvents = (typeof StoreEvents)[keyof typeof StoreEvents];

type TState = {
  user: TUser;
  chats: TChatInfo[];
  messages: Record<number, TMessage[]>;
  selectedChat?: number;
  usersSelectedChat?: Array<TUser & { role: string }>;
  searchedUsers?: TUser[];
};

export class Store extends EventBus {
  private _state: TState = {} as TState;

  public set(keypath: string, data: unknown) {
    set(this._state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState(): TState {
    return this._state;
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: TState) => any) {
  return function wrap(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());

          previousState = stateProps;

          this.setProps({ ...stateProps });
        });
      }
    };
  };
}

export default store;
