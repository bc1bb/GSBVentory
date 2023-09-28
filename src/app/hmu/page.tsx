'use client';

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import findHardware from "@/scripts/findHardware";
import Sidebar from "@/components/Sidebar";
import findHardwareByType from "@/scripts/findHardwareByType";
import HardwareTable from "@/components/HardwareTable";

export default () => {
    const searchParams = useSearchParams();
    const [data, setData] = useState(<div></div>);

    const typeInUrl = searchParams.get('type');

    let content: JSX.Element[] = [];
    useEffect(() => {
        const fetchData = async () => {

            // user wants a specific type
            if (typeInUrl == null) {
                const hardwares = await findHardware(document.cookie);
                for (const hardware of hardwares) {
                    content.push(
                        <HardwareTable hardware={hardware} />
                    )
                }
            } else {
                const hardwares = await findHardwareByType(document.cookie, typeInUrl);
                
                for (const hardware of hardwares) {
                    content.push(
                        <HardwareTable hardware={hardware} />
                    )
                }
            }

            setData(<div>{content}</div>);
        }

        fetchData().catch(console.error);
    });

    return (
        <div className="flex">
            <Sidebar />

            <div className="container p-[5vh]">
                <div className="flex flex-col">
                    <div className="h-[90vh] overflow-y-scroll w-full align-middle">
                        <table className="w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                            <thead className="bg-theme-lightgrey bg-opacity-20">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Identifiant interne
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Date d'achat
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Constructeur
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Modèle
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Numéro de série
                                    </th>
                                    <th scope="col" className="p-4">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y w-full">
                                {data}
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
    )
}