"use client";

import React from "react";
import { FormAction, useFormBuilder } from "../hooks/useFormBuilder";
import { FormField, FormStructure, Option } from "../types/formField";

interface FormBuilderProps {
    children: React.ReactNode;
}

export type FormBuilderContextType = {
    form: FormStructure;
    dispatch: React.Dispatch<FormAction>;
    handleTitleChange: (title: string) => void;
    handleDescriptionChange: (description: string) => void;
    handleExport: () => void;
    handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddField: (type: FormField["type"], sectionIndex?: number) => void;
    handleFieldChange: (index: number, field: FormField, sectionIndex?: number) => void;
    handleLabelChange: (index: number, label: string, sectionIndex?: number) => void;
    handleRemoveField: (index: number, sectionIndex?: number) => void;
    handleOptionsChange: (index: number, options: Option[], sectionIndex?: number) => void;
}

export const formBuilderContext = React.createContext<FormBuilderContextType | null>(null);


export default function FormBuilderProvider({ children}: FormBuilderProps) {

    const [form, dispatch] = useFormBuilder();

    const handleTitleChange = (title: string) => {
        dispatch({
            type: 'setTitle',
            payload: title,
        });
    };

    const handleDescriptionChange = (description: string) => {
        dispatch({
            type: 'setDescription',
            payload: description,
        });
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(form, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                const importedForm = JSON.parse(result);
                dispatch({
                    type: 'setForm',
                    payload: importedForm,
                });
            };
            reader.readAsText(file);
        }
    };
    

    const textField = {
        id: Date.now(),
        key: '',
        type: 'text' as "text",
        label: 'New Text Field',
        value: '',
    }

    const numberField = {
        id: Date.now(),
        key: '',
        type: 'number' as 'number',
        label: 'New Number Field',
        value: 0,
    }

    const checkboxField = {
        id: Date.now(),
        key: '',
        type: 'checkbox' as 'checkbox',
        label: 'New Checkbox Field',
        value: [] as string[],
        options: [
            { id: '1', label: 'Option 1' },
            { id: '2', label: 'Option 2' },
        ],
    }

    const multipleChoiceField = {
        id: Date.now(),
        key: '',
        type: 'multiple-choice' as 'multiple-choice',
        label: 'New Multiple Choice Field',
        value: '',
        options: [
            { id: '1', label: 'Option 1' },
            { id: '2', label: 'Option 2' },
        ],
    }

    const dropdownField = {
        id: Date.now(),
        key: '',
        type: 'dropdown' as 'dropdown',
        label: 'New Dropdown Field',
        value: '',
        options: [
            { id: '1', label: 'Option 1' },
            { id: '2', label: 'Option 2' },
        ],
    }

    const sectionField = {
        id: Date.now(),
        key: '',
        type: 'section' as 'section',
        label: 'New Section',
        child: [],
        options: [],
    }
    
    const handleAddField = (type: FormField["type"], sectionIndex?: number) => {
        dispatch({
            type: 'addField',
            payload: {
                field: type === 'text' ? textField : type === 'number' ? numberField : type === 'checkbox' ? checkboxField : type === 'multiple-choice' ? multipleChoiceField : type === 'dropdown' ? dropdownField : sectionField,
                sectionIndex,
            }
        });
    }

    const handleFieldChange = (index: number, field: FormField, sectionIndex?: number) => {
        dispatch({
            type: 'updateField',
            payload: { index, field, sectionIndex },
        });
    }

    const handleLabelChange = (index: number, label: string, sectionIndex?:number) => {
        dispatch({
            type: 'updateField',
            payload: {
                index,
                sectionIndex,
                field: {
                    ...form.items[index],
                    label,
                },
            },
        });
    }

    const handleRemoveField = (index: number, sectionIndex?: number) => {
        dispatch({
            type: 'removeField',
            payload: {
                index,
                sectionIndex
            },
        });
    }

    const handleOptionsChange = (index: number, options: Option[], sectionIndex?: number) => {
        dispatch({
            type: 'updateField',
            payload: {
                index,
                sectionIndex,
                field: {
                    ...form.items[index],
                    ...(['checkbox', 'dropdown', 'multiple-choice', 'section'].includes(form.items[index].type)  ? { options } : {}),
                },
            },
        });
    }



  return <formBuilderContext.Provider value={{
        form,
        dispatch,
        handleTitleChange,
        handleDescriptionChange,
        handleExport,
        handleImport,
        handleAddField,
        handleFieldChange,
        handleLabelChange,
        handleRemoveField,
        handleOptionsChange,

  }}>{children}</formBuilderContext.Provider>;
}
