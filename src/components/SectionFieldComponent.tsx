import React, { useContext, useState } from "react";
import { SectionField } from "../types/formField";
import TextField from "./TextField";
import NumberField from "./NumberField";
import CheckboxField from "./CheckboxField";
import MultipleChoiceField from "./MultipleChoiceField";
import DropdownField from "./DropdownField";
import { FormBuilderContextType, formBuilderContext } from "../context/FormBuilderContext";

interface SectionFieldComponentProps {
  index: number;
  section: SectionField;
}

const SectionFieldComponent: React.FC<SectionFieldComponentProps> = ({
  index,
  section,
}) => {
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [newLabel, setNewLabel] = useState(section.label);
  const { handleLabelChange:handleSectionLabelChange, handleAddField, handleFieldChange, handleRemoveField } = useContext(formBuilderContext) as FormBuilderContextType

  const handleLabelChange = () => {
    handleSectionLabelChange(index, newLabel);
    setIsEditingLabel(false);
  };

  return (
    <fieldset className="mb-4 p-4 border rounded-lg shadow">
      {isEditingLabel ? (
        <div className="flex items-center">
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            className="ml-2 bg-blue-500 text-white py-1 px-3 rounded"
            onClick={handleLabelChange}
          >
            Save
          </button>
        </div>
      ) : (
        <h2
          className="text-xl font-bold mb-4"
          onDoubleClick={() => setIsEditingLabel(true)}
        >
          {section.label}
        </h2>
      )}
      <div className="flex space-x-2 mb-4">
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => handleAddField("text", index)}
        >
          Add Text Field
        </button>
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => handleAddField("number", index)}
        >
          Add Number Field
        </button>
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => handleAddField("checkbox", index)}
        >
          Add Checkbox Field
        </button>
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => handleAddField("multiple-choice", index)}
        >
          Add Multiple Choice Field
        </button>
        <button
          className="bg-green-500 text-white py-1 px-3 rounded"
          onClick={() => handleAddField("dropdown", index)}
        >
          Add Dropdown Field
        </button>
      </div>
      {section.child.map((subField, subIndex) => (
        <div
          key={subIndex}
          className="mb-2 p-2 border rounded"
        >
          {subField.type === "text" && (
            <TextField
              label={subField.label}
              value={subField.value}
              onChange={(value) =>
                handleFieldChange(index, { ...subField, value }, subIndex)
              }
              onLabelChange={(label) =>
                handleFieldChange(index, { ...subField, label }, subIndex)
              }
            />
          )}
          {subField.type === "number" && (
            <NumberField
              label={subField.label}
              value={subField.value}
              onChange={(value) =>
                handleFieldChange(index, { ...subField, value }, subIndex)
              }
              onLabelChange={(label) =>
                handleFieldChange(index, { ...subField, label }, subIndex)
              }
            />
          )}
          {subField.type === "checkbox" && (
            <CheckboxField
              label={subField.label}
              options={subField?.options ?? []}
              value={subField.value}
              onChange={(value) =>
                handleFieldChange(index, { ...subField, value }, subIndex)
              }
              onLabelChange={(label) =>
                handleFieldChange(index, { ...subField, label }, subIndex)
              }
              onOptionsChange={(options) =>
                handleFieldChange(index, { ...subField, options }, subIndex)
              }
            />
          )}
          {subField.type === "multiple-choice" && (
            <MultipleChoiceField
              label={subField.label}
              options={subField.options}
              value={subField.value}
              onChange={(value) =>
                handleFieldChange(index, { ...subField, value }, subIndex)
              }
              onLabelChange={(label) =>
                handleFieldChange(index, { ...subField, label }, subIndex)
              }
              onOptionsChange={(options) =>
                handleFieldChange(index, { ...subField, options }, subIndex)
              }
            />
          )}
          {subField.type === "dropdown" && (
            <DropdownField
              label={subField.label}
              options={subField?.options ?? []}
              value={subField.value}
              onChange={(value) =>
                handleFieldChange(index, { ...subField, value }, subIndex)
              }
              onLabelChange={(label) =>
                handleFieldChange(index, { ...subField, label }, subIndex)
              }
              onOptionsChange={(options) =>
                handleFieldChange(index, { ...subField, options }, subIndex)
              }
            />
          )}
          <button
            className="bg-red-500 text-white py-1 px-3 mt-2 rounded"
            onClick={() => handleRemoveField(index, subIndex)}
          >
            Remove Sub-Item
          </button>
        </div>
      ))}
      
    </fieldset>
  );
};

export default SectionFieldComponent;
