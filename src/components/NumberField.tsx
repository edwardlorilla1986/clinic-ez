import React, { useState } from 'react';

interface NumberFieldProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    onLabelChange: (label: string) => void;  // New prop for updating label
}

const NumberField: React.FC<NumberFieldProps> = ({ label, value, onChange, onLabelChange }) => {
    const [isEditingLabel, setIsEditingLabel] = useState(false);
    const [newLabel, setNewLabel] = useState(label);

    const handleLabelChange = () => {
        onLabelChange(newLabel);
        setIsEditingLabel(false);
    };

    return (
        <div>
            {isEditingLabel ? (
                <div>
                    <input
                        type="text"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                    />
                    <button onClick={handleLabelChange}>Save</button>
                </div>
            ) : (
                <label onDoubleClick={() => setIsEditingLabel(true)}>{label}</label>
            )}
            <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} />
        </div>
    );
};

export default NumberField;
