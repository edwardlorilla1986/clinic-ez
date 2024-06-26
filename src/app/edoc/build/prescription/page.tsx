
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';
import Prescription from "@/src/components/Edocs/Build/Prescription";




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <Prescription />
        </FormBuilderProvider>
    );
};

export default Home;