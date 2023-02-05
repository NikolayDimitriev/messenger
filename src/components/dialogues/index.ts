import { Block, TProps } from '../../utils/Block';
import tpl from './tpl.hbs';
import './style.scss';
import { TDate } from '../../data/data.props';

type TDialogueProps = TProps & {
  name: string;
  owner: boolean;
  text: string;
  date: TDate;
  count: number | null;
};

export class Dialogue extends Block<TDialogueProps> {
  constructor(props: TDialogueProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, {
      name: this.props.name,
      owner: this.props.owner,
      text: this.props.text,
      date: this.props.date,
      count: this.props.count,
    });
  }
}
