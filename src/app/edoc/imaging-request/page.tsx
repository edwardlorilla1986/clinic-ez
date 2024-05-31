
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Prescription";
import MedicalCertificate from "@/src/components/Edocs/MedicalCertificate";
import ImagingRequest from "@/src/components/Edocs/ImagingRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <ImagingRequest />
        </FormBuilderProvider>
    );
};

export default Home;