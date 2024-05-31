// components/PdfGenerator.tsx

import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';
const PdfGenerator: React.FC = () => {
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

    const calculatePosition = (index:number) => {
        const baseTop = 428;
        const lineHeight = 27; // Adjust as needed for spacing
        return {
            top: `${baseTop + index * lineHeight}px`,
            left: '125px'
        };
    };

    const calculateOrderPosition = (index) => {
        const baseTop = 428;
        const lineHeight = 27; // Adjust as needed for spacing
        return {
            top: `${baseTop + index * lineHeight}px`,
            left: '105px'
        };
    };

    const data = {
        "title": "Form Title",
        "description": "Form Description",
        "items": [
            {
                "id": 1717141084114,
                "type": "section",
                "label": "New Section",
                "child": [
                    {
                        "id": 1717141540969,
                        "type": "text",
                        "label": "1.",
                        "value": "Paracetamol (Alvedon) 500mg tablet #20 tablets"
                    },
                    {
                        "id": 1717141542208,
                        "type": "text",
                        "label": "2.",
                        "value": "Azithromycin (Zithromax) 500mg tablet #3 tablets"
                    },
                    {
                        "id": 1717141543021,
                        "type": "text",
                        "label": "sig:",
                        "value": "1 tablet once a day for 3 days"
                    },
                    {
                        "id": 1717141543022,
                        "type": "text",
                        "label": "3.",
                        "value": "N-Acetylsysteine (Fluimucil) 600mg tablet #5 tablets"
                    },
                    {
                        "id": 1717141543023,
                        "type": "text",
                        "label": "sig:",
                        "value": "dissolve in 1/2 glass of water, 1 tablet once a day for 5 days"
                    }
                ]
            }
        ]
    };
    return (
        <div>
            <div  style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <div ref={hiddenContentRef}>

                    <div id="page1-div" style={{position: 'relative', width: '918px', height: '1187px'}}>
                        <img width="918" height="1187" src="/target001.png" alt="background image"/>
                        <p style={{position: 'absolute', top: '50px', left: '521px', whiteSpace: 'nowrap'}}
                           className="ft10">
                            <b>Dr.&#160;Philip&#160;Javier&#160;II&#160;Tantano</b>
                        </p>
                        <p style={{position: 'absolute', top: '107px', left: '522px', whiteSpace: 'nowrap'}}
                           className="ft11">
                            License&#160;no:&#160;0130470&#160;
                        </p>
                        <p style={{position: 'absolute', top: '125px', left: '522px', whiteSpace: 'nowrap'}}
                           className="ft11">
                            PTR&#160;no:&#160;4096813
                        </p>
                        <p style={{position: 'absolute', top: '82px', left: '521px', whiteSpace: 'nowrap'}}
                           className="ft12">
                            <b>HIMS&#160;PHYSICIAN</b>
                        </p>
                        <p style={{position: 'absolute', top: '71px', left: '206px', whiteSpace: 'nowrap'}}
                           className="ft11">
                            Address: 9000 C.M. Recto Avenue
                        </p>
                        <p style={{position: 'absolute', top: '88px', left: '206px', whiteSpace: 'nowrap'}}
                           className="ft111">
                            Lapasan, Cagayan de Oro, City
                            <br/>
                            Email Address: hims@ustp.edu.ph
                        </p>
                        <p style={{position: 'absolute', top: '341px', left: '58px', whiteSpace: 'nowrap'}}
                           className="ft13">
                            <b>e-Prescription</b>
                        </p>
                        <p style={{position: 'absolute', top: '1054px', left: '497px', whiteSpace: 'nowrap'}}
                           className="ft14">
                            <b>Dr.&#160;Philip&#160;Javier&#160;II&#160;Tantano</b>
                        </p>
                        <p style={{position: 'absolute', top: '1089px', left: '583px', whiteSpace: 'nowrap'}}
                           className="ft15">
                            <b>HIMS&#160;PHYSICIAN</b>
                        </p>
                        <p style={{position: 'absolute', top: '206px', left: '53px', whiteSpace: 'nowrap'}}
                           className="ft16">
                            <b>Name:&#160;&#160;&#160;</b>Cindy&#160;Rupert&#160;J.&#160;Dayoc
                        </p>
                        <p style={{position: 'absolute', top: '264px', left: '53px', whiteSpace: 'nowrap'}}
                           className="ft16">
                            <b>Address:&#160;</b>Block&#160;15&#160;Lot&#160;2&#160;Woodland&#160;Heights
                        </p>
                        <p style={{position: 'absolute', top: '288px', left: '53px', whiteSpace: 'nowrap'}}
                           className="ft17">
                            Macasandig,&#160;Cagayan&#160;de&#160;Oro&#160;city
                        </p>
                        <p style={{position: 'absolute', top: '1111px', left: '544px', whiteSpace: 'nowrap'}}
                           className="ft12">
                            <b>08-August&#160;2023,&#160;8:22&#160;am</b>
                        </p>
                        <p style={{position: 'absolute', top: '234px', left: '53px', whiteSpace: 'nowrap'}}
                           className="ft16">
                            <b>Sex:&#160;</b>Female&#160;&#160;&#160;<b>Age:&#160;</b>29
                        </p>

                        {data.items.map((item, index) => (
                            <div key={item.id} style={{ marginBottom: '20px' }}>
                                {item.type === 'section' && item.child.map((item, index) => (
                                    <>
                                        <p style={{
                                            position: 'absolute',
                                            top: `${428 + (index * 70)}px`,
                                            left: '125px',
                                            whiteSpace: 'nowrap'
                                        }}
                                           className="ft18">
                                            <b>{item.value}</b>
                                        </p>
                                        <p style={{
                                            position: 'absolute',
                                            top: `${428 + (index * 70)}px`,
                                            left: '105px',
                                            whiteSpace: 'nowrap'
                                        }}
                                           className="ft19">
                                            {index + 1}.
                                        </p>
                                        <p style={{
                                            position: 'absolute',
                                            top: '457px',
                                            left: '151px',
                                            whiteSpace: 'nowrap'
                                        }}
                                           className="ft18">
                                            <b>sig:&#160;</b>1&#160;tablet&#160;every&#160;4&#160;hours&#160;for&#160;fever&#160;&gt;&#160;37.8
                                        </p>
                                    </>
                                ))}
                            </div>
                        ))}



                        <p style={{
                            fontSize: "12px",
                            position: 'absolute',
                            top: '1147px',
                            left: '38px',
                            whiteSpace: 'wrap'
                        }} className="ft110">
                            <b>This&#160;prescription&#160;is&#160;auto-generated&#160;by&#160;the&#160;system.&#160;Any&#160;information&#160;changed&#160;manually&#160;or&#160;electronically,&#160;prescriber&#160;or&#160;creator&#160;will&#160;not&#160;be&#160;liable.</b>
                        </p>
                    </div>
                </div>
            </div>

            <button onClick={generatePDF}>Generate PDF</button>
        </div>
    );
};

export default PdfGenerator;
