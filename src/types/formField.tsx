import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FormFieldType = 'text' | 'number' | 'checkbox' | 'multiple-choice' | 'dropdown' | 'section';

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

interface MultipleChoiceField extends BaseField {
    type: 'multiple-choice';
    value: string;
    options: string[];
}

interface DropdownField extends BaseField {
    type: 'dropdown';
    value: string;
    options: string[];
}

export interface SectionField extends BaseField {
    type: 'section';
    fields: FormField[];
    label: string;
}

export type FormField = TextField | NumberField | CheckboxField | MultipleChoiceField | DropdownField | SectionField;
