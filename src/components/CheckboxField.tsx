import React from 'react';

interface CheckboxFieldProps {
    label: string;
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({ label, options, value, onChange }) => {
    const handleCheckboxChange = (option: string) => {
        const newValue = value.includes(option)
            ? value.filter((v) => v !== option)
            : [...value, option];
        onChange(newValue);
    };

    return (
        <div>
            <label>{label}</label>
            {options.map((option) => (
                <div key={option}>
                    <input
                        type="checkbox"
                        checked={value.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                    />
                    {option}
                </div>
            ))}
        </div>
    );
};

export default CheckboxField;
