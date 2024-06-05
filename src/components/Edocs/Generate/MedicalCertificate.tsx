'use client';

import React, {useContext, useEffect, useRef} from 'react';
import { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import { useRouter } from 'next/navigation';
import PdfGenerator from '@/src/components/Generator/LaboratoryRequest';
import RemoveButton from '@/src/components/Button/RemoveButton';

const Home: React.FC = () => {
    const { handleFieldChange, duplicateItems, handleAddField, handleRemoveField, form, dispatch, handleExport, handleImport } = useContext(formBuilderContext) as FormBuilderContextType;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const selectedBuild = localStorage.getItem('selectedBuild');
        if (selectedBuild) {
            dispatch({ type: 'setForm', payload: JSON.parse(selectedBuild) });
            localStorage.removeItem('selectedBuild');
        }
    }, [dispatch]);
    const goToEdoc = () => {
        router.push('/edoc');
    };

    const handleAddMedicine = () => {
        const duplicatedItems = duplicateItems(form.items);
        dispatch({ type: 'setForm', payload: { ...form, items: [...form.items, ...duplicatedItems] } });
    };

    const handleSubmit = () => {
        const savedGenerates = localStorage.getItem('generates');
        const generates = savedGenerates ? JSON.parse(savedGenerates) : [];
        generates.push({...form, key: 'laboratory-request'});
        localStorage.setItem('generates', JSON.stringify(generates));
        alert('Form saved!');
    };

    if (!form) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    const renderOptionsInRows = (options: { id: string, label: string }[]) => {
        const rows = [];
        for (let i = 0; i < options.length; i += 8) {
            rows.push(options.slice(i, i + 8));
        }
        return rows;
    };

    return (
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Generate Medical Certificate for Patient A</h1>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={goToEdoc}>
                    Back
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={form?.title}
                    onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                    placeholder="Certificate Title"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="mb-6">
                <textarea
                    value={form?.description}
                    onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                    placeholder="Certificate Description"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end space-x-2 mb-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleAddMedicine}>
                    Add Medicine
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={handleExport}>
                    Export Certificate
                </button>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={() => fileInputRef.current?.click()}>
                    Import Certificate
                </button>
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImport}
                />
            </div>

            {form?.items.length > 0 && <PdfGenerator data={form} />}

            <div >
                {form?.items.map((item, index) => (
                    <div key={item.id} className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow my-3 ">
                        <div className="masonry-grid " style={{ columnCount: 2, columnGap: '1rem' }}>
                            {item?.type === 'section' && item?.child?.map((supItem, supIndex) => (
                                supItem.type === 'multiple-choice' && (
                                    <div key={supItem.id} className="break-inside-avoid flex flex-col mb-2">
                                        <label className="section-title text-sm font-semibold text-gray-700 ml-1">{supItem.label}</label>
                                        {renderOptionsInRows(supItem.options).map((row, rowIndex) => (
                                            <div key={rowIndex} className="flex flex-wrap">
                                                {row.map((option: { id: string, label: string }) => (
                                                    <label key={option.id} className="flex items-center mb-2 w-1/2">
                                                        <span className="custom-radio">
                                                            <input
                                                                type="radio"
                                                                name={supItem.key}
                                                                checked={supItem.value === option.id}
                                                                onChange={() => handleFieldChange(supIndex, {
                                                                    ...supItem,
                                                                    value: option.id
                                                                }, index)}
                                                            />
                                                            <span></span>
                                                        </span>
                                                        {option.label}
                                                    </label>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <RemoveButton key={`remove-${item.id}`} onClick={() => handleRemoveField(index)} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end mt-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={handleSubmit}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Home;
