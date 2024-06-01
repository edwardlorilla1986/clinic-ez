'use client'
import { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

const Edoc = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState('');
    const [selectedButton, setSelectedButton] = useState('generate');
    const router = useRouter();

    const handleBuildClick = () => {
        setSelectedButton('build')
        setIsDialogOpen(true);

    };

    const handleGenerateClick = () => {
        setSelectedButton('generate')
        setIsDialogOpen(true);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedRequest) {
            router.push(selectedRequest);
        }
    };

    const handleDialogClick = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as any)?.id === 'dialog') {
            setIsDialogOpen(false);
        }
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedRequest(e.target.value);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <div className="space-x-4">
                <button
                    value={'build'}
                    onClick={handleBuildClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Build
                </button>
                <button
                    value={'generate'}
                    onClick={handleGenerateClick}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                    Generate
                </button>
            </div>

            {isDialogOpen && (
                <div
                    id="dialog"
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center"
                    onClick={handleDialogClick}
                >
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-xl mb-4">Select Request Type</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="requestType"
                                    value={`/edoc/${selectedButton}/heart-request`}
                                    className="mr-2"
                                    onChange={handleRadioChange}
                                />
                                Heart Request
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="requestType"
                                    value={`/edoc/${selectedButton}/imaging-request`}
                                    className="mr-2"
                                    onChange={handleRadioChange}
                                />
                                Imaging Request
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="requestType"
                                    value={`/edoc/${selectedButton}/laboratory-request`}
                                    className="mr-2"
                                    onChange={handleRadioChange}
                                />
                                Laboratory Request
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="requestType"
                                    value={`/edoc/${selectedButton}/prescription`}

                                    className="mr-2"
                                    onChange={handleRadioChange}
                                />
                                Prescription
                            </label>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Edoc;
