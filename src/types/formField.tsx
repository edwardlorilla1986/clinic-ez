

export type FormFieldType = 'text' | 'number' | 'checkbox' | 'multiple-choice' | 'dropdown' | 'section';

export type Option = {
    id: number;
    label: string;
}

interface BaseField {
    type: FormFieldType;
    label: string;
    value: any;
}

interface TextField extends BaseField {
    type: 'text';
    value: string;
    options?: Option[];
}

interface NumberField extends BaseField {
    type: 'number';
    value: number;
    options?: Option[];
}

interface CheckboxField extends BaseField {
    type: 'checkbox';
    value: Option["id"][];
    options?: Option[];
}

interface MultipleChoiceField extends BaseField {
    type: 'multiple-choice';
    value: Option["id"];
    options: Option[];
}

interface DropdownField extends BaseField {
    type: 'dropdown';
    value: Option["id"];
    options?: Option[];
}

export interface SectionField extends BaseField {
    type: 'section';
    child: FormField[];
    label: string;
    options?: Option[];
}

export type FormField = TextField | NumberField | CheckboxField | MultipleChoiceField | DropdownField | SectionField;
export interface FormStructure {
    title: string;
    description: string;
    items: FormField[];
}