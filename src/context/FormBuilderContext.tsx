"use client";

import React, { useEffect } from "react";
import { FormAction, useFormBuilder } from "../hooks/useFormBuilder";
import {
    CheckboxField,
    DropdownField,
    FormField,
    FormStructure,
    MultipleChoiceField,
    NumberField,
    Option,
    SectionField,
    TextField,
} from "../types/formField";

interface FormBuilderProps {
    children: React.ReactNode;
}

export type FormBuilderContextType = {
    form: FormStructure;
    dispatch: React.Dispatch<FormAction>;
    handleTitleChange: (title: string) => void;
    handleDescriptionChange: (description: string) => void;
    handleExport: () => void;
    duplicateItems: (items: FormField[]) => FormField[];
    handleImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddField: (type: FormField["type"], sectionIndex?: number) => void;
    handleFieldChange: (
        index: number,
        field: FormField,
        sectionIndex?: number
    ) => void;
    handleLabelChange: (index: number, label: string, sectionIndex?: number) => void;
    handleRemoveField: (index: number, sectionIndex?: number) => void;
    handleOptionsChange: (index: number, options: Option[], sectionIndex?: number) => void;
    handleAddOption: (index: number, option: Option, sectionIndex?: number) => void;
    handleRemoveOption: (index: number, optionId: Option["id"], sectionIndex?: number) => void;
    addTextField: (textField: TextField, sectionIndex?: number) => void;
    addNumberField: (numberField: NumberField, sectionIndex?: number) => void;
    addCheckboxField: (checkboxField: CheckboxField, sectionIndex?: number) => void;
    addMultipleChoiceField: (
        multipleChoiceField: MultipleChoiceField,
        sectionIndex?: number
    ) => void;
    addDropdownField: (dropdownField: DropdownField, sectionIndex?: number) => void;
    addSectionField: (sectionField: SectionField, sectionIndex?: number) => void;
    renderOptionsInRows: (options: { id: string; label: string }[]) => { id: string; label: string }[][];
};

export const formBuilderContext = React.createContext<FormBuilderContextType | null>(
    null
);

