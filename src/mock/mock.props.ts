// export type TDate = Date | string;
// type TImage = null | string;

// export type TMessages = TMessageBlock[];

// export type TMessageBlock = {
//   date: TDate;
//   messages: TMessage[];
// };

// export type TMessage = {
//   text: string;
//   date: TDate;
//   image: TImage;
//   owner: boolean;
//   isReaded: boolean;
// };

// export type TDialogue = {
//   user: {
//     name: string;
//     avatarSrc: TImage;
//   };
//   lastMessage: {
//     text: string;
//     image: TImage;
//     date: TDate;
//     owner: boolean;
//   };
//   newMessagesCount: number | null;
// };

export type TInputBlock = {
  id: string;
  name: string;
  type: string;
  value: string;
  disabled: string;
  class?: string;
  labelText?: string;
  labelClass?: string;
  inputClass?: string;
  isError?: boolean;
  errMessage?: string;
};

// export type TProfile = {
//   fields: TInputBlock[];
//   passwords: TInputBlock[];
//   shortFormat: {
//     avatarSrc: TImage;
//     email: string;
//     login: string;
//     first_name: string;
//     second_name: string;
//     display_name: string;
//     phone: string | number;
//     oldPassword: string;
//     newPassword: string;
//   };
// };
