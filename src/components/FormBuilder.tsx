import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addField, updateField, removeField } from '../store/formSlice';
import TextField from './TextField';
import NumberField from './NumberField';
import CheckboxField from './CheckboxField';
import { FormField } from '../types/formField';

const FormBuilder: React.FC = () => {
    const formFields = useSelector((state: RootState) => state.form.formFields);
    const dispatch: AppDispatch = useDispatch();

    const handleAddField = (type: FormField['type']) => {
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
        }
        dispatch(addField(newField));
    };

    const handleFieldChange = (index: number, field: FormField) => {
        dispatch(updateField({ index, field }));
    };

    const handleRemoveField = (index: number) => {
        dispatch(removeField(index));
    };

    return (
        <div>
            <h1>Form Builder</h1>
            <button onClick={() => handleAddField('text')}>Add Text Field</button>
            <button onClick={() => handleAddField('number')}>Add Number Field</button>
            <button onClick={() => handleAddField('checkbox')}>Add Checkbox Field</button>
            {formFields.map((field, index) => (
                <div key={index}>
                    {field.type === 'text' && (
                        <TextField
                            label={field.label}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                        />
                    )}
                    {field.type === 'number' && (
                        <NumberField
                            label={field.label}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                        />
                    )}
                    {field.type === 'checkbox' && (
                        <CheckboxField
                            label={field.label}
                            options={field.options}
                            value={field.value}
                            onChange={(value) => handleFieldChange(index, { ...field, value })}
                        />
                    )}
                    <button onClick={() => handleRemoveField(index)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default FormBuilder;
