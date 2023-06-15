import { AbstractControl, ValidationErrors } from '@angular/forms';

export function forbidenWordValidator(word: string) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;

    if (value && value.toLowerCase() === word.toLowerCase()) {
      return { forbiddenWord: true };
    }

    return null;
  };
}