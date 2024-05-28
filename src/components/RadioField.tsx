import React from 'react';

interface RadioFieldProps {
    label: string;
    options: string[];
    value: string[];
    onChange: (value: string[]) => void;
}

const RadioField: React.FC<RadioFieldProps> = ({ label, options, value, onChange }) => {
    const handleRadioChange = (option: string) => {
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
                        type="radio"
                        checked={value.includes(option)}
                        onChange={() => handleRadioChange(option)}
                    />
                    {option}
                </div>
            ))}
        </div>
    );
};

export default RadioField;
