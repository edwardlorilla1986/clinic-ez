export type Option = {
    id: string;
    label: string;
    options?: Option[]
}

interface BaseField {
    id: number;
    key: string;
    label: string;
}

export interface TextField extends BaseField {
    type: 'text';
    value: string;
}

export interface NumberField extends BaseField {
    type: 'number';
    value: number;
}

export interface CheckboxField extends BaseField {
    type: 'checkbox';
    options: Option[];
    value: string[];
}

export interface MultipleChoiceField extends BaseField {
    type: 'multiple-choice';
    options: Option[];
    value: string;
}

export interface DropdownField extends BaseField {
    type: 'dropdown';
    options: Option[];
    value: string;
}

export interface SectionField extends BaseField {
    type: 'section';
    options: Option[];
    child: FormField[];
}

export type FormField = TextField | NumberField | CheckboxField | MultipleChoiceField | DropdownField | SectionField;
export interface FormStructure {
    title: string;
    description: string;
    items: FormField[];
}