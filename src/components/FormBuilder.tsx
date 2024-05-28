'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addField, updateField, removeField, addSubField, updateSubField, removeSubField, setFields } from '../store/formSlice';
import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import CheckboxField from '../components/CheckboxField';
import MultipleChoiceField from '../components/MultipleChoiceField';
import DropdownField from '../components/DropdownField';
import SectionFieldComponent from '../components/SectionFieldComponent';
import { FormField, SectionField } from '../types/formField';

const FormBuilder: React.FC = () => {
    const formFields = useSelector((state: RootState) => state.form.formFields);
    const dispatch: AppDispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const savedFormFields = localStorage.getItem('formFields');
        if (savedFormFields) {
            const parsedFormFields = JSON.parse(savedFormFields);
            dispatch(setFields(parsedFormFields));
        }
        setIsInitialized(true);
    }, [dispatch]);

    // Save form state to local storage whenever it changes
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
                newField = { type, label: 'New Section', value: '', fields: [] };
                break;
        }
        if (sectionIndex !== undefined) {
            dispatch(addSubField({ sectionIndex, field: newField }));
        } else {
            dispatch(addField(newField));
        }
    };

    const handleFieldChange = (index: number, field: FormField) => {
        dispatch(updateField({ index, field }));
    };

    const handleRemoveField = (index: number) => {
        dispatch(removeField(index));
    };

    const handleSubFieldChange = (sectionIndex: number, fieldIndex: number, field: FormField) => {
        dispatch(updateSubField({ sectionIndex, fieldIndex, field }));
    };

    const handleRemoveSubField = (sectionIndex: number, fieldIndex: number) => {
        dispatch(removeSubField({ sectionIndex, fieldIndex }));
    };

    const handleOptionsChange = (index: number, options: string[]) => {
        const field = formFields[index];
        if (field.type === 'multiple-choice' || field.type === 'checkbox' || field.type === 'dropdown') {
            dispatch(updateField({ index, field: { ...field, options } }));
        }
    };

    const handleLabelChange = (index: number, label: string) => {
        const field = formFields[index];
        dispatch(updateField({ index, field: { ...field, label } }));
    };

    const handleSectionLabelChange = (index: number, label: string) => {
        const section = formFields[index] as SectionField;
        dispatch(updateField({ index, field: { ...section, label } }));
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
