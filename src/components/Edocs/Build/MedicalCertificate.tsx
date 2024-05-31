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

    const handleAddField = (type: FormField["type"], sectionIndex?: number, options: Option[] = [], optionName?: string) => {
        let field: FormField;
        const id = Date.now();

        switch (type) {
            case 'text':
                field = { id, key: '', type: 'text', label: 'New Text Field', value: '' };
                break;
            case 'number':
                field = { id, key: '', type: 'number', label: 'New Number Field', value: 0 };
                break;
            case 'checkbox':
                field = { id, key: '', type: 'checkbox', label: optionName || 'New Checkbox Field', value: [], options: options };
                break;
            case 'multiple-choice':
                field = { id, key: '', type: 'multiple-choice', label: optionName || 'New Multiple Choice Field', value: '', options: options };
                break;
            case 'dropdown':
                field = { id, key: '', type: 'dropdown', label: optionName || 'New Dropdown Field', value: '', options: options };
                break;
            case 'section':
                field = { options: [], id, key: '', type: 'section', label: optionName || 'New Section', child: [] };
                break;
            default:
                throw new Error('Unknown field type');
        }

        dispatch({ type: 'addField', payload: { field, sectionIndex } });
    };

    const handleAddHematologyField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
                { id: '1', label: 'CBC with Platelet' },
                { id: '2', label: 'Blood Typing' },
                { id: '3', label: 'ESR' },
                { id: '4', label: 'Retic Count' },
            ], "HEMATOLOGY");
    }, []);

    const handleAddClinicalMicroscopyField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
                { id: '1', label: 'U/A - Urinalysis' },
                { id: '2', label: 'S/E - Fecalysis' },
                { id: '3', label: 'Fecal Occult Blood' },
                { id: '4', label: 'H. pylori Antigen' },
                { id: '5', label: 'Pregnancy Test' },
            ], "CLINICAL MICROSCOPY");
    }, []);

    const handleAddMicrobiologyField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
                { id: '1', label: 'Urine GS/CS' },
                { id: '2', label: 'Blood GS/CS' },
                { id: '3', label: 'Sputum AFB' },
                { id: '4', label: 'Sputum GeneXpert' },
            ], "MICROBIOLOGY");
    }, []);

    const handleAddCovidTestField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
                { id: '1', label: 'Rapid Antigen Test' },
                { id: '2', label: 'RT-PCR Nasopharyngeal Swab' },
            ], "COVID-19 TEST");
    }, []);

    const handleAddCardiacMarkersField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
                { id: '1', label: 'CK-MB' },
                { id: '2', label: 'HS TROP I' },
                { id: '3', label: 'PRO - BNP' },
                { id: '4', label: 'TROP T (QUANTI)' },
                { id: '5', label: 'TROP T (QUALI)' },
                { id: '6', label: 'D-DIMER' },
            ], "CARDIAC MARKERS");
    }, []);

    const handleAddBloodChemistryField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
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
            ], "BLOOD CHEMISTRY");
    }, []);

    const handleAddSerologyField = useCallback((payload: handleAddParams, sectionIndex?: number) => {
        handleAddField('multiple-choice', sectionIndex,
            [
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
            ], "SEROLOGY AND IMMUNOLOGY");
    }, []);

    useEffect(() => {
        dispatch({ type: 'setForm', payload: initialState });
        handleAddField('section');
    }, []);

    if (!form) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Laboratory Request Builder</h1>
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
                    <div className="flex flex-wrap gap-4 mb-6 mt-4">
                        <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 transition duration-300"
                                onClick={() => handleAddHematologyField({ formId: item.id, type: 'multiple-choice', key: "hematology" }, index)}>
                            Add Hematology
                        </button>
                        <button className="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:bg-green-600 transition duration-300"
                                onClick={() => handleAddClinicalMicroscopyField({ formId: item.id, type: 'multiple-choice', key: "clinical_microscopy" }, index)}>
                            Add Clinical Microscopy
                        </button>
                        <button className="bg-red-500 text-white py-2 px-4 rounded shadow-md hover:bg-red-600 transition duration-300"
                                onClick={() => handleAddMicrobiologyField({ formId: item.id, type: 'multiple-choice', key: "microbiology" }, index)}>
                            Add Microbiology
                        </button>
                        <button className="bg-yellow-500 text-white py-2 px-4 rounded shadow-md hover:bg-yellow-600 transition duration-300"
                                onClick={() => handleAddCovidTestField({ formId: item.id, type: 'multiple-choice', key: "covid_test" }, index)}>
                            Add COVID-19 Test
                        </button>
                        <button className="bg-purple-500 text-white py-2 px-4 rounded shadow-md hover:bg-purple-600 transition duration-300"
                                onClick={() => handleAddCardiacMarkersField({ formId: item.id, type: 'multiple-choice', key: "cardiac_markers" }, index)}>
                            Add Cardiac Markers
                        </button>
                        <button className="bg-teal-500 text-white py-2 px-4 rounded shadow-md hover:bg-teal-600 transition duration-300"
                                onClick={() => handleAddBloodChemistryField({ formId: item.id, type: 'multiple-choice', key: "blood_chemistry" }, index)}>
                            Add Blood Chemistry
                        </button>
                        <button className="bg-pink-500 text-white py-2 px-4 rounded shadow-md hover:bg-pink-600 transition duration-300"
                                onClick={() => handleAddSerologyField({ formId: item.id, type: 'multiple-choice', key: "serology" }, index)}>
                            Add Serology and Immunology
                        </button>
                    </div>
                    {
                        item?.type === 'section' &&
                        item?.child?.map((supItem, supIndex) => {
                            return <FormItem key={supIndex} index={supIndex} field={supItem} sectionIndex={index} />
                        })
                    }
                </div>
            ))}
        </div>
    );
};

export default Home;
