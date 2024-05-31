
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Prescription";
import MedicalCertificate from "@/src/components/Edocs/MedicalCertificate";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <MedicalCertificate />
        </FormBuilderProvider>
    );
};

export default Home;