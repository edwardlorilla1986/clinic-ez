import React from 'react';

interface DropdownFieldProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default DropdownField;
