import React, { useState } from 'react';

interface DropdownFieldProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
    onLabelChange?: (label: string) => void;
    onOptionsChange?: (options: string[]) => void;
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
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            {options.map((option, index) => (
                <div key={index} className="flex items-center mt-2">
                    {editIndex === index ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <button className="ml-2 bg-blue-500 text-white py-1 px-3 rounded" onClick={handleSaveEditOption}>Save</button>
                        </div>
                    ) : (
                        <div className="flex items-center">
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

export default DropdownField;
