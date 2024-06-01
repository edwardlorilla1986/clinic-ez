import React, { useRef } from 'react';
import jsPDF from 'jspdf';
// @ts-ignore
import domtoimage from 'dom-to-image';
import { FormStructure } from "@/src/types/formField";
import { Option } from '@/src/types/formField';
interface ChildItem {
    id: number;
    type: string;
    label?: string;
    key?: string;
    value: string;
    options?: Option[];
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
const PdfGenerator: React.FC<FormPDFGeneratorProps> = ({ data }) => {
    const hiddenContentRef = useRef<HTMLDivElement>(null);

    const generatePDF = () => {
        const input = hiddenContentRef.current;

        if (input) {
            domtoimage.toPng(input)
                .then((imgData: string) => {
                    const pdf = new jsPDF({
                        orientation: 'portrait',
                        unit: 'px',
                        format: [918, 1187]
                    });
                    pdf.addImage(imgData, 'PNG', 0, 0, 918, 1187);
                    pdf.save('e-prescription.pdf');
                })
                .catch((error: string) => {
                    console.error('Error generating image for PDF:', error);
                });
        }
    };

    return (
        <>
            <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
                <div ref={hiddenContentRef}>
                    <div id="page3-div" style={{position: 'relative', width: '918px', height: '1187px'}}>

                        <p style={{position: 'absolute', top: '52px', left: '519px', whiteSpace: 'nowrap'}}
                           className="ft30">
                            <b>Dr. Philip Javier II Tantano</b>
                        </p>
                        <p style={{position: 'absolute', top: '109px', left: '521px', whiteSpace: 'nowrap'}}
                           className="ft31">
                            License no: 0130470
                        </p>
                        <p style={{position: 'absolute', top: '127px', left: '521px', whiteSpace: 'nowrap'}}
                           className="ft31">
                            PTR no: 4096813
                        </p>
                        <p style={{position: 'absolute', top: '84px', left: '520px', whiteSpace: 'nowrap'}}
                           className="ft32">
                            <b>HIMS PHYSICIAN</b>
                        </p>
                        <p style={{position: 'absolute', top: '71px', left: '206px', whiteSpace: 'nowrap'}}
                           className="ft31">
                            Address: 9000 C.M. Recto Avenue
                        </p>
                        <p style={{position: 'absolute', top: '88px', left: '206px', whiteSpace: 'nowrap'}}
                           className="ft38">
                            Lapasan, Cagayan de Oro, City<br/>Email Address: hims@ustp.edu.ph
                        </p>
                        <p style={{position: 'absolute', top: '265px', left: '60px', whiteSpace: 'nowrap'}}
                           className="ft33">
                            <b>e-Laboratory Request</b>
                        </p>
                        <p style={{position: 'absolute', top: '187px', left: '61px', whiteSpace: 'nowrap'}}
                           className="ft32">
                            <b>Name: </b>Cindy Rupert J. Dayoc
                        </p>
                        <p style={{position: 'absolute', top: '187px', left: '369px', whiteSpace: 'nowrap'}}
                           className="ft32">
                            <b>Sex: </b>Female <b>Age: </b>29
                        </p>
                        <p style={{position: 'absolute', top: '186px', left: '657px', whiteSpace: 'nowrap'}}
                           className="ft32">
                            <b>ID No: </b>3203519
                        </p>
                        <p style={{position: 'absolute', top: '235px', left: '690px', whiteSpace: 'nowrap'}}
                           className="ft34">
                            Employee
                        </p>
                        <p style={{position: 'absolute', top: '211px', left: '689px', whiteSpace: 'nowrap'}}
                           className="ft34">
                            Student
                        </p>
                        <p style={{position: 'absolute', top: '214px', left: '61px', whiteSpace: 'nowrap'}}
                           className="ft32">
                            <b>Address: </b>Block 15 Lot 2 Woodland
                        </p>
                        <p style={{position: 'absolute', top: '235px', left: '61px', whiteSpace: 'nowrap'}}
                           className="ft34">
                            Heights Macasandig, Cagayan de Oro city
                        </p>

                        {data.items.map((item, index) => {
                            var _item = item as SectionItem
                            const cardiovascular_procedures = _item.child.find(c => c.key == "cardiovascular_procedures")

                            return (
                                <div key={item.id}>

                                    {item.type === 'section' && (
                                        <>
                                            { cardiovascular_procedures ?
                                                <>
                                                    <p  style={{
                                                        position: 'absolute',
                                                        top: '322px',
                                                        backgroundColor: 'rgba(0,188,212,0.38)',
                                                        paddingLeft: '10px',
                                                        paddingRight: '10px',
                                                        left: '75px',
                                                        textTransform: 'uppercase',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                       className="ft35">
                                                        <b>{cardiovascular_procedures.label}</b>
                                                    </p>
                                                    {
                                                        (cardiovascular_procedures?.options ?? []).map((c, cpindex) => {
                                                            return (
                                                                <>

                                                                    <span style={{
                                                                        position: 'absolute',
                                                                        top: `${351 + (cpindex * 24)}px`,
                                                                        left: '70px',
                                                                        whiteSpace: 'nowrap'
                                                                    }}
                                                                          className="custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        checked={cardiovascular_procedures.value.includes(c.id)}
                                                        readOnly={true}
                                                    />
                                                    <span></span>
                                                </span>
                                                                    <p style={{
                                                                        position: 'absolute',
                                                                        top: `${353 + (cpindex * 24)}px`,
                                                                        left: '95px',
                                                                        whiteSpace: 'nowrap'
                                                                    }}
                                                                       className="ft36">
                                                                        {c.label}
                                                                    </p>

                                                                </>
                                                            )
                                                        })
                                                    }

                                                </> : null
                                            }

                                        </>
                                    )}
                                </div>
                            )
                        })}



                        <p style={{position: 'absolute', top: '1146px', left: '51px', whiteSpace: 'nowrap'}}
                           className="ft37">
                            <b>This request is auto-generated by the system. Any information changed manually or
                                electronically, prescriber or creator will not be liable.</b>
                        </p>

                    </div>
                </div>
            </div>

            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={generatePDF}>Generate PDF</button>
        </>
    );
};

export default PdfGenerator;
