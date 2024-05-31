import React, { useState } from 'react';
import { Option } from '../types/formField';

interface DropdownFieldProps {
    label: string;
    options: Option[];
    value: Option["id"];
    onChange: (value: Option["id"]) => void;
    onLabelChange?: (label: string) => void;
    onOptionsChange?: (options: Option[]) => void;
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

    const [newOptionLabel, setNewOptionLabel] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleAddOption = () => {
        if (newOptionLabel.trim()) {
            const newOption: Option = { id: `${options.length + 1}`, label: newOptionLabel };
            if (onOptionsChange) {
                onOptionsChange([...options, newOption]);
            }
            setNewOptionLabel("");
        }
    };

    const handleEditOption = (index: number) => {
        setEditIndex(index);
        setEditValue(options[index].label);
    };

    const handleSaveEditOption = () => {
        if (editValue.trim() && editIndex !== null) {
            const updatedOptions = options.map((option, i) =>
                i === editIndex ? { ...option, label: editValue } : option
            );
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
        <div className="mb-4 space-y-2">
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
                    <option key={index} value={option.id}>
                        {option.label}
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
                            <span className="text-sm text-gray-700">{option.label}</span>
                            <button className="ml-2 text-blue-500 text-sm" onClick={() => handleEditOption(index)}>Edit</button>
                            <button className="ml-2 text-red-500 text-sm" onClick={() => handleDeleteOption(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={newOptionLabel}
                    onChange={(e) => setNewOptionLabel(e.target.value)}
                    placeholder="New option"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button disabled={!newOptionLabel} className="disabled:bg-gray-400 bg-green-500 text-white py-1 px-3 rounded" onClick={handleAddOption}>Add Option</button>
            </div>
        </div>
    );
};

export default DropdownField;
