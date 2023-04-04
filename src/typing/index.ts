export type TUser = {
  data: TUserProps;
};

export type TUserProps = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type TMessage = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type TChatInfo = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: TUser;
    time: string;
    content: string;
  };
};

export type TChangeProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
};

export type TSignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type TSignInData = {
  login: string;
  password: string;
};

export type TProps = {
  events?: Record<string, (e?: Event) => void>;
  attr?: Record<string, string>;
};

export type Indexed<T = any> = {
  [key in string]: T;
};
