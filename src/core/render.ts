import Block from './Block';

export default function render(query: string, block: Block) {
  const root: HTMLElement | null = document.querySelector(query);
  
  if (!root) {
    return;
  }

  root.innerHTML = "";
  root.appendChild(block.getContent());
  
  block.dispatchComponentDidMount();
  
  return root;
}
