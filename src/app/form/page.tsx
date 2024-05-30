
import FormBuilder from '@/src/components/FormBuilder';
import FormBuilderProvider from '@/src/context/FormBuilderContext';
import React from 'react';




const Home: React.FC = () => {
    return (
        <FormBuilderProvider>
            <FormBuilder />
        </FormBuilderProvider>
    );
};

export default Home;