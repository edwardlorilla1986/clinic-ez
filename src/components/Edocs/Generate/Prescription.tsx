'use client';

import React, { useEffect, useCallback, useContext, useRef, useState } from 'react';
import FormBuilderProvider, { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField } from '@/src/types/formField';
import { initialState } from '@/src/hooks/useFormBuilder';
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const { handleFieldChange, duplicateItems, handleAddField, handleOptionsChange, handleRemoveField, form, dispatch, handleExport, handleImport } = useContext(formBuilderContext) as FormBuilderContextType;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const goToEdoc = () => {
        router.push('/edoc');
    };


    const handleAddMedicine = () => {
        const duplicatedItems = duplicateItems(form.items);
        dispatch({ type: 'setForm', payload: { ...form, items: [...form.items, ...duplicatedItems] } });
    };

    if (!form) {
        return <div className="text-center py-10">Loading...</div>;
    }


    return (
        <div className="container mx-auto p-6 bg-white shadow rounded-lg">
            <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded" onClick={goToEdoc}>
                Back
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

            <div className="mb-6">
                <button className="ml-1 bg-blue-500 text-white py-2 px-4 rounded"
                        onClick={handleAddMedicine}>
                    Add Medicine
                </button>
                <button className="ml-1 bg-green-500 text-white py-2 px-4 rounded" onClick={handleExport}>
                    Export Form
                </button>
                <button className="ml-1 bg-green-500 text-white py-2 px-4 rounded"
                        onClick={() => fileInputRef.current?.click()}>
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
                <div key={item.id} className="mb-8 p-6 bg-gray-100 border rounded-lg shadow-md">
                {item.type === 'section' &&
                        item.child.map((supItem, supIndex) => (
                            <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                        ))}
                </div>
            ))}
        </div>
    );
};

export default Home;
