import Form from '../components/form';
import Input from '../components/input';
import InputsBlock from '../components/InputsBlock';
import ChatForm from '../components/chatForm';

const rules: Record<string, RegExp> = {
  first_name: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  second_name: /^[A-ZА-Я][A-Za-zА-Яа-яЁё-]*$/,
  login: /^(?!\d+$)^[\w-]{3,20}$/i,
  email: /^\w*@\w+\.[a-z]{2,6}$/,
  password: /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,40}$/,
  'password-two': /([A-Z])\w+/g,
  phone: /^(?=.{10,15}$)^\+?\d*$/,
  message: /^.+$/,
};

export default class FormValidation {
  private _form: Form;
  private _inputsBlock: Record<string, InputsBlock>;
  private _inputs: Input[];
  private _firstPass: string;

  constructor(form: Form) {
    this._form = form;
    this._inputsBlock = {};
    this._inputs = [];
    this._firstPass = '';
    this.init();
  }

  init() {
    // * вещаю event submit на саму форму
    this._form.setProps({
      events: {
        submit: (e?: Event) => {
          e?.preventDefault();
          this.onSubmit(e);
        },
      },
    });

    if (this._form instanceof ChatForm) {
      const input = this._form.children.inputs;
      const name = this._form.children.inputs.props.name;
      input.setProps({
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

        const arr = Array.isArray(children) ? children : [children];

        arr.forEach((inputBlock: InputsBlock) => {
          const input: Input = inputBlock.children.input;

          const name = input.props.name as string;

          input.setProps({
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

    const value = (input.getContent() as HTMLInputElement).value;

    if (inputName === 'password') {
      this._firstPass = value;
    }

    if (inputName === 'password-two') {
      if (this._firstPass !== value) {
        errorLabel.setProps({ attr: { class: 'input__label--error' } });
        return false;
      }
      errorLabel.setProps({ attr: { class: 'input__label' } });
      return true;
    }

    if (!regExp.test(value)) {
      errorLabel.setProps({ attr: { class: 'input__label--error' } });

      return false;
    }

    errorLabel.setProps({ attr: { class: 'input__label' } });

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
      errorLabel.setProps({ attr: { class: 'input__label--error' } });

      return false;
    }

    errorLabel.setProps({ attr: { class: 'input__label' } });

    return true;
  }

  onSubmit(e?: Event) {
    e?.preventDefault();

    const result: Record<string, string> = {};

    let isValidAllInputs = true;
    this._inputs.forEach((input) => {
      result[input.props.name as string] = (
        input.getContent() as HTMLInputElement
      ).value;

      if (this._form instanceof ChatForm) {
        if (!this.isValidChatForm(input.props.name as string)) {
          isValidAllInputs = false;
        }
      } else {
        if (!this.isValid(input.props.name as string)) {
          isValidAllInputs = false;
        }
      }
    });

    if (isValidAllInputs) {
      console.log(result);
    }
  }
}
