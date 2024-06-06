'use client';
import React, { useState, useEffect, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import {type} from "node:os";

const Edoc = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState('');
    const [selectedButton, setSelectedButton] = useState('');
    const [patientId, setPatientId] = useState<string>("1");
    const [selectedFilterBuild, setSelectedFilterBuild] = useState('');
    const [selectedRadioButton, setSelectedRadioButton] = useState('');
    const [patients, setPatients] = useState([
        {
            label: "John Doe",
            id: 1
        },
        {
            label: "Jane Doe",
            id: 2
        }
    ]);
    let [filterBuilds, setFilterBuilds] = useState<any[]>([]);
    let [selectedBuild, setSelectedBuild] = useState<string>();
    const [builds, setBuilds] = useState<any[]>([]);
    const [generates, setGenerates] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('build');
    const router = useRouter();

    useEffect(() => {
        const savedBuilds = localStorage.getItem('builds');
        const savedGenerates = localStorage.getItem('generates');
        if (savedBuilds) {
            setBuilds(JSON.parse(savedBuilds));
        }
        if (savedGenerates) {
            setGenerates(JSON.parse(savedGenerates));
        }
        setIsLoading(false);
    }, []);

    const handleOpenDialog = (type: string) => {
        setSelectedButton(type);
        setIsDialogOpen(true);
    };

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (selectedRequest) {
            var build = localStorage.getItem('builds')
            if(selectedButton == 'build') {
                router.push(selectedRequest);
            }else{
                router.push(selectedRequest + "&build=" + selectedFilterBuild);
                var _build = (JSON.stringify(JSON.parse(build as string).find((c: any) => {
                    return c.id ==  selectedFilterBuild
                })) )
                localStorage.setItem('selectedBuild', _build);
            }

        }
    };

    const handleDialogClick = (e: MouseEvent<HTMLDivElement>) => {
        if ((e.target as any)?.id === 'dialog') {
            setIsDialogOpen(false);
        }
    };



    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedRadioButton( e.target.value)
        var _filterBuilds = localStorage.getItem('builds')
        if(_filterBuilds){
            setFilterBuilds( JSON.parse(_filterBuilds).filter((c: any) => c.key ==  e.target.value) as any[]);
        }
        if(selectedButton == 'generate'){
            setSelectedRequest(`/edoc/${selectedButton}/` + e.target.value + "?patientId=" + patientId  );
        }else{
            setSelectedRequest(`/edoc/${selectedButton}/` + e.target.value)
        }

    };

    const onFilterBuild = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedFilterBuild(e.target.value)
    }

    const handleView = (item: any) => {
        alert(`Title: ${item.title}\nDescription: ${item.description}`);
    };

    const handleDelete = (index: number, type: string) => {
        if (type === 'build') {
            const updatedBuilds = [...builds];
            updatedBuilds.splice(index, 1);
            setBuilds(updatedBuilds);
            localStorage.setItem('builds', JSON.stringify(updatedBuilds));
        } else if (type === 'generate') {
            const updatedGenerates = [...generates];
            updatedGenerates.splice(index, 1);
            setGenerates(updatedGenerates);
            localStorage.setItem('generates', JSON.stringify(updatedGenerates));
        }
    };

    const handleGenerate = (build: any) => {
        localStorage.setItem('selectedBuild', JSON.stringify(build));
        if (!build.key) {
            return;
        }
        router.push(`edoc/generate/${build.key}`);
    };

    return (
        <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-6">
            <div className="w-full max-w-4xl">


                <div className="space-x-4 mb-8">
                    <button
                        onClick={() => handleOpenDialog('build')}
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Build
                    </button>
                    <button
                        onClick={() => handleOpenDialog('generate')}
                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        Generate
                    </button>
                </div>
                <div className="flex space-x-4 mb-8 border-b">
                    <button
                        className={`px-6 py-2 font-semibold ${activeTab === 'build' ? 'border-b-4 border-blue-500 text-blue-500' : 'text-gray-700'}`}
                        onClick={() => handleTabClick('build')}
                    >
                        Build
                    </button>
                    <button
                        className={`px-6 py-2 font-semibold ${activeTab === 'generate' ? 'border-b-4 border-green-500 text-green-500' : 'text-gray-700'}`}
                        onClick={() => handleTabClick('generate')}
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
                            <h2 className="text-xl font-semibold mb-4">Select Request Type</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {selectedButton == "generate" ?
                                    <select
                                        value={patientId}
                                        onChange={(e) => {
                                            setPatientId(e.target.value)
                                        }}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        {patients.map((option, index) => (
                                            <option key={index} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select> : null
                                }
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value={`heart-request`}
                                        className="mr-2"
                                        onChange={handleRadioChange}
                                    />
                                    Heart Request
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value={`imaging-request`}
                                        className="mr-2"
                                        onChange={handleRadioChange}
                                    />
                                    Imaging Request
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value={`laboratory-request`}
                                        className="mr-2"
                                        onChange={handleRadioChange}
                                    />
                                    Laboratory Request
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="requestType"
                                        value={`prescription`}
                                        className="mr-2"
                                        onChange={handleRadioChange}
                                    />
                                    Prescription
                                </label>

                                { filterBuilds.length > 0 ?
                                    <fieldset className="border border-gray-300 p-4 rounded">
                                        {
                                            filterBuilds.map((c: any, index: number) => {
                                                return (
                                                    <label key={index} className="flex items-center mb-2">
                                                        <input
                                                            type="radio"
                                                            name="selectBuild"
                                                            value={c.id}
                                                            className="mr-2"
                                                            onChange={onFilterBuild}
                                                        />
                                                        {c.title}
                                                    </label>
                                                )
                                            })
                                        }
                                    </fieldset> : selectedButton == "generate" ?  <fieldset className="border border-gray-300 p-4 rounded">
                                        No build yet!
                                    </fieldset> : null


                                }


                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="container mx-auto p-4">
                    {activeTab === 'build' && (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">List of Builds</h2>
                            {isLoading ? (
                                <p className="text-gray-700">Loading builds...</p>
                            ) : builds.length === 0 ? (
                                <p className="text-gray-700">No builds found.</p>
                            ) : (
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b font-medium text-left">Title</th>
                                        <th className="py-2 px-4 border-b font-medium text-left">Description</th>
                                        <th className="py-2 px-4 border-b font-medium text-left">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {builds.map((build, index) => (
                                        <tr key={index} className="hover:bg-gray-100 transition duration-150">
                                            <td className="py-2 px-4 border-b">{build.title}</td>
                                            <td className="py-2 px-4 border-b">{build.description}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                                                    onClick={() => handleView(build)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
                                                    onClick={() => handleDelete(index, 'build')}
                                                >
                                                    Delete
                                                </button>
                                                <button
                                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                                    onClick={() => handleGenerate(build)}
                                                >
                                                    Generate
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}

                    {activeTab === 'generate' && (
                        <>
                            <h2 className="text-2xl font-semibold mb-4">List of Generates</h2>
                            {isLoading ? (
                                <p className="text-gray-700">Loading generates...</p>
                            ) : generates.length === 0 ? (
                                <p className="text-gray-700">No generates found.</p>
                            ) : (
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                    <tr>
                                        <th className="py-2 px-4 border-b font-medium text-left">Title</th>
                                        <th className="py-2 px-4 border-b font-medium text-left">Description</th>
                                        <th className="py-2 px-4 border-b font-medium text-left">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {generates.map((generate, index) => (
                                        <tr key={index} className="hover:bg-gray-100 transition duration-150">
                                            <td className="py-2 px-4 border-b">{generate.title}</td>
                                            <td className="py-2 px-4 border-b">{generate.description}</td>
                                            <td className="py-2 px-4 border-b">
                                                <button
                                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                                                    onClick={() => handleView(generate)}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                                    onClick={() => handleDelete(index, 'generate')}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Edoc;
