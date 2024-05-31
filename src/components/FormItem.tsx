import {FormField, SectionField, Option as OptionType, TextField as TextFieldType, NumberField as NumberFieldType, CheckboxField as CheckboxFieldType, MultipleChoiceField as MultipleChoiceFieldType, DropdownField as DropdownFieldType} from "@/src/types/formField";
import TextField from "@/src/components/TextField";
import RemoveButton from "@/src/components/Button/RemoveButton";
import NumberField from "@/src/components/NumberField";
import CheckboxField from "@/src/components/CheckboxField";
import MultipleChoiceField from "@/src/components/MultipleChoiceField";
import DropdownField from "@/src/components/DropdownField";
import SectionFieldComponent from "@/src/components/SectionFieldComponent";
import React, { useContext } from "react";
import { FormBuilderContextType, formBuilderContext } from "../context/FormBuilderContext";
interface FormItemProps{
    field: FormField
    index: number,
}

function FormItem({field, index}: FormItemProps) {
    const {handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField, addTextField, addNumberField, addCheckboxField, addDropdownField, addMultipleChoiceField} = useContext(formBuilderContext) as FormBuilderContextType
    const {label, type} = field
    let value, options;

    if (type === 'text' || type === 'number') {
        value = field.value;
    } else if (type === 'checkbox' || type === 'multiple-choice' || type === 'dropdown') {
        value = field.value;
        options = field.options;
    }

    const handleAddTextField = (_index: number) => {
        const field: TextFieldType = {
            id: index + 1,
            key: 'text',
            label: 'Text Field',
            type: 'text',
            value: '',
        }
        addTextField(field, _index);
    }

    const handleAddNumberField = (_index: number) => {
        const field: NumberFieldType = {
            id: index + 1,
            key: 'number',
            label: 'Number Field',
            type: 'number',
            value: 0,
        }
        addNumberField(field, _index);
    }

    const handleAddCheckboxField = (_index: number) => {
        const field: CheckboxFieldType = {
            id: index + 1,
            key: 'checkbox',
            label: 'Checkbox Field',
            type: 'checkbox',
            value: [],
            options: [],
        }
        addCheckboxField(field, _index);
    }

    const handleAddMultipleChoiceField = (_index: number) => {
        const field: MultipleChoiceFieldType = {
            id: index + 1,
            key: 'multiple-choice',
            label: 'Multiple Choice Field',
            type: 'multiple-choice',
            value: '',
            options: [],
        }
        addMultipleChoiceField(field, _index);
    }

    const handleAddDropdownField = (_index: number) => {
        const field: DropdownFieldType = {
            id: index + 1,
            key: 'dropdown',
            label: 'Dropdown Field',
            type: 'dropdown',
            value: '',
            options: [],
        }
        addDropdownField(field, _index);
    }

    return (
        <div className="mb-4 p-4 border rounded-lg shadow">
            {type === 'text' && (
                <>
                    <TextField
                        label={label}
                        value={value as string}
                        onChange={(value) => handleFieldChange(index, {...field, value})}
                        onLabelChange={(label) => handleLabelChange(index, label)}
                    />
                </>
            )}
            {type === 'number' && (
                <NumberField
                    label={label}
                    value={value as number}
                    onChange={(value) => handleFieldChange(index, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(index, label)}
                />
            )}
            {type === 'checkbox' && (
                <CheckboxField
                    label={label}
                    options={options ?? []}
                    value={value as OptionType["id"][]}
                    onChange={(value) => handleFieldChange(index, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(index, label)}
                    onOptionsChange={(options) => handleOptionsChange(index, options)}
                />
            )}
            {type === 'multiple-choice' && (
                <MultipleChoiceField
                    label={label}
                    options={options ?? []}
                    value={value as OptionType["id"]}
                    onChange={(value) => handleFieldChange(index, {...field, value,})}
                    onLabelChange={(label) => handleLabelChange(index, label)}
                    onOptionsChange={(options) => handleOptionsChange(index, options)}
                />
            )}
            {type === 'dropdown' && (
                <DropdownField
                    label={label}
                    options={options ?? []}
                    value={value as string}
                    onChange={(value) => handleFieldChange(index, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(index, label)}
                    onOptionsChange={(options) => handleOptionsChange(index, options)}
                />
            )}
            {type === 'section' && (
                <SectionFieldComponent
                    index={index}
                    section={field as SectionField}
                    toolBar={(
                        <div className="flex items-center flex-wrap gap-2">
                        <button
                        className="bg-green-500 text-white py-1 px-3 rounded"
                        onClick={() => handleAddTextField(index)}
                        >
                        Add Text Field
                        </button>
                        <button
                        className="bg-green-500 text-white py-1 px-3 rounded"
                        onClick={() => handleAddNumberField(index)}
                        >
                        Add Number Field
                        </button>
                        <button
                        className="bg-green-500 text-white py-1 px-3 rounded"
                        onClick={() => handleAddCheckboxField(index)}
                        >
                        Add Checkbox Field
                        </button>
                        <button
                        className="bg-green-500 text-white py-1 px-3 rounded"
                        onClick={() => handleAddMultipleChoiceField( index)}
                        >
                        Add Multiple Choice Field
                        </button>
                        <button
                        className="bg-green-500 text-white py-1 px-3 rounded"
                        onClick={() => handleAddDropdownField(index)}
                        >
                        Add Dropdown Field
                        </button>
                    </div>
                    )}
                />
            )}
            <RemoveButton onClick={() => handleRemoveField(index)}/>
        </div>
    );
}
export default FormItem