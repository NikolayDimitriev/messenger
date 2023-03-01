import { Block, TProps } from '../core/Block';

export function render(query: string, block: Block<TProps>) {
  const root: HTMLElement | null = document.querySelector(query) as HTMLElement;

  if (!root) {
    return;
  }

  root.innerHTML = '';
  root.appendChild(block.getContent() as HTMLElement);

  block.dispatchComponentDidMount();

  return root;
}
