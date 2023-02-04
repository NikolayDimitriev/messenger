const rules: Record<string, RegExp> = {
  first_name: /^(?!\d+$){3,20}$/i,
  second_name: /^(?!\d+$){3,20}$/i,
  login: /^(?!\d+$){3,20}$/i,
  email: /^(?!\d+$){3,20}$/i,
  password: /^(?!\d+$){3,20}$/i,
  phone: /^(?!\d+$){3,20}$/i,
  message: /^(?!\d+$){3,20}$/i,
};

export function validation(target: HTMLInputElement, inputName: string) {
  console.log(target, inputName, rules[inputName]);
}

export function onSubmit(e: Event) {
  e.preventDefault();
  const target = e.target as HTMLFormElement;
  let resultStr = '';
  const inputs = target.querySelectorAll('input');
  inputs.forEach((input) => {
    resultStr += `${input.name}: ${input.value} \n`;
  });
  console.log(resultStr);
}
