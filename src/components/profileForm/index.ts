import { Block } from '../../core/Block';
import { Button } from '../../components/button';
import { ProfileInput } from '../profileInput';
import { FormValidation } from '../../core/FormValidation';
import tpl from './tpl.hbs';
import { TUserProps } from '../../typing';

type TProfileFormProps = TUserProps & {
  isEditData: boolean;
  onSubmit?: (data: any) => void;
};

export class ProfileForm extends Block<TProfileFormProps> {
  private _formValidation!: FormValidation;

  constructor(props: TProfileFormProps) {
    super(props);

    if (this.props.onSubmit) {
      this._formValidation = new FormValidation(this, this.props.onSubmit);
    }
  }

  init() {
    this.children.emailField = new ProfileInput({
      label: 'Почта',
      id: 'email-profile',
      value: this.props.email,
      type: 'email',
      name: 'email',
      disabled: String(!this.props.isEditData),
      errMessage:
        'Только латиница, цифры, спец.символы, обяз. @ буквы и точка после неё!',
    });

    this.children.loginField = new ProfileInput({
      label: 'Логин',
      id: 'login-profile',
      value: this.props.login,
      type: 'text',
      name: 'login',
      disabled: String(!this.props.isEditData),
      errMessage:
        'Длина 3-20 символов. Разрешено: цифры (с буквами!), буквы, дефис и подчеркивание',
    });

    this.children.nameField = new ProfileInput({
      label: 'Имя',
      id: 'first-name-profile',
      value: this.props.first_name,
      type: 'text',
      name: 'first_name',
      disabled: String(!this.props.isEditData),
      errMessage: 'Первая буква - заглавная! Разрешено: буквы и дефис.',
    });

    this.children.secondNameField = new ProfileInput({
      label: 'Фамилия',
      id: 'second-name-profile',
      value: this.props.second_name,
      type: 'text',
      name: 'second_name',
      disabled: String(!this.props.isEditData),
      errMessage: 'Первая буква - заглавная! Разрешено: буквы и дефис.',
    });

    this.children.displayNameField = new ProfileInput({
      label: 'Имя в чате',
      id: 'display-name-profile',
      value: this.props.display_name || '',
      type: 'text',
      name: 'display_name',
      disabled: String(!this.props.isEditData),
      errMessage: 'Первая буква - заглавная! Разрешено: буквы и дефис.',
    });

    this.children.phoneField = new ProfileInput({
      label: 'Телефон',
      id: 'phone-profile',
      value: this.props.phone,
      type: 'text',
      name: 'phone',
      disabled: String(!this.props.isEditData),
      errMessage: 'Длина 10-15 сиволов. Только цифры, может начинать с +!',
    });

    if (this.props.isEditData) {
      this.children.saveBtn = new Button({
        value: 'Сохранить',
        attr: {
          class: 'main-btn profile-wrapper__button--save',
          type: 'submit',
        },
      });
    }
  }

  render() {
    return this.compile(tpl, { ...this.props });
  }
}
