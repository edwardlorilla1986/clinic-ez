
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Generate/Prescription";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <Prescription />
        </FormBuilderProvider>
    );
};

export default Home;