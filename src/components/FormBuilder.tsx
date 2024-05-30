'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setForm, setTitle, setDescription } from '../store/formSlice';
import FormItem from '@/src/components/FormItem';
import { useFormBuilder } from '../hooks/useFormBuilder';

const FormBuilder: React.FC = () => {
    const form = useSelector((state: RootState) => state.form.form);
    const dispatch: AppDispatch = useDispatch();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { handleAddField } = useFormBuilder();
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        const savedForm = localStorage.getItem('form');
        if (savedForm) {
            const parsedForm = JSON.parse(savedForm);
            dispatch(setForm(parsedForm));
        }
    }, [dispatch]);

    useEffect(() => {
        const savedForm = localStorage.getItem('form');
        if(savedForm){
            localStorage.setItem('form', JSON.stringify(form));
        }

    }, [form]);
    const handleTitleChange = (title: string) => {
        dispatch(setTitle(title));
    };

    const handleDescriptionChange = (description: string) => {
        dispatch(setDescription(description));
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(form, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form.json';
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                const importedForm = JSON.parse(result);
                dispatch(setForm(importedForm));
            };
            reader.readAsText(file);
        }
    };

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
                <FormItem key={index} index={index} field={field} />
            ))}
        </div>
    );
};

export default FormBuilder;
