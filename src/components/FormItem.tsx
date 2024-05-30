import {FormField, SectionField, Option as OptionType} from "@/src/types/formField";
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
    const {handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField} = useContext(formBuilderContext) as FormBuilderContextType
    const {label, type} = field
    let value, options;

    if (type === 'text' || type === 'number') {
        value = field.value;
    } else if (type === 'checkbox' || type === 'multiple-choice' || type === 'dropdown') {
        value = field.value;
        options = field.options;
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
                />
            )}
            <RemoveButton onClick={() => handleRemoveField(index)}/>
        </div>
    );
}
export default FormItem