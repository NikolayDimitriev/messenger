import Block, { TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
// import Error from '../../components/error';
// import link from '../../components/link';

export default class Page404 extends Block<TProps> {
  constructor() {
    super('div');
  }

  render() {
    return this.compile(tpl, {});
  }
}

// export default () => {
// 	return tpl({
// 		error: error({
// 			errorCode: '400',
// 			errorText: 'Не туда попали',
// 			link: link({
// 				href: '/chats',
// 				value: 'Назад к чатам',
// 				className: 'form-link',
// 			}),
// 		}),
// 	});
// };