export default function FormBuilderProvider({ children }: FormBuilderProps) {
    const [form, dispatch] = useFormBuilder();

    useEffect(() => {
        localStorage.setItem("form", JSON.stringify(form));
    }, [form]);

    const handleTitleChange = (title: string) => {
        dispatch({
            type: "setTitle",
            payload: title,
        });
    };

    const duplicateItems = (items: FormField[]): FormField[] => {
        return items.map((item) => {
            const newItem = {
                child: undefined,
                ...item,
                id: Date.now() + Math.random(),
            };
            if (item.type === "section" && item.child) {
                newItem.child = duplicateItems(item.child);
            }
            return newItem;
        });
    };

    const handleDescriptionChange = (description: string) => {
        dispatch({
            type: "setDescription",
            payload: description,
        });
    };

    const handleExport = () => {
        const dataStr = JSON.stringify(form, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "form.json";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                const importedForm = JSON.parse(result);
                dispatch({
                    type: "setForm",
                    payload: importedForm,
                });
            };
            reader.readAsText(file);
        }
    };

    const textField: TextField = {
        id: Date.now(),
        key: "",
        type: "text",
        label: "New Text Field",
        value: "",
    };

    const numberField: NumberField = {
        id: Date.now(),
        key: "",
        type: "number",
        label: "New Number Field",
        value: 0,
    };

    const checkboxField: CheckboxField = {
        id: Date.now(),
        key: "",
        type: "checkbox",
        label: "New Checkbox Field",
        value: [],
        options: [
            { id: "1", label: "Option 1" },
            { id: "2", label: "Option 2" },
        ],
    };

    const multipleChoiceField: MultipleChoiceField = {
        id: Date.now(),
        key: "",
        type: "multiple-choice",
        label: "New Multiple Choice Field",
        value: "",
        options: [
            { id: "1", label: "Option 1" },
            { id: "2", label: "Option 2" },
        ],
    };

    const dropdownField: DropdownField = {
        id: Date.now(),
        key: "",
        type: "dropdown",
        label: "New Dropdown Field",
        value: "",
        options: [
            { id: "1", label: "Option 1" },
            { id: "2", label: "Option 2" },
        ],
    };

    const sectionField: SectionField = {
        id: Date.now(),
        key: "",
        type: "section",
        label: "New Section",
        child: [],
        options: [],
    };

    const handleAddField = (type: FormField["type"], sectionIndex?: number) => {
        dispatch({
            type: "addField",
            payload: {
                field:
                    type === "text"
                        ? textField
                        : type === "number"
                            ? numberField
                            : type === "checkbox"
                                ? checkboxField
                                : type === "multiple-choice"
                                    ? multipleChoiceField
                                    : type === "dropdown"
                                        ? dropdownField
                                        : sectionField,
                sectionIndex,
            },
        });
    };

    const handleFieldChange = (
        index: number,
        field: FormField,
        sectionIndex?: number
    ) => {
        dispatch({
            type: "updateField",
            payload: { index, field, sectionIndex },
        });
    };

    const handleLabelChange = (
        index: number,
        label: string,
        sectionIndex?: number
    ) => {
        dispatch({
            type: "updateField",
            payload: {
                index,
                sectionIndex,
                field: {
                    ...form.items[index],
                    label,
                },
            },
        });
    };

    const handleRemoveField = (index: number, sectionIndex?: number) => {
        dispatch({
            type: "removeField",
            payload: {
                index,
                sectionIndex,
            },
        });
    };

    const handleOptionsChange = (
        index: number,
        options: Option[],
        sectionIndex?: number
    ) => {
        dispatch({
            type: "updateField",
            payload: {
                index,
                sectionIndex,
                field: {
                    ...form.items[index],
                    ...(["checkbox", "dropdown", "multiple-choice", "section"].includes(form.items[index].type)
                        ? { options }
                        : {}),
                },
            },
        });
    };

    const handleAddOption = (
        index: number,
        option: Option,
        sectionIndex?: number
    ) => {
        const item = form.items[index];
        const options = "options" in item ? [...item.options, option] : [option];
        dispatch({
            type: "updateField",
            payload: {
                index,
                sectionIndex,
                field: {
                    ...item,
                    ...(["checkbox", "multiple-choice", "dropdown", "section"].includes(
                        form.items[index].type
                    ) && { options }),
                },
            },
        });
    };

    const handleRemoveOption = (
        index: number,
        optionId: Option["id"],
        sectionIndex?: number
    ) => {
        const item = form.items[index];
        const options = "options" in item
            ? item.options.filter((option) => option.id !== optionId)
            : [];
        dispatch({
            type: "updateField",
            payload: {
                index,
                sectionIndex,
                field: {
                    ...item,
                    ...(["checkbox", "multiple-choice", "dropdown", "section"].includes(
                        form.items[index].type
                    ) && { options }),
                },
            },
        });
    };

    const addTextField = (textField: TextField, sectionIndex?: number) => {
        dispatch({
            type: "addField",
            payload: {
                field: textField,
                sectionIndex,
            },
        });
    };

    const addNumberField = (numberField: NumberField, sectionIndex?: number) => {
        dispatch({
            type: "addField",
            payload: {
                field: numberField,
                sectionIndex,
            },
        });
    };

    const addCheckboxField = (checkboxField: CheckboxField, sectionIndex?: number) => {
        dispatch({
            type: "addField",
            payload: {
                field: checkboxField,
                sectionIndex,
            },
        });
    };

    const addMultipleChoiceField = (
        multipleChoiceField: MultipleChoiceField,
        sectionIndex?: number
    ) => {
        dispatch({
            type: "addField",
            payload: {
                field: multipleChoiceField,
                sectionIndex,
            },
        });
    };

    const addDropdownField = (dropdownField: DropdownField, sectionIndex?: number) => {
        dispatch({
            type: "addField",
            payload: {
                field: dropdownField,
                sectionIndex,
            },
        });
    };

    const addSectionField = (sectionField: SectionField, sectionIndex?: number) => {
        dispatch({
            type: "addField",
            payload: {
                field: sectionField,
                sectionIndex,
            },
        });
    };

    const renderOptionsInRows = (options: { id: string; label: string }[]) => {
        const rows = [];
        for (let i = 0; i < options.length; i += 8) {
            rows.push(options.slice(i, i + 8));
        }
        return rows;
    };

    return (
        <formBuilderContext.Provider
            value={{
                form,
                dispatch,
                handleTitleChange,
                handleDescriptionChange,
                handleExport,
                handleImport,
                duplicateItems,
                handleAddField,
                handleFieldChange,
                handleLabelChange,
                handleRemoveField,
                handleOptionsChange,
                handleAddOption,
                handleRemoveOption,
                addTextField,
                addNumberField,
                addCheckboxField,
                addMultipleChoiceField,
                addDropdownField,
                addSectionField,
                renderOptionsInRows,
            }}
        >
            {children}
        </formBuilderContext.Provider>
    );
}
