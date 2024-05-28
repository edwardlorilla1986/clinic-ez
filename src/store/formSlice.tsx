import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField, SectionField } from '../types/formField';
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
