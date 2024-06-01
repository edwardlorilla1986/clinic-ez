'use client';

import React, { useEffect, useCallback, useContext, useRef, useState } from 'react';
import FormBuilderProvider, { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import { useRouter } from "next/navigation";
import PdfGenerator from "@/src/components/Generator/Prescription";
import RemoveButton from "@/src/components/Button/RemoveButton";

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
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Generate e-Prescription for Patient A</h1>
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
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleAddMedicine}>
                    Add Medicine
                </button>
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

            {form?.items.length > 0 && <PdfGenerator data={form} />}

            {form?.items.map((item, index) => {
                if (item.type === 'section') {
                    return (
                        <div key={index} className="flex flex-wrap gap-4 my-6 p-6 bg-gray-100 border border-gray-200 rounded-lg shadow-sm">
                            {item.child.map((child, childIndex) => (
                                <div key={child.id} className='flex flex-col flex-1'>
                                    <label htmlFor={child.key} className="text-sm font-semibold text-gray-700">{child.label}</label>
                                    <input
                                        type="text"
                                        id={child.key}
                                        value={child.value}
                                        onChange={(e) => handleFieldChange(childIndex, { ...child, value: e.target.value }, index)}
                                        className="mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end w-full">
                                <RemoveButton key={`remove-${item.id}`} onClick={() => handleRemoveField?.(index)} />
                            </div>
                        </div>
                    );
                }
                return <div key={index} className="mb-6">a</div>;
            })}
        </div>
    );
};

export default Home;
