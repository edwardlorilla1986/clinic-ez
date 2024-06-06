'use client';

import React, { useEffect, useContext, useRef } from 'react';
import { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import RemoveButton from '@/src/components/Button/RemoveButton';
import { FormField } from '@/src/types/formField';

const Home: React.FC = () => {
    const { handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField, form, dispatch, duplicateItems, handleImport } = useContext(formBuilderContext) as FormBuilderContextType;
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const selectedBuild = localStorage.getItem('selectedBuild');
        if (selectedBuild) {
            dispatch({ type: 'setForm', payload: JSON.parse(selectedBuild) });
        }
    }, [dispatch]);

    const handleAddMedicine = () => {
        const duplicatedItems = duplicateItems(form.items);
        dispatch({ type: 'setForm', payload: { ...form, items: [...form.items, ...duplicatedItems] } });
    };

    const handleSubmit = () => {
        const savedGenerates = localStorage.getItem('generates');
        const generates = savedGenerates ? JSON.parse(savedGenerates) : [];
        generates.push({ ...form, key: 'heart-request' });
        localStorage.setItem('generates', JSON.stringify(generates));
        alert('Form saved!');
    };

    const handlePrint = () => {
        window.print();
    };

    if (!form) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    const handleRemoveInitialField = (index: number) => {
        const updatedItems = form.items.filter((_, itemIndex) => itemIndex !== index);
        if (updatedItems.length > 0) {
            dispatch({ type: 'setForm', payload: { ...form, items: updatedItems } });
        } else {
            alert('Form cannot be empty.');
        }
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">e-Heart Station Request Builder</h1>
                <div>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md mr-2" onClick={handleSubmit}>
                        Save
                    </button>
                    <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 shadow-md" onClick={handlePrint}>
                        Print
                    </button>
                </div>
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
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={() => fileInputRef.current?.click()}>
                    Import
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
                    {item?.type === 'section' && item?.child?.map((supItem, supIndex) => (
                        <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                    ))}
                    <div className="flex justify-end mt-4">
                        <RemoveButton key={`remove-${item.id}`} onClick={() => handleRemoveInitialField(index)} />
                    </div>
                </div>
            ))}

            <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Home;
