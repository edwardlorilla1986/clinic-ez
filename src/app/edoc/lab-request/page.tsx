import FormBuilderProvider from "@/src/context/FormBuilderContext";
import React from "react";
import JsonPreview from "./JsonPreview";
import LabRequestForm from "./LabRequestForm";

export default function LabRequestPage() {
   const debug = true;
  return (
    <FormBuilderProvider>
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">e-Laboratory Request Builder</h1>
            <LabRequestForm/>
            {debug && <JsonPreview />}
        </div>
    </FormBuilderProvider>
  );
}
