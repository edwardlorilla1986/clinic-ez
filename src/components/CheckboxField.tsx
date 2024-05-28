import React, { useState } from 'react';

interface CheckboxFieldProps {
    label: string;
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    onLabelChange: (label: string) => void;  // New prop for updating label
    onOptionsChange: (options: string[]) => void;  // New prop for updating options
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, options, value, onChange, onLabelChange, onOptionsChange }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(label);

    const handleLabelChange = () => {
        onLabelChange(newLabel);
        setIsEditingLabel(false);
    };

    const handleCheckboxChange = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((v) => v !== option)
            : [...value, option];
        onChange(newValue);
    };

    const [newOption, setNewOption] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleAddOption = () => {
        if (newOption.trim()) {
            onOptionsChange([...options, newOption]);
            setNewOption('');
        }
    };

    const handleEditOption = (index: number) => {
        setEditIndex(index);
        setEditValue(options[index]);
    };

    const handleSaveEditOption = () => {
        if (editValue.trim() && editIndex !== null) {
            const updatedOptions = [...options];
            updatedOptions[editIndex] = editValue;
            onOptionsChange(updatedOptions);
            setEditIndex(null);
            setEditValue('');
        }
    };

    const handleDeleteOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        onOptionsChange(updatedOptions);
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
                <label onDoubleClick={() => setIsEditingLabel(true)}>{label}</label>
            )}
            {options.map((option, index) => (
                <div key={index}>
                    <input
                        type="checkbox"
                        checked={value.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    {editIndex === index ? (
                        <div>
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                            />
                            <button onClick={handleSaveEditOption}>Save</button>
                        </div>
                    ) : (
                        <div>
                            {option}
                            <button onClick={() => handleEditOption(index)}>Edit</button>
                            <button onClick={() => handleDeleteOption(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <div>
                <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="New option"
                />
                <button onClick={handleAddOption}>Add Option</button>
            </div>
        </div>
    );
};

export default CheckboxField;
