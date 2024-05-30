"use client";

import FormItem from "@/src/components/FormItem";
import { FormBuilderContextType, formBuilderContext } from "@/src/context/FormBuilderContext";
import React, { useContext } from "react";

export default function LabRequestForm() {
    
    const {form, handleAddField, handleTitleChange, handleDescriptionChange, handleExport, handleImport} = useContext(formBuilderContext) as FormBuilderContextType
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
                onClick={() => handleAddField("section")}>
                Add Section Field
            </button>
            <button className="bg-teal-500 text-white py-2 px-4 rounded cursor-pointer leading-tight" 
                onClick={() => handleAddField("checkbox")}>
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
                return (
                    <FormItem 
                    key={index} 
                    index={index} 
                    field={item} 
                    
                />
                )
            })
        }
    </div>
);
}
