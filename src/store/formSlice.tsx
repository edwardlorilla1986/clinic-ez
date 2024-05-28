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

interface SectionField extends BaseField {
    type: 'section';
    fields: FormField[];
}

export type FormField = TextField | NumberField | CheckboxField | MultipleChoiceField | DropdownField | SectionField;

interface FormState {
    formFields: FormField[];
}

const initialState: FormState = { formFields: [] };

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setFields: (state, action: PayloadAction<FormField[]>) => {
            state.formFields = action.payload;
        },
        addField: (state, action: PayloadAction<FormField>) => {
            state.formFields.push(action.payload);
        },
        updateField: (state, action: PayloadAction<{ index: number; field: FormField }>) => {
            const { index, field } = action.payload;
            state.formFields[index] = field;
        },
        removeField: (state, action: PayloadAction<number>) => {
            state.formFields.splice(action.payload, 1);
        },
        addSubField: (state, action: PayloadAction<{ sectionIndex: number; field: FormField }>) => {
            const { sectionIndex, field } = action.payload;
            const section = state.formFields[sectionIndex] as SectionField;
            section.fields.push(field);
        },
        updateSubField: (state, action: PayloadAction<{ sectionIndex: number; fieldIndex: number; field: FormField }>) => {
            const { sectionIndex, fieldIndex, field } = action.payload;
            const section = state.formFields[sectionIndex] as SectionField;
            section.fields[fieldIndex] = field;
        },
        removeSubField: (state, action: PayloadAction<{ sectionIndex: number; fieldIndex: number }>) => {
            const { sectionIndex, fieldIndex } = action.payload;
            const section = state.formFields[sectionIndex] as SectionField;
            section.fields.splice(fieldIndex, 1);
        },
    },
});

export const { setFields, addField, updateField, removeField, addSubField, updateSubField, removeSubField } = formSlice.actions;
export default formSlice.reducer;
