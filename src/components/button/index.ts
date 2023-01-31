import Block from '../../core/Block';
import tpl from './tpl.hbs';
import './style.scss';

type ButtonProps = {
  value: string;
  className?: string;
  onClick?: string;
};

// export default ({ value, className = 'main-btn', onClick = '' }: TProps) => {
//   return tpl({ value, className, onClick });
// };


export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return `<div>${this.props.text}</div>`;
  }
}
