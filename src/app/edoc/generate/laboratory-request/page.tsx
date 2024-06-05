
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import MedicalCertificate from "@/src/components/Edocs/Generate/LaboratoryRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <MedicalCertificate />
        </FormBuilderProvider>
    );
};

export default Home;