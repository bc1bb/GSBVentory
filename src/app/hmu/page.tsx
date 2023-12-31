'use client';

import {useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import findHardware from "@/scripts/findHardware";
import Sidebar from "@/components/Sidebar";
import findHardwareByType from "@/scripts/findHardwareByType";
import HardwareTable from "@/components/HardwareTable";
import Link from "next/link";

const Hmu = () => {
    const searchParams = useSearchParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(<></>);
    const typeInUrl = searchParams.get('type') as string;

    let content: JSX.Element[] = [];
    useEffect(() => {
        if (isLoaded) return
        setIsLoaded(true);

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

            setData(<tbody className="divide-y divide-black">{content}</tbody>);
        }

        fetchData().catch(console.error);
    });

    return (
        <div className="flex">
            <Sidebar />

            <div className="container p-[5vh]">
                <div className="flex flex-col">
                    <div className="h-[90vh] overflow-y-scroll w-full align-middle">
                        <table className="table-fixed w-full divide-y divide-gray-700">
                            <thead className="bg-theme-lightgrey bg-opacity-20">
                                <tr>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Internal ID
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Buy date
                                    </th>
                                    <th scope="col" className="w-[10rem] py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Manufacturer
                                    </th>
                                    <th scope="col" className="w-[10rem] py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Model
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Serial Number
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-center text-xs font-medium tracking-wider text-gray-700 uppercase">
                                        <Link href="/hmu/new" className="font-bold p-2 rounded-sm border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Add</Link>
                                    </th>
                                </tr>
                            </thead>
                            {data}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hmu;