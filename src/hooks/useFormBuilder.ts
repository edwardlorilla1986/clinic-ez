import { addField } from '@/src/store/formSlice';
import React from "react";
import { FormField, SectionField } from "../types/formField";

type FormBuilderFieldTypes = 'text'  | 'checkbox' | 'number' | 'multiple-choice' | 'dropdown' | 'section';
type FormItem = FormField | SectionField;
type FormType = {
    id: number;
    title: string;
    description: string;
    items: FormItem[];
}
const initialForm:FormType = {
    id: Math.floor(Math.random() * 1000),
    title: 'New Form',
    description: 'Create a new form',
    items: []
}

export const useFormBuilder = () => {

    const [form, setForm] = React.useState<FormType>();

    const createForm = () => {
        setForm(initialForm);
    }

    const updateTitle = (title: string) => {
        setForm((prevForm) => {
            return {
                ...prevForm?? initialForm,
                title
            }
        });
    }

    const updateDescription = (description: string) => {
        setForm((prevForm) => {
            return {
                ...prevForm?? initialForm,
                description
            }
        });
    }

    const addField = (field: FormField, sectionIndex?: number) => {
        console.log("addField", {field, sectionIndex});
        
        const newField: FormField = {...field,  child: [], options: [], type: field.type as any, label: `New ${field.type} Field`, value: field.type === 'number'? 0 : '' };

        setForm((prevForm) => {
            const updatedItems = [...prevForm?.items ?? []];
            if (sectionIndex !== undefined) {
                const section = prevForm?.items[sectionIndex] as SectionField;
                console.log({section});
                section?.child?.push(newField);
                updatedItems[sectionIndex] = section;
            } else {
                updatedItems.push(newField);
            }
            return {
                ...prevForm ?? initialForm,
                items: updatedItems
            };
        });
    }


    const updateField = (fieldIndex: number, field: FormField,sectionIndex?: number) => {
        setForm((prevForm) => {
            const updatedItems = [...prevForm?.items ?? []];
            if (sectionIndex !== undefined && fieldIndex!== undefined) {
                const section = prevForm?.items[sectionIndex] as SectionField;
                section.child[fieldIndex] = field;
                updatedItems[sectionIndex] = section;
            } else {
                updatedItems[fieldIndex] = field;
            }
            return {
               ...prevForm?? initialForm,
                items: updatedItems
            };
        }
    )};

    const removeField = (fieldIndex: number, sectionIndex?: number) => {
        setForm((prevForm) => {
            const updatedItems = [...prevForm?.items?? []];
            if (sectionIndex !== undefined && fieldIndex !== undefined) {
                const section = prevForm?.items[sectionIndex] as SectionField;
                section.child.splice(fieldIndex, 1);
                updatedItems[sectionIndex] = section;
                return {
                   ...prevForm?? initialForm,
                    items: updatedItems
                };
            }
            updatedItems.splice(fieldIndex, 1);
            return {
               ...prevForm?? initialForm,
                items: updatedItems
            };
            
        }
    )};

    const cleanUp = () => {
        setForm(undefined);
    }


    return {
        form,
        updateTitle,
        updateDescription, 
        createForm,
        addField,
        updateField,
        removeField,
        cleanUp
    }
    
}