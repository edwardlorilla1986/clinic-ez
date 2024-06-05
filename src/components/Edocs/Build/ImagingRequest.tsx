'use client';

import React, { useEffect, useCallback, useContext, useRef, useState } from 'react';
import { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField, Option } from '@/src/types/formField';
import { initialState } from '@/src/hooks/useFormBuilder';
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const { handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField, form, dispatch, handleExport, handleImport } = useContext(formBuilderContext) as FormBuilderContextType;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});

    const handleAddField = useCallback((type: FormField["type"], sectionIndex?: number, key?: string, label?: string, options: Option[] = []) => {
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
                field = { id, key: key ?? '', type: 'checkbox', label: label ?? 'New Checkbox Field', value: [], options: options };
                break;
            case 'multiple-choice':
                field = { id, key: key ?? '', type: 'multiple-choice', label: label ?? 'New Multiple Choice Field', value: '', options: options };
                break;
            case 'dropdown':
                field = { id, key: key ?? '', type: 'dropdown', label: label ?? 'New Dropdown Field', value: '', options: options };
                break;
            case 'section':
                field = { options: [], id, key: key ?? '', type: 'section', label: label ?? 'New Section', child: [] };
                break;
            default:
                throw new Error('Unknown field type');
        }

        dispatch({ type: 'addField', payload: { field, sectionIndex } });
    }, [dispatch]);

    const handleToggleField = useCallback((type: FormField["type"], sectionIndex: number, key: string, label: string, options: Option[], checked: boolean) => {
        setCheckboxState((prevState) => ({ ...prevState, [key]: checked }));
        if (checked) {
            handleAddField(type, sectionIndex, key, label, options);
        } else {
            const section = form.items[sectionIndex];
            if (section && section.type === 'section') {
                const fieldIndex = section.child.findIndex((item: FormField) => item.key === key);
                if (fieldIndex > -1) {
                    handleRemoveField(fieldIndex, sectionIndex);
                }
            }
        }
    }, [form, handleAddField, handleRemoveField]);

    const handleRemoveFieldWithCheckboxUpdate = useCallback((index: number, sectionIndex?: number) => {
        const section = form.items[sectionIndex!];
        if (section && section.type === 'section') {
            const field = section.child[index];
            setCheckboxState((prevState) => ({ ...prevState, [field.key]: false }));
        }
        handleRemoveField(index, sectionIndex);
    }, [form, handleRemoveField]);

    useEffect(() => {
        const savedForm = localStorage.getItem('form');
        dispatch({ type: 'setForm', payload: JSON.parse(savedForm as string) ?? initialState });
        handleAddField('section');
    }, [dispatch, handleAddField]);

    const goToEdoc = () => {
        router.push('/edoc');
    };

    const handleSubmit = () => {
        const savedGenerates = localStorage.getItem('builds');
        const generates = savedGenerates ? JSON.parse(savedGenerates) : [];
        generates.push({...form, key: 'imaging-request', id: Date.now() + Math.random() });
        localStorage.setItem('builds', JSON.stringify(generates));
        alert('Form saved!');
    };

    if (!form) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">e-Imaging Request Builder</h1>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={goToEdoc}>
                    Back
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={form?.title}
                    onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                    placeholder="Form Title"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="mb-6">
                <textarea
                    value={form?.description}
                    onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                    placeholder="Form Description"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end space-x-2 mb-6">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={handleExport}>
                    Export Form
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={() => fileInputRef.current?.click()}>
                    Import Form
                </button>
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImport}
                />
            </div>

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow my-3">
                    <div className="flex flex-wrap gap-4 mb-6 mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['assessment']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'assessment', "Pregnant (Female)", [
                                    { id: '1', label: 'Yes' },
                                    { id: '2', label: 'No' },
                                ], e.target.checked)}
                            />
                            Add Pregnant (Female)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['iv_contrast']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'iv_contrast', "IV Contrast (optional)", [
                                    { id: '1', label: 'Yes' },
                                    { id: '2', label: 'No' },
                                ], e.target.checked)}
                            />
                            Add IV Contrast (optional)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['examination']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'examination', "Examination", [
                                    { id: '1', label: 'X-RAY' },
                                    { id: '2', label: 'MRI' },
                                    { id: '3', label: 'CT' },
                                    { id: '4', label: 'ULTRASOUND' },
                                    { id: '5', label: 'FLUOROSCOPY' },
                                    { id: '6', label: 'BREAST IMAGING' },
                                    { id: '7', label: 'NUCLEAR MEDICINE' },
                                    { id: '8', label: 'DENSITOMETRY' },
                                ], e.target.checked)}
                            />
                            Add Examination
                        </label>
                    </div>

                    {item?.type === 'section' && item?.child?.map((supItem, supIndex) => (
                        <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                    ))}
                </div>
            ))}

            <div className="flex justify-end">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Home;
