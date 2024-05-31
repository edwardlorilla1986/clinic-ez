'use client';
import React, { useEffect, useCallback, useContext } from 'react';
import FormBuilderProvider, { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField } from '@/src/types/formField';
import { useFormBuilder, initialState } from '@/src/hooks/useFormBuilder';
import PdfGenerator from "@/src/components/Generator/pdf";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const handleAddField = useCallback((type: FormField["type"], sectionIndex?: number, key?: string, label?: string) => {
        let field: FormField;
        const id = Date.now();

        switch (type) {
            case 'text':
                field = { id, key: key ?? '', type: 'text', label: label ?? 'New Text Field', value: '' };
                break;
            case 'number':
                field = { id, key: key ?? '', type: 'number', label: label ?? 'New Number Field', value: 0 };
                break;
            case 'checkbox':
                field = { id, key: key ?? '', type: 'checkbox', label: label ?? 'New Checkbox Field', value: [], options: [{ id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' }] };
                break;
            case 'multiple-choice':
                field = { id, key: key ?? '', type: 'multiple-choice', label: label ?? 'New Multiple Choice Field', value: '', options: [{ id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' }] };
                break;
            case 'dropdown':
                field = { id, key: key ?? '', type: 'dropdown', label: label ?? 'New Dropdown Field', value: '', options: [{ id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' }] };
                break;
            case 'section':
                field = { options: [], id, key: key ?? '', type: 'section', label: label ?? 'New Section', child: [] };
                break;
            default:
                throw new Error('Unknown field type');
        }

        dispatch({ type: 'addField', payload: { field, sectionIndex } });
    }, [dispatch]);

    const handleToggleField = useCallback((type: FormField["type"], sectionIndex: number, key: string, label: string, checked: boolean) => {
        if (checked) {
            handleAddField(type, sectionIndex, key, label);
        } else {
            // @ts-ignore
            const field = form.items[sectionIndex]?.child.findIndex(item => item.key === key);
            if (field > -1) {
                handleRemoveField( field, sectionIndex);
            }
        }
    }, [form, handleAddField, handleRemoveField]);

    useEffect(() => {
        dispatch({ type: 'setForm', payload: initialState });
        handleAddField('section');
    }, [dispatch, handleAddField]);

    const goToEdoc = () => {
        router.push('/edoc');
    };

    if (!form) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6 bg-white shadow rounded-lg">
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded" onClick={goToEdoc}>
                back
            </button>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">e-Prescription Builder</h1>
            <div className="mb-6">
                <input
                    type="text"
                    value={form?.title}
                    onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                    placeholder="Form Title"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div className="mb-6">
                <textarea
                    value={form?.description}
                    onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                    placeholder="Form Description"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 bg-gray-100 border rounded-lg shadow-md">
                    <div className="flex flex-row space-x-4 mb-6 mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => handleToggleField('text', index, 'brand_name', "Brand Name", e.target.checked)}
                            />
                            Add Brand Name
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => handleToggleField('text', index, 'generic_name', "Generic Name", e.target.checked)}
                            />
                            Add Generic Name
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => handleToggleField('number', index, 'quantity', 'Quantity', e.target.checked)}
                            />
                            Add Quantity
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => handleToggleField('text', index, 'interval', 'Sig', e.target.checked)}
                            />
                            Add Sig
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                onChange={(e) => handleToggleField('number', index, 'tablet', 'Tablet', e.target.checked)}
                            />
                            Add Tablet
                        </label>
                    </div>

                    {item.type === 'section' &&
                        item.child.map((supItem, supIndex) => (
                            <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index}/>
                        ))}
                </div>
            ))}
            {form?.items.length > 0 ? <PdfGenerator data={form}/> : null}
        </div>
    );
};

export default Home;
