import React, { useState } from 'react';

interface CheckboxFieldProps {
    label: string;
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
    onLabelChange?: (label: string) => void;  // New prop for updating label
    onOptionsChange?: (options: string[]) => void;  // New prop for updating options
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, options, value, onChange, onLabelChange, onOptionsChange }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(label);

    const handleLabelChange = () => {
        if (onLabelChange) {
            onLabelChange(newLabel);
        }
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
        <div className="mb-4">
            {isEditingLabel ? (
                <div className="flex items-center">
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                    <button className="ml-2 bg-blue-500 text-white py-1 px-3 rounded" onClick={handleLabelChange}>Save</button>
                </div>
            ) : (
                <label className="block text-sm font-medium text-gray-700 mb-1" onDoubleClick={() => setIsEditingLabel(true)}>{label}</label>
            )}
            {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        checked={value.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    {editIndex === index ? (
                        <div className="flex items-center ml-2">
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <button className="ml-2 bg-blue-500 text-white py-1 px-3 rounded" onClick={handleSaveEditOption}>Save</button>
                        </div>
                    ) : (
                        <div className="flex items-center ml-2">
                            <span className="text-sm text-gray-700">{option}</span>
                            <button className="ml-2 text-blue-500 text-sm" onClick={() => handleEditOption(index)}>Edit</button>
                            <button className="ml-2 text-red-500 text-sm" onClick={() => handleDeleteOption(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <div className="flex items-center mt-2">
                <input
                    type="text"
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="New option"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button className="ml-2 bg-green-500 text-white py-1 px-3 rounded" onClick={handleAddOption}>Add Option</button>
            </div>
        </div>
    );
};

export default CheckboxField;
