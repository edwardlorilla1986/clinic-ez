'use client';
import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { FormField } from '@/src/types/formField';
import FormItem from '@/src/components/FormItem';
import {AppDispatch, RootState} from '@/src/store';
import {type} from "node:os";

interface LocalForm {
    id: number;
    key: string,
    items: FormField[];
}

const Home: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const [forms, setForms] = useState<LocalForm[]>([
        {
            id: Date.now(),
            items: [

            ],
            key: ''
        }
    ]);
    const form = useSelector((state: RootState) => state.form.form);

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")


    const handleAddField = (formId: number, type: FormField['type'], key: string) => {
        const updatedForms = forms.map((form) => {
            if (form.id === formId) {
                const newField: FormField = {child: [], options: [], type: type as any, label: `New ${type} Field`, value: type === 'number' ? 0 : '' };
                return { ...form, key, items: [...form.items, newField] };
            }
            return form;
        });
        setForms(updatedForms);
    };

    const handleTitleChange = (title: string) => {
        setTitle(title);
    };

    const handleDescriptionChange = (description: string) => {
        setDescription(description);
    };

    const _form = useSelector((state: RootState) => state.form.form);


    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Prescription Builder</h1>
            <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Form Title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
                value={description}
                onChange={(e) => handleDescriptionChange( e.target.value)}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />


            {forms.map((form) => (
                <div key={form.id} className="mb-8 p-6 border rounded-lg shadow  my-3">

                    <div className="flex space-x-4 mb-6 mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddField(form.id, 'text', "brand_name")}>
                            Add Brand Name
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddField(form.id, 'number', "generic_name")}>
                            Add Generic Name
                        </button>

                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddField(form.id, 'number', 'quantity')}>
                            Add Quantity
                        </button>

                        <button className="bg-blue-500 text-white py-2 px-4 rounded"
                                onClick={() => handleAddField(form.id, 'number', 'interval')}>
                            Add Interval
                        </button>
                    </div>
                    {_form.items.map((field, index) => (
                        <FormItem key={index} index={index} field={field} formId={form.id}/>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Home;
