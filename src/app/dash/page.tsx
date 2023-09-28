'use client';

import findHardware from "@/scripts/findHardware";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";
import Sidebar from "@/components/Sidebar";
import {useEffect, useState} from "react";
import findHardwareByType from "@/scripts/findHardwareByType";

export default () => {
    const [laptop, setLaptop] = useState(0);
    const [computers, setComputers] = useState(0);
    const [hardwareTypesLen, setHardwareTypesLen] = useState(0);

    useEffect(() => {
        const absolutelyNotAsync = async () => {
            const laptopsJson = await findHardwareByType(document.cookie, "laptop");
            const computersJson = await findHardware(document.cookie);
            const hardwareTypesJson = await fetchHardwareTypes(document.cookie);

            setLaptop(Object.keys(laptopsJson).length);
            setComputers(Object.keys(computersJson).length);
            setHardwareTypesLen(Object.keys(hardwareTypesJson).length);
        }

        absolutelyNotAsync().catch(console.error);
    }, []);

    return (
        <div className="flex">
            <Sidebar />

            <section className="flex flex-grow">
                <div className="w-1/5 flex-grow"></div>
                <div className="mx-auto max-w-screen-xl w-3/5 px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                            Welcome to GSB Inventory Software
                        </h2>
                    </div>

                    <div className="mt-8 sm:mt-12 border-2 border-theme-darkgrey rounded-md p-5 bg-theme-lightgrey bg-opacity-20 border-opacity-25 hover:shadow-2xl">
                        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    Hardware Types
                                </dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{hardwareTypesLen}</dd>
                            </div>
                            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    Laptops
                                </dt>

                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
                                    {laptop}
                                </dd>
                            </div>

                            <div className="flex flex-col rounded-lg px-4 py-8 text-center">
                                <dt className="order-last text-lg font-medium text-gray-500">
                                    Computers
                                </dt>
                                <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{computers}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="w-1/5 flex-grow"></div>
            </section>
        </div>)
}