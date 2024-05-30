import { useReducer } from 'react';
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

type Action =
    | { type: 'setForm'; payload: FormStructure }
    | { type: 'setTitle'; payload: string }
    | { type: 'setDescription'; payload: string }
    | { type: 'addField'; payload: FormField }
    | { type: 'updateField'; payload: { index: number; child: FormField } }
    | { type: 'removeField'; payload: number }
    | { type: 'addSubField'; payload: { sectionIndex: number; child: FormField } }
    | { type: 'updateSubField'; payload: { sectionIndex: number; fieldIndex: number; child: FormField } }
    | { type: 'removeSubField'; payload: { sectionIndex: number; fieldIndex: number } };

const formReducer = (state: FormState, action: Action): FormState => {
    switch (action.type) {
        case 'setForm':
            return { ...state, form: action.payload };
        case 'setTitle':
            return { ...state, form: { ...state.form, title: action.payload } };
        case 'setDescription':
            return { ...state, form: { ...state.form, description: action.payload } };
        case 'addField':
            return { ...state, form: { ...state.form, items: [...state.form.items, action.payload] } };
        case 'updateField':
            return {
                ...state,
                form: {
                    ...state.form,
                    items: state.form.items.map((item, index) =>
                        index === action.payload.index ? action.payload.child : item
                    ),
                },
            };
        case 'removeField':
            return {
                ...state,
                form: {
                    ...state.form,
                    items: state.form.items.filter((_, index) => index !== action.payload),
                },
            };
        case 'addSubField':
            return {
                ...state,
                form: {
                    ...state.form,
                    items: state.form.items.map((item, index) =>
                        index === action.payload.sectionIndex
                            ? { ...item, child: [...(item as SectionField).child, action.payload.child] }
                            : item
                    ),
                },
            };
        case 'addField':
            return {
                ...state,
                form: {
                    ...state.form,
                    items: state.form.items.map((item, index) =>
                        index === action.payload.sectionIndex
                            ? { ...item, child: [...(item as SectionField).child, action.payload.child] }
                            : item
                    ),
                },
            };
        case 'updateSubField':
            return {
                ...state,
                form: {
                    ...state.form,
                    items: state.form.items.map((item, index) =>
                        index === action.payload.sectionIndex
                            ? {
                                ...item,
                                child: (item as SectionField).child.map((childItem, childIndex) =>
                                    childIndex === action.payload.fieldIndex ? action.payload.child : childItem
                                ),
                            }
                            : item
                    ),
                },
            };
        case 'removeSubField':
            return {
                ...state,
                form: {
                    ...state.form,
                    items: state.form.items.map((item, index) =>
                        index === action.payload.sectionIndex
                            ? {
                                ...item,
                                child: (item as SectionField).child.filter(
                                    (_, childIndex) => childIndex !== action.payload.fieldIndex
                                ),
                            }
                            : item
                    ),
                },
            };
        default:
            return state;
    }
};

export const useFormBuilder = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);

    const setForm = (form: FormStructure) => dispatch({ type: 'setForm', payload: form });
    const setTitle = (title: string) => dispatch({ type: 'setTitle', payload: title });
    const setDescription = (description: string) => dispatch({ type: 'setDescription', payload: description });
    const addField = (field: FormField) => dispatch({ type: 'addField', payload: field });
    const handleAddField = (field: FormField) => dispatch({ type: 'handleAddField', payload: field });
    const handleFieldChange = (index: number, child: FormField) => dispatch({ type: 'updateField', payload: { index, child } });
    const handleLabelChange = (index: number, label: string) => dispatch({ type: 'updateField', payload: { index, child: { ...state.form.items[index], label } } });
    const handleOptionsChange = (index: number, options: any) => dispatch({ type: 'updateField', payload: { index, child: { ...state.form.items[index], options } } });
    const handleRemoveField = (index: number) => dispatch({ type: 'removeField', payload: index });
    const addSubField = (sectionIndex: number, child: FormField) => dispatch({ type: 'addSubField', payload: { sectionIndex, child } });
    const updateSubField = (sectionIndex: number, fieldIndex: number, child: FormField) => dispatch({ type: 'updateSubField', payload: { sectionIndex, fieldIndex, child } });
    const removeSubField = (sectionIndex: number, fieldIndex: number) => dispatch({ type: 'removeSubField', payload: { sectionIndex, fieldIndex } });

    return {
        state,
        setForm,
        setTitle,
        setDescription,
        addField,
        handleFieldChange,
        handleLabelChange,
        handleOptionsChange,
        handleRemoveField,
        handleAddField,
        addSubField,
        updateSubField,
        removeSubField
    };
};