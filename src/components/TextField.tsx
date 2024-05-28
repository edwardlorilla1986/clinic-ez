import React from 'react';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange }) => (
    <div>
        <label>{label}</label>
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
);

export default TextField;
