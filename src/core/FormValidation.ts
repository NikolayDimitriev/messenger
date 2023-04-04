import { Form } from '../components/form';
import { ChatForm } from '../components/chatForm';
import { ProfileForm } from '../components/profileForm';
import { Input } from '../components/input';
import { ErrorLabel } from '../components/errorLabel';
import { InputsBlock } from '../components/InputsBlock';
import {
  TSignUpData,
  TSignInData,
  TChangePassword,
  TChangeProfileData,
} from '../typing';

const rules: Record<string, RegExp> = {
  first_name: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  second_name: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  display_name: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  login: /^(?!\d+$)^[\w-]{3,20}$/i,
  email: /^\w*@\w+\.[a-z]{2,6}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  password_two: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  password_three: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  phone: /^(?=.{10,15}$)^\+?\d*$/,
  message: /^.+$/,
};

type TDataController =
  | TSignUpData
  | TSignInData
  | TChangePassword
  | TChangeProfileData;

export class FormValidation {
  private _inputsBlock: Record<string, InputsBlock>;
  private _inputs: Input[];
  private _firstPass: string;

  constructor(
    private _form: Form | ChatForm | ProfileForm,
    private _callAuthController: (data: TDataController) => void
  ) {
    this._inputsBlock = {};
    this._inputs = [];
    this._firstPass = '';

    this.init();
  }

  init() {
    // * вещаю event submit на саму форму
    this._form.addNewEvents({
      events: {
        submit: (e?: Event) => {
          e?.preventDefault();
          this.onSubmit(e);
        },
      },
    });

    if (this._form instanceof ProfileForm) {
      Object.entries(this._form.children).forEach(([key, children]) => {
        if (key === 'saveBtn') {
          return;
        }

        const arr = Array.isArray(children)
          ? (children as InputsBlock[])
          : ([children] as InputsBlock[]);

        arr.forEach((inputBlock: InputsBlock) => {
          const input = inputBlock.children.input as Input;

          const name = input.props.attr.name as string;

          input.addNewEvents({
            events: {
              focus: () => this.isValid(name),
              blur: () => this.isValid(name),
            },
          });

          this._inputs.push(input);
          this._inputsBlock[name] = inputBlock;
        });
      });
    }

    if (this._form instanceof ChatForm) {
      const input = this._form.children.inputs as Input;
      const name = input.props.attr.name as string;
      input.addNewEvents({
        events: {
          focus: () => this.isValidChatForm(name),
          blur: () => this.isValidChatForm(name),
        },
      });
      this._inputs.push(input);
    }

    if (this._form instanceof Form) {
      // * Вещаю event`s на каждый инпут
      // ! form -> InputBlock[] -> Input
      Object.entries(this._form.children).forEach(([key, children]) => {
        if (key !== 'inputs') {
          return;
        }

        const arr = Array.isArray(children)
          ? (children as InputsBlock[])
          : ([children] as InputsBlock[]);

        arr.forEach((inputBlock: InputsBlock) => {
          const input = inputBlock.children.input as Input;

          const name = input.props.attr.name as string;

          input.addNewEvents({
            events: {
              focus: () => this.isValid(name),
              blur: () => this.isValid(name),
            },
          });

          this._inputs.push(input);
          this._inputsBlock[name] = inputBlock;
        });
      });
    }
  }

  isValid(inputName: string): boolean {
    const regExp = rules[inputName];

    if (!regExp) {
      return false;
    }

    const { input, errorLabel } = this._inputsBlock[inputName].children;

    const value = ((input as Input).getContent() as HTMLInputElement).value;

    if (inputName === 'password') {
      this._firstPass = value;
    }

    if (inputName === 'password-two') {
      if (this._firstPass !== value) {
        (errorLabel as ErrorLabel).setProps({
          attr: { class: 'input__label--error' },
        });
        return false;
      }
      (errorLabel as ErrorLabel).setProps({ attr: { class: 'input__label' } });
      return true;
    }

    if (!regExp.test(value)) {
      (errorLabel as ErrorLabel).setProps({
        attr: { class: 'input__label--error' },
      });

      return false;
    }

    (errorLabel as ErrorLabel).setProps({ attr: { class: 'input__label' } });

    return true;
  }

  isValidChatForm(inputName: string) {
    const regExp = rules[inputName];

    if (!regExp) {
      return false;
    }

    const value = (this._inputs[0].getContent() as HTMLInputElement).value;
    const errorLabel = this._form.children.errorLabel;

    if (!regExp.test(value)) {
      (errorLabel as ErrorLabel).setProps({
        attr: { class: 'input__label--error' },
      });

      return false;
    }

    (errorLabel as ErrorLabel).setProps({ attr: { class: 'input__label' } });

    return true;
  }

  onSubmit(e?: Event) {
    e?.preventDefault();

    const result: Record<string, string> = {};

    let isValidAllInputs = true;
    this._inputs.forEach((input) => {
      if (input.props.attr.name !== 'password_two') {
        result[input.props.attr.name as string] = (
          input.getContent() as HTMLInputElement
        ).value;
      }

      if (this._form instanceof ChatForm) {
        if (!this.isValidChatForm(input.props.attr.name as string)) {
          isValidAllInputs = false;
        }
      } else {
        if (!this.isValid(input.props.attr.name as string)) {
          isValidAllInputs = false;
        }
      }
    });

    if (isValidAllInputs) {
      if (Object.keys(result).length > 2) {
        this._callAuthController(result as TSignUpData);
      } else {
        this._callAuthController(result as TSignInData);
      }
      console.log(result);
    }
  }
}
