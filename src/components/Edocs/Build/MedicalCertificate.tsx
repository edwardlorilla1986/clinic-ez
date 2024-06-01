'use client';
import React, { useEffect, useCallback, useContext, useRef, useState } from 'react';
import { formBuilderContext, FormBuilderContextType } from '@/src/context/FormBuilderContext';
import FormItem from '@/src/components/FormItem';
import { FormField } from '@/src/types/formField';
import { initialState } from '@/src/hooks/useFormBuilder';
import { Option } from '@/src/types/formField';
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const { handleFieldChange, handleLabelChange, handleOptionsChange, handleRemoveField, form, dispatch, handleExport, handleImport } = useContext(formBuilderContext) as FormBuilderContextType;
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [checkboxState, setCheckboxState] = useState<{ [key: string]: boolean }>({});

    const handleAddField = useCallback((type: FormField["type"], sectionIndex?: number, key?: string, label?: string, options: Option[] = []) => {
        let field: FormField;
        const id = Date.now();

        switch (type) {
            case 'text':
                field = { id, key: key ?? '', type: 'text', label: label ?? 'New Text Field', value: '' };
                break;
            case 'number':
                field = { id, key: key ?? '', type: 'number', label: label ?? 'New Number Field', value: 0 };
                break;
            case 'checkbox':
                field = { id, key: key ?? '', type: 'checkbox', label: label ?? 'New Checkbox Field', value: [], options: options };
                break;
            case 'multiple-choice':
                field = { id, key: key ?? '', type: 'multiple-choice', label: label ?? 'New Multiple Choice Field', value: '', options: options };
                break;
            case 'dropdown':
                field = { id, key: key ?? '', type: 'dropdown', label: label ?? 'New Dropdown Field', value: '', options: options };
                break;
            case 'section':
                field = { options: [], id, key: key ?? '', type: 'section', label: label ?? 'New Section', child: [] };
                break;
            default:
                throw new Error('Unknown field type');
        }

        dispatch({ type: 'addField', payload: { field, sectionIndex } });
    }, [dispatch]);

    const handleToggleField = useCallback((type: FormField["type"], sectionIndex: number, key: string, label: string, options: Option[], checked: boolean) => {
        setCheckboxState((prevState) => ({ ...prevState, [key]: checked }));
        if (checked) {
            handleAddField(type, sectionIndex, key, label, options);
        } else {
            const section = form.items[sectionIndex];
            if (section && section.type === 'section') {
                const fieldIndex = section.child.findIndex((item: FormField) => item.key === key);
                if (fieldIndex > -1) {
                    handleRemoveField(fieldIndex, sectionIndex);
                }
            }
        }
    }, [form, handleAddField, handleRemoveField]);

    const handleRemoveFieldWithCheckboxUpdate = useCallback((index: number, sectionIndex?: number) => {
        const section = form.items[sectionIndex!];
        if (section && section.type === 'section') {
            const field = section.child[index];
            setCheckboxState((prevState) => ({ ...prevState, [field.key]: false }));
        }
        handleRemoveField(index, sectionIndex);
    }, [form, handleRemoveField]);

    useEffect(() => {
        const savedForm = localStorage.getItem('form');
        dispatch({ type: 'setForm', payload: JSON.parse(savedForm as string) ?? initialState });
        handleAddField('section');
    }, [dispatch, handleAddField]);

    const goToEdoc = () => {
        router.push('/edoc');
    };

    if (!form) {
        return <div className="text-center py-10 text-gray-500">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8 bg-white shadow-xl rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Medical Certificate Builder</h1>
                <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-md" onClick={goToEdoc}>
                    Back
                </button>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={form?.title}
                    onChange={(e) => dispatch({ type: 'setTitle', payload: e.target.value })}
                    placeholder="Form Title"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="mb-6">
                <textarea
                    value={form?.description}
                    onChange={(e) => dispatch({ type: 'setDescription', payload: e.target.value })}
                    placeholder="Form Description"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end space-x-2 mb-6">
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 shadow-md" onClick={handleExport}>
                    Export Form
                </button>
                <input
                    type="file"
                    accept="application/json"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleImport}
                />
            </div>

            {form?.items.map((item, index) => (
                <div key={item.id} className="mb-8 p-6 bg-gray-50 border border-gray-200 rounded-lg shadow my-3">
                    <div className="flex flex-wrap gap-4 mb-6 mt-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['hematology']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'hematology', "Hematology", [
                                    { id: '1', label: 'CBC with Platelet' },
                                    { id: '2', label: 'Blood Typing' },
                                    { id: '3', label: 'ESR' },
                                    { id: '4', label: 'Retic Count' },
                                ], e.target.checked)}
                            />
                            Add Hematology
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['clinical_microscopy']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'clinical_microscopy', "Clinical Microscopy", [
                                    { id: '1', label: 'U/A - Urinalysis' },
                                    { id: '2', label: 'S/E - Fecalysis' },
                                    { id: '3', label: 'Fecal Occult Blood' },
                                    { id: '4', label: 'H. pylori Antigen' },
                                    { id: '5', label: 'Pregnancy Test' },
                                ], e.target.checked)}
                            />
                            Add Clinical Microscopy
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['microbiology']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'microbiology', "Microbiology", [
                                    { id: '1', label: 'Urine GS/CS' },
                                    { id: '2', label: 'Blood GS/CS' },
                                    { id: '3', label: 'Sputum AFB' },
                                    { id: '4', label: 'Sputum GeneXpert' },
                                ], e.target.checked)}
                            />
                            Add Microbiology
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['covid_test']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'covid_test', "COVID-19 Test", [
                                    { id: '1', label: 'Rapid Antigen Test' },
                                    { id: '2', label: 'RT-PCR Nasopharyngeal Swab' },
                                ], e.target.checked)}
                            />
                            Add COVID-19 Test
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['cardiac_markers']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'cardiac_markers', "Cardiac Markers", [
                                    { id: '1', label: 'CK-MB' },
                                    { id: '2', label: 'HS TROP I' },
                                    { id: '3', label: 'PRO - BNP' },
                                    { id: '4', label: 'TROP T (QUANTI)' },
                                    { id: '5', label: 'TROP T (QUALI)' },
                                    { id: '6', label: 'D-DIMER' },
                                ], e.target.checked)}
                            />
                            Add Cardiac Markers
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['blood_chemistry']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'blood_chemistry', "Blood Chemistry", [
                                    { id: '1', label: 'FBS Fasting Blood Glucose' },
                                    { id: '2', label: 'RBS Random Blood Glucose' },
                                    { id: '3', label: 'Creatinine' },
                                    { id: '4', label: 'Uric Acid' },
                                    { id: '5', label: 'BUN' },
                                    { id: '6', label: 'Lipid Profile' },
                                    { id: '7', label: 'SGPT / ALT' },
                                    { id: '8', label: 'SGOT / AST' },
                                    { id: '9', label: 'Total Bilirubin' },
                                    { id: '10', label: 'Direct Bilirubin' },
                                    { id: '11', label: 'HbA1c' },
                                    { id: '12', label: 'ABG' },
                                    { id: '13', label: 'Alkaline Phosphatase' },
                                    { id: '14', label: 'Alpha Fetoprotein' },
                                    { id: '15', label: 'Sodium' },
                                    { id: '16', label: 'Potassium' },
                                    { id: '17', label: 'Calcium' },
                                    { id: '18', label: 'Ionized Calcium' },
                                    { id: '19', label: 'Magnesium' },
                                    { id: '20', label: 'Chloride' },
                                    { id: '21', label: 'Amylase' },
                                    { id: '22', label: 'Iron' },
                                    { id: '23', label: 'LDH' },
                                    { id: '24', label: 'Procalcitonin' },
                                    { id: '25', label: 'Total Protein' },
                                    { id: '26', label: 'Albumin' },
                                    { id: '27', label: 'Globulin' },
                                    { id: '28', label: 'A/G Ratio' },
                                ], e.target.checked)}
                            />
                            Add Blood Chemistry
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2"
                                checked={!!checkboxState['serology']}
                                onChange={(e) => handleToggleField('multiple-choice', index, 'serology', "Serology and Immunology", [
                                    { id: '1', label: 'ASO Titer' },
                                    { id: '2', label: 'CRP' },
                                    { id: '3', label: 'Tubex' },
                                    { id: '4', label: 'Typhidot' },
                                    { id: '5', label: 'Ferritin' },
                                    { id: '6', label: 'Dengue NS1 Ag' },
                                    { id: '7', label: 'Dengue NS1 IgG/IgM' },
                                    { id: '8', label: 'Anti HCV' },
                                    { id: '9', label: 'Anti HBS' },
                                    { id: '10', label: 'Anti HAV IgG' },
                                    { id: '11', label: 'Anti HAV IgM' },
                                    { id: '12', label: 'HBsAg Screening' },
                                    { id: '13', label: 'Anti HCV Screening' },
                                    { id: '14', label: 'CA 125' },
                                    { id: '15', label: 'CA 15 - 3' },
                                    { id: '16', label: 'CA 19 - 9' },
                                    { id: '17', label: 'Total PSA' },
                                    { id: '18', label: 'Free PSA' },
                                    { id: '19', label: 'Beta HCG' },
                                    { id: '20', label: 'Prolactin' },
                                    { id: '21', label: 'Procalcitonin' },
                                    { id: '22', label: 'TSH' },
                                    { id: '23', label: 'FT3' },
                                    { id: '24', label: 'FT4' },
                                    { id: '25', label: 'HIV Screening' },
                                    { id: '26', label: 'HIV (EIA)' },
                                ], e.target.checked)}
                            />
                            Add Serology and Immunology
                        </label>
                    </div>
                    {item?.type === 'section' && item?.child?.map((supItem, supIndex) => (
                        <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Home;
