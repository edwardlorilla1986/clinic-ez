import React, { useState } from 'react';
import { Option } from '../types/formField';

interface CheckboxFieldProps {
    label: string;
    options: Option[];
    value: Option["id"][];
    onChange: (value: Option["id"][]) => void;
    onLabelChange?: (label: string) => void;  // New prop for updating label
    onOptionsChange?: (options: Option[]) => void;  // New prop for updating options
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, options, value, onChange, onLabelChange, onOptionsChange }) => {

    const initialOption: Option = {
        id: (Math.max(...options.map((o) => Number(o.id)), 0) + 1).toString(),
        label: '',
    };
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(label);

    const handleLabelChange = () => {
        if (onLabelChange) {
            onLabelChange(newLabel);
        }
        setIsEditingLabel(false);
    };

    const handleCheckboxChange = (option: Option) => {
        const newValue = value.includes(option.id)
            ? value.filter((v) => v !== option.id)
            : [...value, option.id];
        onChange(newValue);
    };

    const [newOptionLabel, setNewOptionLabel] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editValue, setEditValue] = useState('');

    const handleAddOption = () => {
        if (newOptionLabel.trim()) {
            if (onOptionsChange) {
                onOptionsChange([...options, {...initialOption, label: newOptionLabel }]);
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
            const updatedOptions = [...options];
            updatedOptions[editIndex] = { ...updatedOptions[editIndex], label: editValue };

            console.log({updatedOptions});
            
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
                        checked={value.includes(option.id)}
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
                            <span className="text-sm text-gray-700">{option.label}</span>
                            <button className="ml-2 text-blue-500 text-sm" onClick={() => handleEditOption(index)}>Edit</button>
                            <button className="ml-2 text-red-500 text-sm" onClick={() => handleDeleteOption(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
            <div className="flex items-center mt-2">
                <input
                    type="text"
                    value={newOptionLabel}
                    onChange={(e) => setNewOptionLabel(e.target.value)}
                    placeholder="New option"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button className="ml-2 bg-green-500 text-white py-1 px-3 rounded" onClick={handleAddOption}>Add Option</button>
            </div>
        </div>
    );
};

export default CheckboxField;
