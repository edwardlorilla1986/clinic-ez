export type FormFieldType = 'text' | 'number' | 'checkbox';

interface BaseField {
    type: FormFieldType;
    label: string;
    value: any;
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
    value: string[];
    options: string[];
}

export type FormField = TextField | NumberField | CheckboxField;
