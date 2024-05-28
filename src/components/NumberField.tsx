import React from 'react';

interface NumberFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

const NumberField: React.FC<NumberFieldProps> = ({ label, value, onChange }) => (
    <div>
        <label>{label}</label>
        <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
);

export default NumberField;
