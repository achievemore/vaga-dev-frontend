import { FormArray, FormControl, FormGroup } from "@angular/forms";

export type TransformIntoForms<T> = {
    [K in keyof T]:
    T[K] extends Array<infer U> ?
    U extends object
    ? FormArray<FormGroup<TransformIntoForms<U>>>
    : FormArray<FormControl<U>>
    : T[K] extends object
    ? T[K] extends Date ? FormControl<T[K] | string> : FormGroup<TransformIntoForms<T[K]>>
    : FormControl<T[K]>;
};