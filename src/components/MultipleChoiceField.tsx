import React from 'react';

interface MultipleChoiceFieldProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({ label, options, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            {options.map((option) => (
                <div key={option}>
                    <input
                        type="radio"
                        name={label}
                        value={option}
                        checked={value === option}
                        onChange={(e) => onChange(e.target.value)}
                    />
                    {option}
                </div>
            ))}
        </div>
    );
};

export default MultipleChoiceField