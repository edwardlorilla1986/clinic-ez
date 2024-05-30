export type Option = {
    id: string;
    label: string;
}

interface BaseField {
    id: number;
    key: string;
    label: string;
}

interface TextField extends BaseField {
    type: 'text';
    value: string;
}

interface NumberField extends BaseField {
    type: 'number';
    value: number;
}

interface CheckboxField extends BaseField {
    type: 'checkbox';
    options: Option[];
    value: string[];

}

interface MultipleChoiceField extends BaseField {
    type: 'multiple-choice';
    options: Option[];
    value: string;
}

interface DropdownField extends BaseField {
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