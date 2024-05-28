import React from 'react';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onLabelChange: (label: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, onLabelChange }) => {
    const [isEditingLabel, setIsEditingLabel] = React.useState(false);
    const [newLabel, setNewLabel] = React.useState(label);

    const handleLabelChange = () => {
        onLabelChange(newLabel);
        setIsEditingLabel(false);
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
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
        </div>
    );
};

export default TextField;
