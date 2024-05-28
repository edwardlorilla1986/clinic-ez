'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addField, addSubField, setChild } from '../store/formSlice';

import { FormField } from '../types/formField';
import FormItem from "@/src/components/FormItem";
import { useFormBuilder } from '../hooks/useFormBuilder';



const FormBuilder: React.FC = () => {
    const formFields = useSelector((state: RootState) => state.form.formFields);
    const dispatch: AppDispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);

    const { handleAddField } = useFormBuilder()

    useEffect(() => {
        const savedFormFields = localStorage.getItem('formFields');
        if (savedFormFields) {
            const parsedFormFields = JSON.parse(savedFormFields);
            dispatch(setChild(parsedFormFields));
        }
        setIsInitialized(true);
    }, [dispatch]);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('formFields', JSON.stringify(formFields));
        }
    }, [formFields, isInitialized]);

   



    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Form Builder</h1>
            <div className="flex space-x-4 mb-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('text')}>Add Text Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('number')}>Add Number Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('checkbox')}>Add Checkbox Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('multiple-choice')}>Add Multiple Choice Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('dropdown')}>Add Dropdown Field</button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleAddField('section')}>Add Section</button>
            </div>
            {
                formFields.map((field, index) => <FormItem key={index} index={index} field={field} />)
            }
        </div>
    );
};

export default FormBuilder;
