import { set } from '../utils/set';
import { EventBus } from './EventBus';
import { Block } from './Block';
import { TMessage, TUser, TChatInfo, TUserProps } from '../typing';

export enum StoreEvents {
  Updated = 'updated',
}

type TState = {
  user: TUser;
  chats: TChatInfo[];
  messages: Record<number, TMessage[]>;
  selectedChat?: number;
  usersSelectedChat?: Array<TUserProps & { role: string }>;
};

export class Store extends EventBus {
  private _state: any = {};

  public set(keypath: string, data: unknown) {
    set(this._state, keypath, data);

    this.emit(StoreEvents.Updated, this.getState());
  }

  public getState(): TState {
    return this._state;
  }
}

const store = new Store();

export function withStore<SP>(mapStateToProps: (state: TState) => SP) {
  return function wrap<T>(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: Omit<T, keyof SP>) {
        let previousState = mapStateToProps(store.getState());

        super({ ...(props as T), ...previousState });

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
