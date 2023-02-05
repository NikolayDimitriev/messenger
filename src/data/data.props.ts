export type TDate = Date | string;
type TImage = null | string;

export type TMessages = TMessageBlock[];

export type TMessageBlock = {
  date: TDate;
  messages: TMessage[];
};

export type TMessage = {
  text: string;
  date: TDate;
  image: TImage;
  owner: boolean;
  isReaded: boolean;
};

export type TDialogue = {
  user: {
    name: string;
    avatarSrc: TImage;
  };
  lastMessage: {
    text: string;
    image: TImage;
    date: TDate;
    owner: boolean;
  };
  newMessagesCount: number | null;
};

export type TAuth = TInput[];

export type TInput = {
  id: string;
  labelText: string;
  name: string;
  inputType: string;
  labelClass: string;
  inputClass: string;
  isError: boolean;
  errMessage?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
};

export type TProfile = {
  fields: TInput[];
  passwords: TInput[];
  shortFormat: {
    avatarSrc: TImage;
    email: string;
    login: string;
    first_name: string;
    second_name: string;
    display_name: string;
    phone: string | number;
    oldPassword: string;
    newPassword: string;
  };
};
