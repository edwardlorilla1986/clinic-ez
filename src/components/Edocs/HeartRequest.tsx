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
        const id = Date.now(); // Ensure id is a string

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

    const handleAddCardiovascularProceduresField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
                { id: '1', label: '12 Lead ECG' },
                { id: '2', label: '15 Lead ECG' },
                { id: '3', label: 'Stress Test' },
                { id: '4', label: '24 Holter Monitoring' },
                { id: '5', label: '24 Ambulatory BP' },
                { id: '6', label: 'Carotid Scan' },
                { id: '7', label: 'Transesophageal Echocardiogram (TEE)' },
                { id: '8', label: 'Stress Echo' },
                { id: '9', label: 'Dobutamine Stress Test' },
            ], "Cardiovascular Procedures");
    }, []);

    const handleAddEchocardiogramField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('checkbox', sectionIndex,
            [
                { id: '1', label: '2D Echocardiogram', options: [{ id: '1-1', label: 'Plain' }, { id: '1-2', label: 'Doppler' }] },
                { id: '2', label: 'Venous Duplex Scan (Upper)', options: [{ id: '2-1', label: 'R leg' }, { id: '2-2', label: 'L leg' }] },
                { id: '3', label: 'DVT Screening', options: [{ id: '3-1', label: 'R leg' }, { id: '3-2', label: 'L leg' }] },
                { id: '4', label: 'Arterial Duplex Scan (Upper)', options: [{ id: '4-1', label: 'R arm' }, { id: '4-2', label: 'L arm' }] },
                { id: '5', label: 'Arterial Duplex Scan (Lower)', options: [{ id: '5-1', label: 'R leg' }, { id: '5-2', label: 'L leg' }] },
            ], "Echocardiogram and Scans");
    }, []);

    useEffect(() => {
        dispatch({ type: 'setForm', payload: initialState });
        handleAddField('section');
    }, []);

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Heart Station Request Builder</h1>
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
                    <div className="flex flex-wrap gap-4 mb-6 mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-300"
                                onClick={() => handleAddCardiovascularProceduresField({ formId: item.id, type: 'multiple-choice', key: "cardiovascular_procedures" }, index)}>
                            Add Cardiovascular Procedures
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-300"
                                onClick={() => handleAddEchocardiogramField({ formId: item.id, type: 'multiple-choice', key: "echocardiogram" }, index)}>
                            Add Echocardiogram and Scans
                        </button>
                    </div>
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
