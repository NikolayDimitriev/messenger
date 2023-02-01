import Block from '../../utils/Block';
import tpl from './tpl.hbs';
import Error from '../../components/error';
// import link from '../../components/link';

export default class Page404 extends Block {
  constructor() {
    super('div');
  }

  init() {
    this.children.error = new Error({
      errorCode: '400',
      errorText: 'Не туда попали',
    });
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
