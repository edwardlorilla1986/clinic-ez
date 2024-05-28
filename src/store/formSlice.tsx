// src/store/formSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormField } from '../types/formField';

interface FormState {
    formFields: FormField[];
}

const initialState: FormState = {
    formFields: []
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        addField: (state, action: PayloadAction<FormField>) => {
            state.formFields.push(action.payload);
        },
        updateField: (state, action: PayloadAction<{ index: number; field: FormField }>) => {
            const { index, field } = action.payload;
            state.formFields[index] = field;
        },
        removeField: (state, action: PayloadAction<number>) => {
            state.formFields.splice(action.payload, 1);
        }
    }
});

export const { addField, updateField, removeField } = formSlice.actions;
export default formSlice.reducer;
