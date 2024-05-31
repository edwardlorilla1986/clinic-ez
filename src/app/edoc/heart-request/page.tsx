
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Prescription";
import MedicalCertificate from "@/src/components/Edocs/MedicalCertificate";
import ImagingRequest from "@/src/components/Edocs/ImagingRequest";
import HeartRequest from "@/src/components/Edocs/HeartRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <HeartRequest />
        </FormBuilderProvider>
    );
};

export default Home;