'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import FormItem from '@/src/components/FormItem';
import { useFormBuilder } from '../hooks/useFormBuilder';
import { FormField } from '../types/formField';
import { FormBuilderContextType, formBuilderContext } from '../context/FormBuilderContext';

const FormBuilder: React.FC = () => {
    const { dispatch, form, handleTitleChange, handleDescriptionChange, handleExport, handleImport, handleAddField} = useContext(formBuilderContext) as FormBuilderContextType;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        const savedForm = localStorage.getItem('form');
        if (savedForm) {
            const parsedForm = JSON.parse(savedForm);
            dispatch({
                type: 'setForm',
                payload: parsedForm,
            });
        }
    }, [dispatch]);

    useEffect(() => {
        const savedForm = localStorage.getItem('form');
        if(savedForm){
            localStorage.setItem('form', JSON.stringify(form));
        }

    }, [form]);
    


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Form Builder</h1>
            <div className="mb-6">
                <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Form Title"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <textarea
                    value={form.description}
                    onChange={(e) => handleDescriptionChange(e.target.value)}
                    placeholder="Form Description"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>
            <div className="flex space-x-4 mb-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('text')}>Add Text Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('number')}>Add Number Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('checkbox')}>Add Checkbox Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('multiple-choice')}>Add Multiple Choice Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('dropdown')}>Add Dropdown Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('section')}>Add Section</button>
            </div>
            <div className="flex space-x-4 mb-6">
                <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleExport}>Export JSON</button>
                <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={() => fileInputRef.current?.click()}>Import JSON</button>
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImport}
                />
            </div>
            {form.items.map((field, index) => (
                <FormItem 
                    key={index} 
                    index={index} 
                    field={field} 
                    
                />
            ))}
        </div>
    );
};

export default FormBuilder;
