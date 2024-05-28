import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { addField, addSubField, removeField, removeSubField, updateField, updateSubField } from "../store/formSlice";
import { RootState } from "../store";
import { FormField, Option, SectionField } from "../types/formField";

export const useFormBuilder = () => {
    const dispatch = useDispatch();
    const formFields = useSelector((state: RootState) => state.form.formFields);

    const initialOptions: Option[] = [{
        id: 1,
        label: 'Option 1'
    }, {
        id: 2,
        label: 'Option 2'
    }];

    const handleAddField = (type: FormField['type'], sectionIndex?: number) => {
        let newField: FormField;
        switch (type) {
            case 'text':
                newField = { type, label: 'New Text Field', value: '' };
                break;
            case 'number':
                newField = { type, label: 'New Number Field', value: 0  };
                break;
            case 'checkbox':
                newField = { type, label: 'New Checkbox Field', value: [], options: initialOptions };
                break;
            case 'multiple-choice':
                newField = { type, label: 'New Multiple Choice Field', value: 0, options:initialOptions };
                break;
            case 'dropdown':
                newField = { type, label: 'New Dropdown Field', value: 0, options: initialOptions };
                break;
            case 'section':
                newField = { type, label: 'New Section', value: '', child: []  };
                break;
        }
        if (sectionIndex !== undefined) {
            dispatch(addSubField({ sectionIndex, child: newField }));
        } else {
            dispatch(addField(newField));
        }
    };

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

    const handleOptionsChange = (index: number, options: Option[]) => {
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
  return {
    formFields,
    handleAddField,
    handleFieldChange,
    handleRemoveField,
    handleSubFieldChange,
    handleRemoveSubField,
    handleOptionsChange,
    handleLabelChange,
    handleSectionLabelChange,
  }
}
