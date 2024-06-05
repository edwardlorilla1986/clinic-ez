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
        generates.push({...form, key: 'heart-request', id: Date.now() + Math.random()});
        localStorage.setItem('builds', JSON.stringify(generates));
        alert('Form saved!');
    };

    if (!form) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">e-Heart Station Request Builder</h1>
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
                                checked={!!checkboxState['cardiovascular_procedures']}
                                onChange={(e) => handleToggleField('checkbox', index, 'cardiovascular_procedures', "Cardiovascular Procedures", [
                                    { id: '1', label: '12 Lead ECG' },
                                    { id: '2', label: '15 Lead ECG' },
                                    { id: '3', label: 'Stress Test' },
                                    { id: '4', label: '24 Holter Monitoring' },
                                    { id: '5', label: '24 Ambulatory BP' },
                                    { id: '6', label: 'Carotid Scan' },
                                    { id: '7', label: 'Transesophageal Echocardiogram (TEE)' },
                                    { id: '8', label: 'Stress Echo' },
                                    { id: '9', label: 'Dobutamine Stress Test' },
                                ], e.target.checked)}
                            />
                            Add Cardiovascular Procedures
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['echocardiogram']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'echocardiogram', "2D Echocardiogram", [
                                    { id: '1-1', label: 'Plain' },
                                    { id: '1-2', label: 'Doppler' },
                                ], e.target.checked)}
                            />
                            Add 2D Echocardiogram
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['venous_duplex_scan_upper']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'venous_duplex_scan_upper', "Venous Duplex Scan (Upper)", [
                                    { id: '2-1', label: 'R leg' },
                                    { id: '2-2', label: 'L leg' },
                                ], e.target.checked)}
                            />
                            Add Venous Duplex Scan (Upper)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['dvt_screening']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'dvt_screening', "DVT Screening", [
                                    { id: '3-1', label: 'R leg' },
                                    { id: '3-2', label: 'L leg' },
                                ], e.target.checked)}
                            />
                            Add DVT Screening
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['arterial_duplex_scan_upper']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'arterial_duplex_scan_upper', "Arterial Duplex Scan (Upper)", [
                                    { id: '4-1', label: 'R arm' },
                                    { id: '4-2', label: 'L arm' },
                                ], e.target.checked)}
                            />
                            Add Arterial Duplex Scan (Upper)
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['arterial_duplex_scan_lower']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'arterial_duplex_scan_lower', "Arterial Duplex Scan (Lower)", [
                                    { id: '5-1', label: 'R leg' },
                                    { id: '5-2', label: 'L leg' },
                                ], e.target.checked)}
                            />
                            Add Arterial Duplex Scan (Lower)
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
