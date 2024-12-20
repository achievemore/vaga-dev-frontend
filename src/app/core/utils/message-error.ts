import { FormGroup } from "@angular/forms";

const messageError = (form: FormGroup, nameField: string) => {
  if (form.controls[nameField].hasError("required")) {
    return `Campo Obrigatório`;
  }

  if (form.controls[nameField].hasError("email")) {
    return `Email inválido`;
  }

  if (form.controls[nameField].hasError("maxlength")) {
    return `Máximo de ${
      form.controls[nameField].getError("maxlength").requiredLength
    } caracteres`;
  }
  return undefined;
};

export { messageError };
