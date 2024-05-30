'use client';
    import React, { useEffect, useState, useCallback } from 'react';
import { FormField } from '@/src/types/formField';
import FormItem from '@/src/components/FormItem';
import { useFormBuilder } from '@/src/hooks/useFormBuilder';

interface LocalForm {
    id: number;
    key: string;
    items: FormField[];
}

const Home: React.FC = () => {

    const { form,  addField, createForm, cleanUp } = useFormBuilder();




    type handleAddParams = {
        formId: number;
        type: FormField["type"];
        key: string;
    }

    const handleAddBrandNameField = useCallback((payload: handleAddParams, sectionIndex?: number) => {

        addField({
                id: Date.now(),
                key: payload.key,
                type: "text",
                label: "Brand Name",
                value: "",
            },
            sectionIndex
        );
    }, []);

    const handleAddGenericNameField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        addField({
                id: Date.now(),
                key: payload.key,
                type: "text",
                label: "Generic Name",
                value: "",
            },
            sectionIndex
        );
    }, []);

    const handleAddQuantityField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        addField({
                id: Date.now(),
                key: payload.key,
                type: "number",
                label: "Quality",
                value: 0
            },
            sectionIndex
        );
    }, []);
const handleAddIntervalField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        addField({
                id: Date.now(),
                key: payload.key,
                type: "number",
                label: "Quality",
                value: 0
            },
            sectionIndex
        );
    }, []);



    useEffect(() => {
        createForm();
        addField({ id: Date.now(), key: "section", type: "section", label: "Section", value: "", child: [] });
        return cleanUp;
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
                onChange={(e) => updateDescription(e.target.value)}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {JSON.stringify(form)}

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 border rounded-lg shadow my-3">

                    <div className="flex space-x-4 mb-6 mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddBrandNameField({ formId: item.id, type: 'text', key: "brand_name" }, index)}>
                            Add Brand Name
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddGenericNameField({ formId: item.id, type: 'text', key: "generic_name" }, index)}>
                            Add Generic Name
                        </button>

                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddQuantityField({ formId: item.id, type: 'number', key: "quantity" }, index)}>
                            Add Quantity
                        </button>
 <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddIntervalField({ formId: item.id, type: 'number', key: "quantity" }, index)}>
                            Add Interval
                        </button>


                    </div>
                    {
                        item?.type === 'section' &&
                        item?.child?.map((supItem, index) => {
                                return <FormItem key={index} index={index} field={supItem}  />
                            }
                        )
                    }
                </div>
            ))}
        </div>
    );
};

export default Home;