"use client";

import { useReducer } from 'react';
import { FormField, FormStructure } from '../types/formField';

// Define the state and action types

export const initialState: FormStructure = {
    title: 'Form Title',
    description: 'Form Description',
    items: [],
};

export type FormAction =
    | { type: 'setForm'; payload: FormStructure }
    | { type: 'setTitle'; payload: string }
    | { type: 'setDescription'; payload: string }
    | { type: 'addField'; payload: {sectionIndex?: number, field: FormField} }
    | { type: 'updateField'; payload: {index: number; sectionIndex?: number, field: FormField } }
    | { type: 'removeField'; payload: {index: number, sectionIndex?: number;} }

// Create a reducer function
function formReducer(state: FormStructure, action: FormAction): FormStructure {
    switch (action.type) {
        case 'setForm':
            return { ...action.payload };
        case 'setTitle':
            return { ...state, title: action.payload  };
        case 'setDescription':
            return { ...state, description: action.payload  };
        case 'addField':
            if (typeof action.payload.sectionIndex === 'number') {
                // Add subfield
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
                // Add field
                return { ...state, items: [...state.items, action.payload.field] };
            }
        case 'updateField':
            if (typeof action.payload.sectionIndex === 'number') {
                // Update subfield
                return {
                    ...state,
                    items: state.items.map((item, index) => {
                        if (index === action.payload.sectionIndex && 'child' in item) {
                            console.log(action.payload.field);
                            
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
                // Update field
                return {
                    ...state,
                    items: state.items.map((item, index) => index === action.payload.index ? action.payload.field : item),
                };
            }
        case 'removeField':
            if (typeof action.payload.sectionIndex === 'number') {
                // Remove subfield
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
                // Remove field
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
// Use the useReducer hook in your component
    const [state, dispatch] = useReducer(formReducer, initialState);

    return [state, dispatch] as const;

};