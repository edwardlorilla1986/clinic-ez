
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Build/Prescription";
import MedicalCertificate from "@/src/components/Edocs/Build/LaboratoryRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <MedicalCertificate />
        </FormBuilderProvider>
    );
};

export default Home;