import tpl from './tpl.hbs';
import './style.scss';

type TProps = {
  href: string;
  value: string;
  className?: string;
};

export default ({ href, value, className }: TProps): string =>
  tpl({ href, value, className });
