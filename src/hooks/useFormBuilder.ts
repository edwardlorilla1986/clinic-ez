// hooks/useFormBuilder.ts
import { useReducer } from 'react';
import { FormField, FormStructure, SectionField } from '../types/formField';

export const initialState: FormStructure = {
    title: 'Form Title',
    description: 'Form Description',
    items: [],
};

export type FormAction =
    | { type: 'setForm'; payload: FormStructure }
    | { type: 'setTitle'; payload: string }
    | { type: 'setDescription'; payload: string }
    | { type: 'addField'; payload: { sectionIndex?: number, field: FormField } }
    | { type: 'updateField'; payload: { index: number, field: FormField, sectionIndex?: number } }
    | { type: 'removeField'; payload: { index: number, sectionIndex?: number } };

function formReducer(state: FormStructure, action: FormAction): FormStructure {
    switch (action.type) {
        case 'setForm':
            return { ...action.payload };
        case 'setTitle':
            return { ...state, title: action.payload };
        case 'setDescription':
            return { ...state, description: action.payload };
        case 'addField':
            if (action.payload.sectionIndex !== undefined) {
                return {
                    ...state,
                    items: state.items.map((item, index) => {
                        if (index === action.payload.sectionIndex && 'child' in item) {
                            return {
                                ...item,
                                child: [...item.child, action.payload.field],
                            };
                        } else {
                            return item;
                        }
                    }),
                };
            } else {
                return { ...state, items: [...state.items, action.payload.field] };
            }
        case 'updateField':
            if (action.payload.sectionIndex !== undefined) {
                return {
                    ...state,
                    items: state.items.map((item, index) => {
                        if (index === action.payload.sectionIndex && 'child' in item) {
                            return {
                                ...item,
                                child: item.child.map((child, childIndex) => childIndex === action.payload.index ? action.payload.field : child),
                            };
                        } else {
                            return item;
                        }
                    }),
                };
            } else {
                return {
                    ...state,
                    items: state.items.map((item, index) => index === action.payload.index ? action.payload.field : item),
                };
            }
        case 'removeField':
            if (action.payload.sectionIndex !== undefined) {
                return {
                    ...state,
                    items: state.items.map((item, index) => {
                        if (index === action.payload.sectionIndex && 'child' in item) {
                            return {
                                ...item,
                                child: item.child.filter((_, childIndex) => childIndex !== action.payload.index),
                            };
                        } else {
                            return item;
                        }
                    }),
                };
            } else {
                return {
                    ...state,
                    items: state.items.filter((_, index) => index !== action.payload.index),
                };
            }
        default:
            return state;
    }
}

export const useFormBuilder = () => {
    const [state, dispatch] = useReducer(formReducer, initialState);
    return [state, dispatch] as const;
};
