// import { TMessages, TDialogue, TAuth } from './mock.props';
import { TInputBlock } from './mock.props';
// export const messages: TMessages = [
//   {
//     date: '17 июня',
//     messages: [
//       {
//         text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории.`,
//         image: null,
//         date: '11:56',
//         owner: false,
//         isReaded: true,
//       },
//       {
//         text: 'Круто!',
//         image: null,
//         date: '11:59',
//         owner: true,
//         isReaded: true,
//       },
//     ],
//   },
//   {
//     date: '19 июня',
//     messages: [
//       {
//         text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в
//           какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну.`,
//         image: null,
//         date: '11:56',
//         owner: false,
//         isReaded: true,
//       },
//       {
//         text: 'Круто!',
//         image: null,
//         date: '11:59',
//         owner: true,
//         isReaded: true,
//       },
//     ],
//   },
// ];

// export const dialogues: TDialogue[] = [
//   {
//     user: {
//       name: 'Вадим',
//       avatarSrc: null,
//     },
//     lastMessage: {
//       text: 'Hello too!',
//       image: null,
//       date: '11:59',
//       owner: false,
//     },
//     newMessagesCount: 1,
//   },
//   {
//     user: {
//       name: 'Киноклуб',
//       avatarSrc: null,
//     },
//     lastMessage: {
//       text: 'Cool!',
//       image: null,
//       date: '12:00',
//       owner: true,
//     },
//     newMessagesCount: null,
//   },
//   {
//     user: {
//       name: 'Илья',
//       avatarSrc: null,
//     },
//     lastMessage: {
//       text: 'Друзья, товарищи!',
//       image: null,
//       date: '13:00',
//       owner: false,
//     },
//     newMessagesCount: 4,
//   },
// ];

export const logIn: TInputBlock[] = [
  {
    id: 'login-auth',
    name: 'login',
    type: 'text',
    labelText: 'Логин',
    disabled: 'false',
    value: '',
    errMessage:
      'Длина 3-20 символов. Разрешено: цифры (в сочетании с буквами), буквы, дефис и подчеркивание',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'password-auth',
    name: 'password',
    type: 'password',
    labelText: 'Пароль',
    disabled: 'false',
    value: '',
    errMessage: 'Длина 8-40 символов. Хотя бы одна заглавная буква и цифра!',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
];

export const signUp: TInputBlock[] = [
  {
    id: 'email-registration',
    labelText: 'Почта',
    name: 'email',
    type: 'email',
    value: '',
    disabled: 'false',
    errMessage:
      'Только латиница, цифры, спец.символы, обяз. @ буквы и точка после неё!',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'login-registration',
    labelText: 'Логин',
    name: 'login',
    type: 'text',
    value: '',
    disabled: 'false',
    errMessage:
      'Длина 3-20 символов. Разрешено: цифры (в сочетании с буквами), буквы, дефис и подчеркивание',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'first-name-registration',
    labelText: 'Имя',
    name: 'first_name',
    type: 'text',
    value: '',
    disabled: 'false',
    errMessage: 'Первая буква - заглавная! Разрешено: буквы и дефис.',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'second-name-registration',
    labelText: 'Фамилия',
    name: 'second_name',
    type: 'text',
    value: '',
    disabled: 'false',
    errMessage: 'Первая буква - заглавная! Разрешено: буквы и дефис.',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'phone-registration',
    labelText: 'Телефон',
    name: 'phone',
    type: 'text',
    value: '',
    disabled: 'false',
    errMessage: 'Длина 10-15 сиволов. Только цифры, может начинать с +!',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'password-registration',
    labelText: 'Пароль',
    name: 'password',
    type: 'password',
    value: '',
    disabled: 'false',
    errMessage: 'Длина 8-40 символов. Хотя бы одна заглавная буква и цифра!',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
  {
    id: 'password-registration-two',
    labelText: 'Пароль (ещё раз)',
    name: 'password_two',
    type: 'password',
    value: '',
    disabled: 'false',
    errMessage: 'Пароли не совпадают!',
    labelClass: 'field__label',
    inputClass: 'field__input',
    isError: false,
  },
];

// export const user: TProfile = {

//   passwords: [
//     {
//       id: 'old-password-profile',
//       labelText: 'Старый пароль',
//       name: 'password',
//       inputType: 'password',
//       value: '',
//       errMessage: 'Длина 8-40 символов. Хотя бы одна заглавная буква и цифра!',
//       disabled: false,
//       inputClass: 'profile-field__input',
//       labelClass: 'profile-field__label',
//       isError: false,
//     },
//     {
//       id: 'new-password-profile',
//       labelText: 'Новый пароль',
//       name: 'password_two',
//       inputType: 'password',
//       value: '',
//       errMessage: 'Длина 8-40 символов. Хотя бы одна заглавная буква и цифра!',
//       disabled: false,
//       inputClass: 'profile-field__input',
//       labelClass: 'profile-field__label',
//       isError: false,
//     },
//     {
//       id: 'new-password-profile-two',
//       labelText: 'Повторите новый пароль',
//       name: 'password_three',
//       inputType: 'password',
//       value: '',
//       errMessage: 'Пароли не совпадают!',
//       disabled: false,
//       inputClass: 'profile-field__input',
//       labelClass: 'profile-field__label',
//       isError: false,
//     },
//   ],

//   shortFormat: {
//     avatarSrc: null,
//     email: 'pochta@yandex.ru',
//     login: 'ivanivanov',
//     first_name: 'Иван',
//     second_name: 'Иванов',
//     display_name: 'Иван',
//     phone: '+7 999 999 99 99',
//     oldPassword: '1234',
//     newPassword: '123456',
//   },
// };
