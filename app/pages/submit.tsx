import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import TextField from '../components/TextField';
import NumberField from '../components/NumberField';
import CheckboxField from '../components/CheckboxField';
import MultipleChoiceField from '../components/MultipleChoiceField';

const FormSubmission: React.FC = () => {
    const formFields = useSelector((state: RootState) => state.form.formFields);

    const handleFieldChange = (index: number, field: any) => {
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted', formFields);
    };

    return (
        <div>
            <h1>Form Submission</h1>
            <form onSubmit={handleSubmit}>
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
                        {field.type === 'multiple-choice' && (
                            <MultipleChoiceField
                                label={field.label}
                                options={field.options}
                                value={field.value}
                                onChange={(value) => handleFieldChange(index, { ...field, value })}
                            />
                        )}
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormSubmission;
