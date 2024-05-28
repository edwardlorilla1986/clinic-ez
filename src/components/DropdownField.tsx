import React, { useState } from 'react';

interface DropdownFieldProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    onLabelChange?: (label: string) => void;  // New prop for updating label
    onOptionsChange?: (options: string[]) => void;  // New prop for updating options
}

const DropdownField: React.FC<DropdownFieldProps> = ({ label, options, value, onChange, onLabelChange, onOptionsChange }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(label);

    const handleLabelChange = () => {
        if (onLabelChange) {
            onLabelChange(newLabel);
        }
        setIsEditingLabel(false);
    };

    const [newOption, setNewOption] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleAddOption = () => {
        if (newOption.trim()) {
            if (onOptionsChange) {
                onOptionsChange([...options, newOption]);
            }
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
            if (onOptionsChange) {
                onOptionsChange(updatedOptions);
            }
            setEditIndex(null);
            setEditValue('');
        }
    };

    const handleDeleteOption = (index: number) => {
        const updatedOptions = options.filter((_, i) => i !== index);
        if (onOptionsChange) {
            onOptionsChange(updatedOptions);
        }
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
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {options.map((option, index) => (
                <div key={index}>
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

export default DropdownField;
