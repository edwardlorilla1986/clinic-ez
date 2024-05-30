import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField, SectionField, FormStructure } from '../types/formField';
export interface FormState {
    form: FormStructure;
}

export const initialState: FormState = {
    form: {
        title: 'Form Title',
        description: 'Form Description',
        items: [],
    },
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        setForm: (state, action: PayloadAction<FormStructure>) => {
            state.form = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.form.title = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.form.description = action.payload;
        },
        addField: (state, action: PayloadAction<FormField>) => {
            state.form.items.push(action.payload);
        },
        updateField: (state, action: PayloadAction<{ index: number; child: FormField }>) => {
            const { index, child } = action.payload;
            state.form.items[index] = child;
        },
        removeField: (state, action: PayloadAction<number>) => {
            console.log(state.form, "state.form.")
            state.form.items.splice(action.payload, 1);
        },
        addSubField: (state, action: PayloadAction<{ sectionIndex: number; child: FormField }>) => {
            const { sectionIndex, child } = action.payload;
            const section = state.form.items[sectionIndex] as SectionField;
            section.child.push(child);
        },
        updateSubField: (state, action: PayloadAction<{ sectionIndex: number; fieldIndex: number; child: FormField }>) => {
            const { sectionIndex, fieldIndex, child } = action.payload;
            const section = state.form.items[sectionIndex] as SectionField;
            section.child[fieldIndex] = child;
        },
        removeSubField: (state, action: PayloadAction<{ sectionIndex: number; fieldIndex: number }>) => {
            const { sectionIndex, fieldIndex } = action.payload;
            const section = state.form.items[sectionIndex] as SectionField;
            section.child.splice(fieldIndex, 1);
        },
    },
});

export const {  } = formSlice.actions;
export default formSlice.reducer;
