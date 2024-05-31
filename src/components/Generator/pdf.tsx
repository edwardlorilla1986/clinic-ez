import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
import {FormStructure} from "@/src/types/formField";

interface ChildItem {
    id: number;
    type: string;
    label?: string;
    key?: string;
    value: string;
}

interface SectionItem {
    id: number;
    type: string;
    label: string;
    child: ChildItem[];
}

interface FormData {
    title: string;
    description: string;
    items: SectionItem[];
}

interface FormPDFGeneratorProps {
    data: FormStructure;
}

const styles = {
    ft10: {
        fontSize: '23px',
        fontFamily: 'Times',
        color: '#2fbec4',
    },
    ft11: {
        fontSize: '14px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft12: {
        fontSize: '17px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft13: {
        fontSize: '32px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft14: {
        fontSize: '22px',
        fontFamily: 'Times',
        color: '#2fbec4',
    },
    ft15: {
        fontSize: '16px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft16: {
        fontSize: '20px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft17: {
        fontSize: '20px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft18: {
        fontSize: '19px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft19: {
        fontSize: '19px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft110: {
        fontSize: '10px',
        fontFamily: 'Times',
        color: '#000000',
    },
    ft111: {
        fontSize: '14px',
        lineHeight: '22px',
        fontFamily: 'Times',
        color: '#000000',
    },
};

const PdfGenerator: React.FC<FormPDFGeneratorProps> = ({ data }) => {
    const hiddenContentRef = useRef<HTMLDivElement>(null);

    const generatePDF = () => {
        const input = hiddenContentRef.current;

        domtoimage.toPng(input)
            .then((imgData) => {
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: [918, 1187]
                });
                pdf.addImage(imgData, 'PNG', 0, 0, 918, 1187);
                pdf.save('e-prescription.pdf');
            })
            .catch((error) => {
                console.error('Error generating image for PDF:', error);
            });
    };

    return (
        <div>
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <div ref={hiddenContentRef}>
                    <div id="page1-div" style={{ position: 'relative', width: '918px', height: '1187px' }}>
                        <img width="918" height="1187" src="/target001.png" alt="background image" />
                        <p style={{ position: 'absolute', top: '50px', left: '521px', whiteSpace: 'nowrap', ...styles.ft10 }}>
                            <b>Dr.&#160;Philip&#160;Javier&#160;II&#160;Tantano</b>
                        </p>
                        <p style={{ position: 'absolute', top: '107px', left: '522px', whiteSpace: 'nowrap', ...styles.ft11 }}>
                            License&#160;no:&#160;0130470&#160;
                        </p>
                        <p style={{ position: 'absolute', top: '125px', left: '522px', whiteSpace: 'nowrap', ...styles.ft11 }}>
                            PTR&#160;no:&#160;4096813
                        </p>
                        <p style={{ position: 'absolute', top: '82px', left: '521px', whiteSpace: 'nowrap', ...styles.ft12 }}>
                            <b>HIMS&#160;PHYSICIAN</b>
                        </p>
                        <p style={{ position: 'absolute', top: '71px', left: '206px', whiteSpace: 'nowrap', ...styles.ft11 }}>
                            Address: 9000 C.M. Recto Avenue
                        </p>
                        <p style={{ position: 'absolute', top: '88px', left: '206px', whiteSpace: 'nowrap', ...styles.ft111 }}>
                            Lapasan, Cagayan de Oro, City
                            <br />
                            Email Address: hims@ustp.edu.ph
                        </p>
                        <p style={{ position: 'absolute', top: '341px', left: '58px', whiteSpace: 'nowrap', ...styles.ft13 }}>
                            <b>e-Prescription</b>
                        </p>
                        <p style={{ position: 'absolute', top: '1054px', left: '497px', whiteSpace: 'nowrap', ...styles.ft14 }}>
                            <b>Dr.&#160;Philip&#160;Javier&#160;II&#160;Tantano</b>
                        </p>
                        <p style={{ position: 'absolute', top: '1089px', left: '583px', whiteSpace: 'nowrap', ...styles.ft15 }}>
                            <b>HIMS&#160;PHYSICIAN</b>
                        </p>
                        <p style={{ position: 'absolute', top: '206px', left: '53px', whiteSpace: 'nowrap', ...styles.ft16 }}>
                            <b>Name:&#160;&#160;&#160;</b>Cindy&#160;Rupert&#160;J.&#160;Dayoc
                        </p>
                        <p style={{ position: 'absolute', top: '264px', left: '53px', whiteSpace: 'nowrap', ...styles.ft16 }}>
                            <b>Address:&#160;</b>Block&#160;15&#160;Lot&#160;2&#160;Woodland&#160;Heights
                        </p>
                        <p style={{ position: 'absolute', top: '288px', left: '53px', whiteSpace: 'nowrap', ...styles.ft17 }}>
                            Macasandig,&#160;Cagayan&#160;de&#160;Oro&#160;city
                        </p>
                        <p style={{ position: 'absolute', top: '1111px', left: '544px', whiteSpace: 'nowrap', ...styles.ft12 }}>
                            <b>08-August&#160;2023,&#160;8:22&#160;am</b>
                        </p>
                        <p style={{ position: 'absolute', top: '234px', left: '53px', whiteSpace: 'nowrap', ...styles.ft16 }}>
                            <b>Sex:&#160;</b>Female&#160;&#160;&#160;<b>Age:&#160;</b>29
                        </p>

                        {data.items.map((item, index) => {
                            const brandNameValue = item.child.find(c => c.key === "brand_name")?.value;
                            const genericNameValue = item.child.find(c => c.key === "generic_name")?.value;
                            const quantityNameValue = item.child.find(c => c.key === "quantity")?.value;
                            const intervalNameValue = item.child.find(c => c.key === "interval")?.value;
                            const tabletNameValue = item.child.find(c => c.key === "tablet")?.value;
                            const genericName = genericNameValue ? `(${genericNameValue})` : null;
                            const quantityName = quantityNameValue !== undefined ? `#${quantityNameValue} tablet/s` : null;
                            const tabletName = tabletNameValue ? `${tabletNameValue}mg tablet` : null;
                            return (
                                <div key={item.id} style={{ marginBottom: '20px' }}>
                                    {item.type === 'section' && (
                                        <>
                                            <p style={{ position: 'absolute', top: `${428 + (index * 70)}px`, left: '125px', whiteSpace: 'nowrap', ...styles.ft18 }}>
                                                <b>{[brandNameValue, genericName, tabletName, quantityName].join(" ")}</b>
                                            </p>
                                            <p style={{ position: 'absolute', top: `${428 + (index * 70)}px`, left: '105px', whiteSpace: 'nowrap', ...styles.ft19 }}>
                                                {index + 1}.
                                            </p>
                                            <p style={{ position: 'absolute', top: `${457 + (index * 70)}px`, left: '151px', whiteSpace: 'nowrap', ...styles.ft18 }}>
                                                <b>sig:&#160;</b> {intervalNameValue}
                                            </p>
                                        </>
                                    )}
                                </div>
                            )
                        })}

                        <p style={{ position: 'absolute', top: '1147px', left: '38px', whiteSpace: 'wrap', ...styles.ft110 }}>
                            <b>This&#160;prescription&#160;is&#160;auto-generated&#160;by&#160;the&#160;system.&#160;Any&#160;information&#160;changed&#160;manually&#160;or&#160;electronically,&#160;prescriber&#160;or&#160;creator&#160;will&#160;not&#160;be&#160;liable.</b>
                        </p>
                    </div>
                </div>
            </div>

            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default PdfGenerator;