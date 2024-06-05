
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Build/Prescription";
import MedicalCertificate from "@/src/components/Edocs/Build/LaboratoryRequest";
import ImagingRequest from "@/src/components/Edocs/Build/ImagingRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <ImagingRequest />
        </FormBuilderProvider>
    );
};

export default Home;