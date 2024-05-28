import React, { useState } from 'react';

interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onLabelChange: (label: string) => void;  // New prop for updating label
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange, onLabelChange }) => {
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
            <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />
        </div>
    );
};

export default TextField;
