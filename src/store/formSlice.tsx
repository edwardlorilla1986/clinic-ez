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
    child: FormField[];
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
        setChild: (state, action: PayloadAction<FormField[]>) => {
            state.formFields = action.payload;
        },
        addField: (state, action: PayloadAction<FormField>) => {
            state.formFields.push(action.payload);
        },
        updateField: (state, action: PayloadAction<{ index: number; child: FormField }>) => {
            const { index, child } = action.payload;
            state.formFields[index] = child;
        },
        removeField: (state, action: PayloadAction<number>) => {
            state.formFields.splice(action.payload, 1);
        },
        addSubField: (state, action: PayloadAction<{ sectionIndex: number; child: FormField }>) => {
            const { sectionIndex, child } = action.payload;
            const section = state.formFields[sectionIndex] as SectionField;
            section.child.push(child);
        },
        updateSubField: (state, action: PayloadAction<{ sectionIndex: number; fieldIndex: number; child: FormField }>) => {
            const { sectionIndex, fieldIndex, child } = action.payload;
            const section = state.formFields[sectionIndex] as SectionField;
            section.child[fieldIndex] = child;
        },
        removeSubField: (state, action: PayloadAction<{ sectionIndex: number; fieldIndex: number }>) => {
            const { sectionIndex, fieldIndex } = action.payload;
            const section = state.formFields[sectionIndex] as SectionField;
            section.child.splice(fieldIndex, 1);
        },
    },
});

export const { setChild, addField, updateField, removeField, addSubField, updateSubField, removeSubField } = formSlice.actions;
export default formSlice.reducer;
