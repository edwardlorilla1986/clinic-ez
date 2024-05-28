'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addField, updateField, removeField, addSubField, updateSubField, removeSubField, setChild } from '../store/formSlice';
import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import CheckboxField from '../components/CheckboxField';
import MultipleChoiceField from '../components/MultipleChoiceField';
import DropdownField from '../components/DropdownField';
import SectionFieldComponent from '../components/SectionFieldComponent';
import { FormField, SectionField } from '../types/formField';
import RemoveButon from "@/src/components/Button/RemoveButton";
import FormItem from "@/src/components/FormItem";



const FormBuilder: React.FC = () => {
    const formFields = useSelector((state: RootState) => state.form.formFields);
    const dispatch: AppDispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);

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

    const handleAddField = (type: FormField['type'], sectionIndex?: number) => {
        let newField: FormField;
        switch (type) {
            case 'text':
                newField = { type, label: 'New Text Field', value: '' };
                break;
            case 'number':
                newField = { type, label: 'New Number Field', value: 0 };
                break;
            case 'checkbox':
                newField = { type, label: 'New Checkbox Field', value: [], options: ['Option 1', 'Option 2'] };
                break;
            case 'multiple-choice':
                newField = { type, label: 'New Multiple Choice Field', value: '', options: ['Option 1', 'Option 2'] };
                break;
            case 'dropdown':
                newField = { type, label: 'New Dropdown Field', value: '', options: ['Option 1', 'Option 2'] };
                break;
            case 'section':
                newField = { type, label: 'New Section', value: '', child: [] };
                break;
        }
        if (sectionIndex !== undefined) {
            dispatch(addSubField({ sectionIndex, child: newField }));
        } else {
            dispatch(addField(newField));
        }
    };



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
                formFields.map( (formField, index ) =>  <FormItem {...formField}/> )
            }

        </div>
    );
};

export default FormBuilder;
