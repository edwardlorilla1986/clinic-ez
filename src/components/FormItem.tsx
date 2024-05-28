import {FormField, SectionField} from "@/src/types/formField";
import TextField from "@/src/components/TextField";
import RemoveButon from "@/src/components/Button/RemoveButton";
import NumberField from "@/src/components/NumberField";
import CheckboxField from "@/src/components/CheckboxField";
import MultipleChoiceField from "@/src/components/MultipleChoiceField";
import DropdownField from "@/src/components/DropdownField";
import SectionFieldComponent from "@/src/components/SectionFieldComponent";
import React from "react";
import {removeField, removeSubField, updateField, updateSubField} from "@/src/store/formSlice";
import {AppDispatch, RootState} from "@/src/store";
import {useDispatch, useSelector} from "react-redux";

type Value =  string | number | string[]
type Type = "text" | "number" | "checkbox" | "multiple-choice" | "dropdown" | 'section'
interface FormItemProps{
    label: string;
    value:  Value ;
    type: Type;
    id: number;
    index: number,
    options: string[]
}
function FormItem({index, options, id, label, value, type}: FormItemProps) {
    const formFields = useSelector((state: RootState) => state.form.formFields);
    const dispatch: AppDispatch = useDispatch();
    const handleFieldChange = (index: number, child: FormField) => {
        dispatch(updateField({ index, child }));
    };

    const handleRemoveField = (index: number) => {
        dispatch(removeField(index));
    };

    const handleSubFieldChange = (sectionIndex: number, fieldIndex: number, child: FormField) => {
        dispatch(updateSubField({ sectionIndex, fieldIndex, child }));
    };

    const handleRemoveSubField = (sectionIndex: number, fieldIndex: number) => {
        dispatch(removeSubField({ sectionIndex, fieldIndex }));
    };

    const handleOptionsChange = (index: number, options: string[]) => {
        const field = formFields[index];
        if (field.type === 'multiple-choice' || field.type === 'checkbox' || field.type === 'dropdown') {
            dispatch(updateField({ index, child: { ...field, options } }));
        }
    };

    const handleLabelChange = (index: number, label: string) => {
        const field = formFields[index];
        dispatch(updateField({ index, child: { ...field, label } }));
    };

    const handleSectionLabelChange = (index: number, label: string) => {
        const section = formFields[index] as SectionField;
        dispatch(updateField({ index, child: { ...section, label } }));
    };
    return (
        <div className="mb-4 p-4 border rounded-lg shadow">
            {type === 'text' && (
                <>
                    <TextField
                        label={label}
                        value={value as string}
                        onChange={(value) => handleFieldChange(id, {...field, value})}
                        onLabelChange={(label) => handleLabelChange(id, label)}
                    />
                    <RemoveButon onClick={() => handleRemoveField(id)}/>
                </>
            )}
            {type === 'number' && (
                <NumberField
                    label={label}
                    value={value as number}
                    onChange={(value) => handleFieldChange(id, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(id, label)}
                />
            )}
            {type === 'checkbox' && (
                <CheckboxField
                    label={label}
                    options={options}
                    value={value as string[]}
                    onChange={(value) => handleFieldChange(id, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(id, label)}
                    onOptionsChange={(options) => handleOptionsChange(id, options)}
                />
            )}
            {type === 'multiple-choice' && (
                <MultipleChoiceField
                    label={label}
                    options={options}
                    value={value as string}
                    onChange={(value) => handleFieldChange(id, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(id, label)}
                    onOptionsChange={(options) => handleOptionsChange(id, options)}
                />
            )}
            {type === 'dropdown' && (
                <DropdownField
                    label={label}
                    options={options}
                    value={value as string}
                    onChange={(value) => handleFieldChange(id, {...field, value})}
                    onLabelChange={(label) => handleLabelChange(id, label)}
                    onOptionsChange={(options) => handleOptionsChange(id, options)}
                />
            )}
            {type === 'section' && (
                <SectionFieldComponent
                    index={id}
                    section={field as SectionField}
                    onLabelChange={handleSectionLabelChange}
                    onAddField={handleAddField}
                    onFieldChange={handleSubFieldChange}
                    onRemoveField={handleRemoveSubField}
                    onRemoveSection={handleRemoveField}
                />
            )}
        </div>
    );
}
export default FormItem