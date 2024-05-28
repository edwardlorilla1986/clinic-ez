'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/src/store';
import { addField, updateField, removeField, addSubField, updateSubField, removeSubField } from '@/src/store/formSlice';
import {FormField, SectionField} from "@/src/types/formField";
import TextField from "@/src/components/TextField";
import NumberField from "@/src/components/NumberField";
import CheckboxField from "@/src/components/CheckboxField";
import MultipleChoiceField from "@/src/components/MultipleChoiceField";
import DropdownField from "@/src/components/DropdownField";
import SectionFieldComponent from "@/src/components/SectionFieldComponent";


const FormBuilder: React.FC = () => {
    const formFields = useSelector((state: RootState) => state.form.formFields);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const savedFormFields = localStorage.getItem('formFields');
        if (savedFormFields) {
            const parsedFormFields = JSON.parse(savedFormFields);
            parsedFormFields.forEach((child: FormField) => {
                dispatch(addField(child));
            });
        }
    }, [dispatch]);

    useEffect(() => {
        localStorage.setItem('formFields', JSON.stringify(formFields));
    }, [formFields]);

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

    const handleFieldChange = (index: number, child: FormField) => {
        dispatch(updateField({ index, child }));
    };

    const handleRemoveField = (index: number) => {
        dispatch(removeField(index));
    };

    const handleSubFieldChange = (sectionIndex: number, fieldIndex: number, child: FormField) => {
        dispatch(updateSubField({ sectionIndex, fieldIndex, child }));
    };

    const handleRemoveSubField = (sectionIndex: number, fieldIndex: number) => {
        dispatch(removeSubField({ sectionIndex, fieldIndex }));
    };

    const handleOptionsChange = (index: number, options: string[]) => {
        const field = formFields[index];
        if (field.type === 'multiple-choice' || field.type === 'checkbox' || field.type === 'dropdown') {
            dispatch(updateField({ index, child: { ...field, options } }));
        }
    };

    const handleLabelChange = (index: number, label: string) => {
        const field = formFields[index];
        dispatch(updateField({ index, child: { ...field, label } }));
    };

    const handleSectionLabelChange = (index: number, label: string) => {
        const section = formFields[index] as SectionField;
        dispatch(updateField({ index, child: { ...section, label } }));
    };

    return (
        <div>
            <h1>Form Builder</h1>
            <button onClick={() => handleAddField('text')}>Add Text Field</button>
            <button onClick={() => handleAddField('number')}>Add Number Field</button>
            <button onClick={() => handleAddField('checkbox')}>Add Checkbox Field</button>
            <button onClick={() => handleAddField('multiple-choice')}>Add Multiple Choice Field</button>
            <button onClick={() => handleAddField('dropdown')}>Add Dropdown Field</button>
            <button onClick={() => handleAddField('section')}>Add Section</button>
            {formFields.map((field, index) => (
                <div key={index}>
                    {field.type === 'text' && (
                        <TextField
                            label={field.label}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                            onLabelChange={(label) => handleLabelChange(index, label)}
                        />
                    )}
                    {field.type === 'number' && (
                        <NumberField
                            label={field.label}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                            onLabelChange={(label) => handleLabelChange(index, label)}
                        />
                    )}
                    {field.type === 'checkbox' && (
                        <CheckboxField
                            label={field.label}
                            options={field.options}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                            onLabelChange={(label) => handleLabelChange(index, label)}
                            onOptionsChange={(options) => handleOptionsChange(index, options)}
                        />
                    )}
                    {field.type === 'multiple-choice' && (
                        <MultipleChoiceField
                            label={field.label}
                            options={field.options}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                            onLabelChange={(label) => handleLabelChange(index, label)}
                            onOptionsChange={(options) => handleOptionsChange(index, options)}
                        />
                    )}
                    {field.type === 'dropdown' && (
                        <DropdownField
                            label={field.label}
                            options={field.options}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                            onLabelChange={(label) => handleLabelChange(index, label)}
                            onOptionsChange={(options) => handleOptionsChange(index, options)}
                        />
                    )}
                    {field.type === 'section' && (
                        <SectionFieldComponent
                            index={index}
                            section={field as SectionField}
                            onLabelChange={handleSectionLabelChange}
                            onAddField={handleAddField}
                            onFieldChange={handleSubFieldChange}
                            onRemoveField={handleRemoveSubField}
                            onRemoveSection={handleRemoveField}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default FormBuilder;
