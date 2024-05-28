import React, { useState } from 'react';
import { FormField, SectionField } from '../types/formField';
import TextField from './TextField';
import NumberField from './NumberField';
import CheckboxField from './CheckboxField';
import MultipleChoiceField from './MultipleChoiceField';
import DropdownField from './DropdownField';

interface SectionFieldComponentProps {
    index: number;
    section: SectionField;
    onLabelChange: (index: number, label: string) => void;
    onAddField: (type: FormField['type'], sectionIndex: number) => void;
    onFieldChange: (sectionIndex: number, fieldIndex: number, field: FormField) => void;
    onRemoveField: (sectionIndex: number, fieldIndex: number) => void;
    onRemoveSection: (index: number) => void;
}

const SectionFieldComponent: React.FC<SectionFieldComponentProps> = ({
                                                                         index,
                                                                         section,
                                                                         onLabelChange,
                                                                         onAddField,
                                                                         onFieldChange,
                                                                         onRemoveField,
                                                                         onRemoveSection,
                                                                     }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(section.label);

    const handleLabelChange = () => {
        onLabelChange(index, newLabel);
        setIsEditingLabel(false);
    };

    return (
        <div>
            {isEditingLabel ? (
                <div>
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                    />
                    <button onClick={handleLabelChange}>Save</button>
                </div>
            ) : (
                <h2 onDoubleClick={() => setIsEditingLabel(true)}>{section.label}</h2>
            )}
            <button onClick={() => onAddField('text', index)}>Add Text Field</button>
            <button onClick={() => onAddField('number', index)}>Add Number Field</button>
            <button onClick={() => onAddField('checkbox', index)}>Add Checkbox Field</button>
            <button onClick={() => onAddField('multiple-choice', index)}>Add Multiple Choice Field</button>
            <button onClick={() => onAddField('dropdown', index)}>Add Dropdown Field</button>
            {section.fields.map((subField, subIndex) => (
                <div key={subIndex}>
                    {subField.type === 'text' && (
                        <TextField
                            label={subField.label}
                            value={subField.value}
                            onChange={(value) => onFieldChange(index, subIndex, { ...subField, value })}
                            onLabelChange={(label) => onFieldChange(index, subIndex, { ...subField, label })}
                        />
                    )}
                    {subField.type === 'number' && (
                        <NumberField
                            label={subField.label}
                            value={subField.value}
                            onChange={(value) => onFieldChange(index, subIndex, { ...subField, value })}
                            onLabelChange={(label) => onFieldChange(index, subIndex, { ...subField, label })}
                        />
                    )}
                    {subField.type === 'checkbox' && (
                        <CheckboxField
                            label={subField.label}
                            options={subField.options}
                            value={subField.value}
                            onChange={(value) => onFieldChange(index, subIndex, { ...subField, value })}
                            onLabelChange={(label) => onFieldChange(index, subIndex, { ...subField, label })}
                            onOptionsChange={(options) => onFieldChange(index, subIndex, { ...subField, options })}
                        />
                    )}
                    {subField.type === 'multiple-choice' && (
                        <MultipleChoiceField
                            label={subField.label}
                            options={subField.options}
                            value={subField.value}
                            onChange={(value) => onFieldChange(index, subIndex, { ...subField, value })}
                            onLabelChange={(label) => onFieldChange(index, subIndex, { ...subField, label })}
                            onOptionsChange={(options) => onFieldChange(index, subIndex, { ...subField, options })}
                        />
                    )}
                    {subField.type === 'dropdown' && (
                        <DropdownField
                            label={subField.label}
                            options={subField.options}
                            value={subField.value}
                            onChange={(value) => onFieldChange(index, subIndex, { ...subField, value })}
                            onLabelChange={(label) => onFieldChange(index, subIndex, { ...subField, label })}
                            onOptionsChange={(options) => onFieldChange(index, subIndex, { ...subField, options })}
                        />
                    )}
                    <button onClick={() => onRemoveField(index, subIndex)}>Remove Subfield</button>
                </div>
            ))}
            <button onClick={() => onRemoveSection(index)}>Remove Section</button>
        </div>
    );
};

export default SectionFieldComponent;
