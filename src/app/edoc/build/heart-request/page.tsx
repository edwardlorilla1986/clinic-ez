
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Build/Prescription";
import MedicalCertificate from "@/src/components/Edocs/Build/MedicalCertificate";
import ImagingRequest from "@/src/components/Edocs/Build/ImagingRequest";
import HeartRequest from "@/src/components/Edocs/Build/HeartRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <HeartRequest />
        </FormBuilderProvider>
    );
};

export default Home;