import { AbstractControl, ValidationErrors } from "@angular/forms";

export const checkPasswords = (group: AbstractControl):  ValidationErrors | null => {
  let pass = group.get('password')?.value;
  let confirmPass = group.get('confirmPassword')?.value;
  return pass === confirmPass ? null : { notSame: true }
}
