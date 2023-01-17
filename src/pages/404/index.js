import tpl from './tpl.hbs';
import error from '../../components/error';
import link from '../../components/link';

export default () => {
    return tpl({
			error: error({
				errorCode: "400",
				errorText: "Не туда попали",
				link: link({
					href: "/chats",
					value: "Назад к чатам",
					className: "form-link",
				}),
			})
    });
};
