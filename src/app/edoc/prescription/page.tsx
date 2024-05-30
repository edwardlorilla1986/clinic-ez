'use client';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FormField } from '@/src/types/formField';
import FormItem from '@/src/components/FormItem';
import {AppDispatch, RootState} from '@/src/store';
import {type} from "node:os";
import { useFormBuilder } from '@/src/hooks/useFormBuilder';

interface LocalForm {
    id: number;
    key: string,
    items: FormField[];
}

const Home: React.FC = () => {

    const { form, cleanUp, updateTitle, updateDescription, addField,createForm, removeField, updateField} = useFormBuilder()

    type handleAddParams = {
        formId: number;
        type: FormField["type"];
        key: string;
    }
    console.log(form?.items);
    
    const handleAddBrandNameField = (payload:handleAddParams, sectionIndex?: number) => {
        addField({
                id: 1,
                key: payload.key,
                type: "text", 
                label: "Brand Name",
                value: "",
            },
            sectionIndex
        );
        
    }

    const handleAddGenericNameField = (payload:handleAddParams) => {
            
    }

    const handleAddQuantityField = (payload:handleAddParams) => {
        
    }

    const handleAddIntervalField = (payload:handleAddParams) => {
        
    }

    useEffect(() => {
        createForm();
        addField({id: 1, key: "section", type: "section", label: "Section", value: "", child: []});
        return cleanUp
    }, []);

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Prescription Builder</h1>
            <input
                type="text"
                value={form?.title}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Form Title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
                value={form?.description}
                onChange={(e) => updateDescription( e.target.value)}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />


            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 border rounded-lg shadow  my-3">

                    <div className="flex space-x-4 mb-6 mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddBrandNameField({formId: item.id, type:'text', key:"brand_name"}, index)}>
                            Add Brand Name
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddGenericNameField({formId: item.id, type:'text', key:"generic_name"})}>
                            Add Generic Name
                        </button>

                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddQuantityField({formId: item.id, type:'text', key:"quantity"})}>
                            Add Quantity
                        </button>

                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddIntervalField({formId: item.id, type:'text', key:"interval"})}>
                            Add Interval
                        </button>
                    </div>
                    {
                        item?.type === 'section' && 
                        item?.child?.map((supItem, index) => (
                                <FormItem key={index} index={index} field={supItem} formId={form.id}/>
                            )
                        )
                    }
                </div>
            ))}
        </div>
    );
};

export default Home;
