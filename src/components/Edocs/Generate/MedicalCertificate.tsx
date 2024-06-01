'use client';
import React, { useEffect, useCallback, useContext } from 'react';
import FormBuilderProvider, { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField } from '@/src/types/formField';
import { useFormBuilder, initialState } from '@/src/hooks/useFormBuilder';
import { Option } from '@/src/types/formField';

interface LocalForm {
    id: number;
    key: string;
    items: FormField[];
}

type handleAddParams = {
    formId: number;
    type: FormField["type"];
    key: string;
};

const Home: React.FC = () => {
    const { handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField, form, dispatch } = useContext(formBuilderContext) as FormBuilderContextType;

    const handleAddField = (type: FormField["type"], sectionIndex?: number, options: Option[] = [], optionName?: string) => {
        let field: FormField;
        const id = Date.now();

        switch (type) {
            case 'text':
                field = { id, key: '', type: 'text', label: 'New Text Field', value: '' };
                break;
            case 'number':
                field = { id, key: '', type: 'number', label: 'New Number Field', value: 0 };
                break;
            case 'checkbox':
                field = { id, key: '', type: 'checkbox', label: optionName || 'New Checkbox Field', value: [], options: options };
                break;
            case 'multiple-choice':
                field = { id, key: '', type: 'multiple-choice', label: optionName || 'New Multiple Choice Field', value: '', options: options };
                break;
            case 'dropdown':
                field = { id, key: '', type: 'dropdown', label: optionName || 'New Dropdown Field', value: '', options: options };
                break;
            case 'section':
                field = { options: [], id, key: '', type: 'section', label: optionName || 'New Section', child: [] };
                break;
            default:
                throw new Error('Unknown field type');
        }

        dispatch({ type: 'addField', payload: { field, sectionIndex } });
    };



    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Laboratory Request Builder</h1>
            <input
                type="text"
                value={form?.title}
                onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                placeholder="Form Title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
                value={form?.description}
                onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 border rounded-lg shadow my-3">

                    {
                        item?.type === 'section' &&
                        item?.child?.map((supItem, supIndex) => {
                            return <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                        })
                    }
                </div>
            ))}
        </div>
    );
};

export default Home;
