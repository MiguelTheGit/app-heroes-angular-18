import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

// ---------- Cross Validators ----------

/**
 * Validates at the FormGroup level that if alt_img exists, then img must have a value.
 * - alt_img opcional: can be empty.
 * - If alt_img has content, img must have also content
 */
export function altImgRequiresImgValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
        const form = group as FormGroup;
        const img = (form.get('img')?.value ?? '').toString().trim();
        const alt = (form.get('alt_img')?.value ?? '').toString().trim();

        // Si alt_img tiene algo y img está vacío -> error
        if (alt.length > 0 && img.length === 0) {
            return { altImgRequiresImg: true };
        }

        return null;
    };
}


// ---------- Single Validators ----------

/**
 * Validates that the control has one of the allowed values.
 */
export function allowedValuesValidator(allowed: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null || value === '') return { required: true };
    return allowed.includes(value) ? null : { allowedValues: { allowed } };
  };
}

/**
 * Optionally validates against a pattern: if there is a value, it validates it; if it is empty, it does not mark an error.
 */
export function optionalPatternValidator(regex: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value == null || value === '') return null;
    return regex.test(value) ? null : { optionalPattern: true };
  };
}
