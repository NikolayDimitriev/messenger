export const messages = {
  messages: [
    {
      text: "Hello world!",
      image: null,
      date: "11:56",
      owner: true,
    },
    {
      text: "Hello too!",
      image: null,
      date: "11:59",
      owner: false,
    },
  ],
};

export const dialogues = {
  dialogues: [
    {
      user: {
        name: "Вадим",
        avatarSrc: null,
      },
      lastMessage: {
        text: "Hello too!",
        image: null,
        date: "11:59",
        owner: false,
      },
      newMessagesCount: 1,
    },
    {
      user: {
        name: "Киноклуб",
        avatarSrc: null,
      },
      lastMessage: {
        text: "Cool!",
        image: null,
        date: "12:00",
        owner: true,
      },
      newMessagesCount: null,
    },
    {
      user: {
        name: "Илья",
        avatarSrc: null,
      },
      lastMessage: {
        text: "Друзья, товарищи!",
        image: null,
        date: "13:00",
        owner: false,
      },
      newMessagesCount: 4,
    },
  ],
};

export const logIn = {
  inputs: [
    {
      id: "login-auth",
      placeholder: "Логин",
      label: "Логин",
      name: "login",
      inputType: "text",
      errMessage: "Неверный логин",
    },
    {
      id: "password-auth",
      placeholder: "Пароль",
      label: "Пароль",
      name: "password",
      inputType: "password",
      errMessage: "Неверный пароль",
    },
  ],
};

export const signUp = {
  inputs: [
    {
      id: "email-registration",
      placeholder: "Почта",
      label: "Почта",
      name: "email",
      inputType: "email",
      errMessage: "",
    },
    {
      id: "login-registration",
      placeholder: "Логин",
      label: "Логин",
      name: "login",
      inputType: "text",
      errMessage: "",
    },
    {
      id: "first-name-registration",
      placeholder: "Имя",
      label: "Имя",
      name: "first_name",
      inputType: "text",
      errMessage: "",
    },
    {
      id: "second-name-registration",
      placeholder: "Фамилия",
      label: "Фамилия",
      name: "second_name",
      inputType: "text",
      errMessage: "",
    },
    {
      id: "phone-registration",
      placeholder: "Телефон",
      label: "Телефон",
      name: "phone",
      inputType: "text",
      errMessage: "",
    },
    {
      id: "password-registration",
      placeholder: "Пароль",
      label: "Пароль",
      name: "password",
      inputType: "password",
      errMessage: "",
    },
    {
      id: "password-registration-two",
      placeholder: "Пароль (ещё раз)",
      label: "Пароль (ещё раз)",
      name: "password",
      inputType: "password",
      errMessage: "Пароли не совпадают",
    },
  ],
};

export const user = {
  inputs: {
    fields: [
      {
        id: "email-profile",
        label: "Почта",
        name: "email",
        inputType: "email",
        value: "pochta@yandex.ru",
        disabled: true,
      },
      {
        id: "login-profile",
        label: "Логин",
        name: "login",
        inputType: "text",
        value: "ivanivanov",
        disabled: true,
      },
      {
        id: "first-name-profile",
        label: "Имя",
        name: "first_name",
        inputType: "text",
        value: "Иван",
        disabled: true,
      },
      {
        id: "second-name-profile",
        label: "Фамилия",
        name: "second_name",
        inputType: "text",
        value: "Иванов",
        disabled: true,
      },
      {
        id: "display-name-profile",
        label: "Имя в чате",
        name: "display_name",
        inputType: "text",
        value: "Иван",
        disabled: true,
      },
      {
        id: "phone-profile",
        label: "Телефон",
        name: "phone",
        inputType: "text",
        errMessage: "",
        value: "+7 (999) 999 99 99 ",
        disabled: true,
      },
    ],
  },

  passwords: {
    fields: [
      {
        id: "old-password-profile",
        label: "Старый пароль",
        name: "oldPassword",
        inputType: "password",
        value: "1234",
        disabled: false,
      },
      {
        id: "new-password-profile",
        label: "Повторите новый пароль",
        name: "newPassword",
        inputType: "password",
        value: "123456",
        disabled: false,
      },
      {
        id: "new-password-profile-two",
        label: "Новый пароль",
        name: "newPassword",
        inputType: "password",
        value: "123456",
        disabled: false,
      },
    ],
  },

  shortFormat: {
    avatarUrl: null,
    email: "pochta@yandex.ru",
    login: "ivanivanov",
    first_name: "Иван",
    second_name: "Иванов",
    display_name: "Иван",
    phone: "+7 (999) 999 99 99",
    oldPassword: "1234",
    newPassword: "123456",
  },
};
