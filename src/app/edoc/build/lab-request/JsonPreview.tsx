"use client"

import { FormBuilderContextType, formBuilderContext } from "@/src/context/FormBuilderContext";
import React, { useContext } from "react";

export default function JsonPreview() {
    const {form} = useContext(formBuilderContext) as FormBuilderContextType
  return (
    <div className="my-10">
        <pre>
            {JSON.stringify(form, null, 2)}
        </pre>
    </div>
  );
}
