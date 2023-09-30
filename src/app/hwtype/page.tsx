'use client';

import {useEffect, useState} from "react";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";
import HardwareTypeTable from "@/components/HardwareTypeTable";

const HtMu = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState(<></>);

    let content: JSX.Element[] = [];
    useEffect(() => {
        if (isLoaded) return
        setIsLoaded(true);

        fetchHardwareTypes(document.cookie).then(
            (hardwareTypes) => {
                for (const hardwareType of hardwareTypes) {
                    content.push(<HardwareTypeTable hardwareType={hardwareType} />)
                }

                setData(<tbody className="divide-y divide-black">{content}</tbody>);
            }
        )
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
                                        Name
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                        Internal ID
                                    </th>
                                    <th scope="col" className="py-3 px-6 text-center text-xs font-medium tracking-wider text-gray-700 uppercase">
                                        <Link href="/hwtype/new" className="font-bold p-2 rounded-sm border-2 bg-theme-blue bg-opacity-20 border-theme-black text-theme-yellow hover:underline">Add</Link>
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

export default HtMu;