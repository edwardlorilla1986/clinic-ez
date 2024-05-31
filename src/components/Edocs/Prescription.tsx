'use client';
import React, {useEffect, useCallback, useContext} from 'react';
import FormBuilderProvider, {formBuilderContext, FormBuilderContextType} from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField } from '@/src/types/formField';
import { useFormBuilder, initialState } from '@/src/hooks/useFormBuilder';
import {id} from "postcss-selector-parser";
import PdfGenerator from "@/src/components/Generator/pdf";

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
    const handleAddField = (type: FormField["type"], sectionIndex?: number, key?: string, label?: string) => {
        let field: FormField;
        const id = Date.now();

        switch (type) {
            case 'text':
                field = { id, key: key ?? '', type: 'text', label:  label ?? 'New Text Field', value: '' };
                break;
            case 'number':
                field = { id, key: key ??'', type: 'number', label: label ?? 'New Number Field', value: 0 };
                break;
            case 'checkbox':
                field = { id, key: key ??'', type: 'checkbox', label: label ?? 'New Checkbox Field', value: [], options: [{ id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' }] };
                break;
            case 'multiple-choice':
                field = { id, key: key ??'', type: 'multiple-choice', label: label ?? 'New Multiple Choice Field', value: '', options: [{ id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' }] };
                break;
            case 'dropdown':
                field = { id, key: key ??'', type: 'dropdown', label: label ?? 'New Dropdown Field', value: '', options: [{ id: '1', label: 'Option 1' }, { id: '2', label: 'Option 2' }] };
                break;
            case 'section':
                field = {options: [], id, key: key ?? '', type: 'section', label:label ?? 'New Section', child: [] };
                break;
            default:
                throw new Error('Unknown field type');
        }

        dispatch({ type: 'addField', payload: { field, sectionIndex } });
    };

    const handleAddBrandNameField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField(payload.type, sectionIndex, 'brand_name', "Brand Name");
    }, []);

    const handleAddGenericNameField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField(payload.type, sectionIndex, 'generic_name', "Generic Name");
    }, []);

    const handleAddQuantityField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField(payload.type, sectionIndex, 'quantity', 'Quantity');
    }, []);

    const handleAddTabletField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField(payload.type, sectionIndex, 'tablet', 'Tablet');
    }, []);
    const handleAddSigField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField(payload.type, sectionIndex, 'interval', 'Sig');
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

            <h1 className="text-2xl font-bold mb-6">e-Prescription Builder</h1>

            <input
                type="text"
                value={form?.title}
                onChange={(e) => dispatch({type: 'setTitle', payload: e.target.value})}
                placeholder="Form Title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
                value={form?.description}
                onChange={(e) => dispatch({type: 'setDescription', payload: e.target.value})}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            <button className="mt-1 bg-blue-500 text-white py-2 px-4 rounded"
                    onClick={() =>   handleAddField('section')}>
                Add Field
            </button>



            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 border rounded-lg shadow my-3">
                    <div className="flex space-x-4 mb-6 mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddBrandNameField({
                                    formId: item.id,
                                    type: 'text',
                                    key: "brand_name"
                                }, index)}>
                            Add Brand Name
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddGenericNameField({
                                    formId: item.id,
                                    type: 'text',
                                    key: "generic_name"
                                }, index)}>
                            Add Generic Name
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddQuantityField({
                                    formId: item.id,
                                    type: 'number',
                                    key: "quantity"
                                }, index)}>
                            Add Quantity
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddSigField({
                                    formId: item.id,
                                    type: 'text',
                                    key: "interval"
                                }, index)}>
                            Add Sig
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddTabletField({
                                    formId: item.id,
                                    type: 'number',
                                    key: "tablet"
                                }, index)}>
                            Add Tablet
                        </button>
                    </div>
                    {
                        item?.type === 'section' &&
                        item?.child?.map((supItem, supIndex) => {
                            return <FormItem key={supIndex} index={supIndex} field={supItem}/>
                        })
                    }

                </div>
            ))}
            {
                form?.items?.length > 0 ?  <PdfGenerator data={form}/> : null
            }

        </div>

    );
};

export default Home;