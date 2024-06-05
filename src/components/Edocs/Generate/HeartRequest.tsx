'use client';
import React, { useEffect, useCallback, useContext } from 'react';
import FormBuilderProvider, { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField } from '@/src/types/formField';
import { useFormBuilder, initialState } from '@/src/hooks/useFormBuilder';
import { Option } from '@/src/types/formField';

interface LocalForm {
    id: number;
    key: string;
    items: FormField[];
}

type handleAddParams = {
    formId: number;
    type: FormField["type"];
    key: string;
};

const Home: React.FC = () => {
    const { handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField, form, dispatch } = useContext(formBuilderContext) as FormBuilderContextType;
    useEffect(() => {
        const selectedBuild = localStorage.getItem('selectedBuild');
        if (selectedBuild) {
            dispatch({ type: 'setForm', payload: JSON.parse(selectedBuild) });
            localStorage.removeItem('selectedBuild');
        }
    }, [dispatch]);
    const handleSubmit = () => {
        const savedGenerates = localStorage.getItem('generates');
        const generates = savedGenerates ? JSON.parse(savedGenerates) : [];
        generates.push({...form, key: 'heart-request'});
        localStorage.setItem('generates', JSON.stringify(generates));
        alert('Form saved!');
    };

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Heart Station Request Builder</h1>
            <input
                type="text"
                value={form?.title}
                onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                placeholder="Form Title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <textarea
                value={form?.description}
                onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                placeholder="Form Description"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 border rounded-lg shadow my-3">

                    {
                        item?.type === 'section' &&
                        item?.child?.map((supItem, supIndex) => {
                            return <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                        })
                    }
                </div>
            ))}

            <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Home;
