"use client";

import FormItem from "@/src/components/FormItem";
import { FormBuilderContextType, formBuilderContext } from "@/src/context/FormBuilderContext";
import { CheckboxField, DropdownField, MultipleChoiceField, NumberField, TextField } from "@/src/types/formField";
import React, { useContext } from "react";

export default function LabRequestForm() {
    
    const {
        form, 
        addSectionField,
        handleTitleChange, 
        handleDescriptionChange, 
        handleExport, 
        handleImport,
        addCheckboxField,
    } = useContext(formBuilderContext) as FormBuilderContextType
    
    const handleAddSection = () => {
        const id = form.items.length + 1
        addSectionField({
            id,
            key: "",
            type: "section",
            label: `New Section ${id}`,
            options: [],
            child: []
        })
    }
    
    return (
        <div>
            <input
                type="text"
                value={form?.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Form Title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
                value={form?.description}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="flex gap-2 my-5">
                <button className="bg-teal-500 text-white py-2 px-4 rounded cursor-pointer leading-tight" 
                    onClick={() => handleAddSection()}>
                    Add Section Field
                </button>
                <button className="bg-teal-500 text-white py-2 px-4 rounded cursor-pointer leading-tight" 
                    onClick={() => addCheckboxField({
                        id: form.items.length + 1,
                        key: 'checkbox',
                        label: `Laboratory Category ${form.items.length + 1}`,
                        type: 'checkbox',
                        value: [],
                        options: [],
                    })}>
                    Add Laboratory Category
                </button>
            </div>
            <div className="flex gap-2 my-5">
                <button className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer leading-tight" onClick={handleExport}>
                    Export JSON
                </button>
                
                <label htmlFor="jsonInput" className="bg-green-500 text-white py-2 px-4 rounded cursor-pointer">
                    Import JSON
                </label>
                <input
                    id="jsonInput"
                    type="file"
                    accept="application/json"
                    className="hidden"
                    onChange={handleImport}
                />
            </div>

            {
                form.items.map((item, index) => {
                    let id = "child" in item ? item.child.length : 1;
                    const handleAddCheckboxField = (_index: number) => {
                        const field: CheckboxField = {
                            id: id,
                            key: 'checkbox',
                            label: `Laboratory Category ${id + 1}`,
                            type: 'checkbox',
                            value: [],
                            options: [],
                        }
                        addCheckboxField(field, _index);
                    }
                    return (
                        <FormItem 
                            key={index} 
                            index={index} 
                            field={item} 
                            sectionToolbar={(
                                <div className="flex items-center flex-wrap gap-2">
                                    
                                    <button
                                    className="bg-teal-500 text-white py-1 px-3 rounded"
                                    onClick={() => handleAddCheckboxField(index)}
                                    >
                                        Add Laboratory Category
                                    </button>
                                </div>
                            )}
                        />
                    )
                })
            }
        </div>
    );
}
