'use client';

import React, { useEffect, useCallback, useContext, useRef, useState } from 'react';
import { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import { useRouter } from 'next/navigation';
import PdfGenerator from '@/src/components/Generator/pdf';
import RemoveButton from '@/src/components/Button/RemoveButton';

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
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Generate Medical Certificate for Patient A</h1>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={goToEdoc}>
                    Back
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={form?.title}
                    onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                    placeholder="Certificate Title"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="mb-6">
                <textarea
                    value={form?.description}
                    onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                    placeholder="Certificate Description"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end space-x-2 mb-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleAddMedicine}>
                    Add Medicine
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={handleExport}>
                    Export Certificate
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={() => fileInputRef.current?.click()}>
                    Import Certificate
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

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow my-3">
                    <div className="flex">
                        <div className="flex flex-col flex-1">
                            {item?.type === 'section' && item?.child?.map((supItem, supIndex) => (
                                supItem.type === 'checkbox' && (
                                    <div key={supItem.id} className="flex flex-col mb-2">
                                        <label className="section-title text-sm font-semibold text-gray-700 mb-2">{supItem.label}</label>
                                        {supItem.options.map(option => (
                                            <label key={option.id} className="flex items-center mb-2">
                                                <span className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={supItem.value.includes(option.id)}
                                                        onChange={(e) => {
                                                            const newValue = e.target.checked
                                                                ? [...supItem.value, option.id]
                                                                : supItem.value.filter(val => val !== option.id);
                                                            handleFieldChange(supIndex, {
                                                                ...supItem,
                                                                value: newValue
                                                            }, index);
                                                        }}
                                                    />
                                                    <span></span>
                                                </span>
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                        <div className="flex flex-col flex-1 mb-4">
                            {item?.type === 'section' && item?.child?.map((supItem, supIndex) => (
                                supItem.type === 'multiple-choice' && (
                                    <div key={supItem.id} className="flex flex-col mb-2">

                                        <label className="section-title text-sm font-semibold text-gray-700 ml-1">{supItem.label}</label>

                                        {supItem.options.map(option => (
                                            <label key={option.id} className="flex items-center">
                                                <span className="custom-radio">
                                                    <input
                                                        type="radio"
                                                        name={supItem.key}
                                                        checked={supItem.value === option.id}
                                                        onChange={() => handleFieldChange(supIndex, {
                                                            ...supItem,
                                                            value: option.id
                                                        }, index)}
                                                    />
                                                    <span></span>
                                                </span>
                                                {option.label}
                                            </label>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <RemoveButton key={`remove-${item.id}`} onClick={() => handleRemoveField(index)} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
