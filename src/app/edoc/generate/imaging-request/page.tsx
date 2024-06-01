
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import ImagingRequest from "@/src/components/Edocs/Generate/ImagingRequest";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <ImagingRequest />
        </FormBuilderProvider>
    );
};

export default Home;