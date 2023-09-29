'use client';

import Sidebar from "@/components/Sidebar";
import React, {useEffect, useState} from "react";
import getCookie from "@/scripts/getCookie";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";

const AddToHmu = () => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const [typesAsOptions, setTypesAsOptions] = useState(<div></div>);

    useEffect(() => {
        fetchHardwareTypes(document.cookie).then(
            (hardwareTypes) => {
                let content = [];

                for (const hardwareType of hardwareTypes) {
                    content.push(<option value={hardwareType.name} className="capitalize">{hardwareType.name}</option>);
                }

                setTypesAsOptions(<select name="type" id="type" className="capitalize h-10 border mt-1 rounded px-4 w-full bg-gray-50">{content}</select>);
            }
        ).catch(console.error);
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let type = (document.getElementById("type") as HTMLInputElement).value;
        let buyDate = new Date((document.getElementById("buy_date") as HTMLInputElement).value);
        let serialNumber = (document.getElementById("serial_number") as HTMLInputElement).value;
        let manufacturer = (document.getElementById("manufacturer") as HTMLInputElement).value;
        let model = (document.getElementById("model") as HTMLInputElement).value;
        let endOfWarrantyDate = new Date((document.getElementById("end_of_warranty_date") as HTMLInputElement).value) ?? "";
        let note = (document.getElementById("note") as HTMLInputElement).value ?? "";

        const details = {type, buyDate, serialNumber, manufacturer, model, endOfWarrantyDate, note};
        //@ts-ignore
        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

        try {
            const response = await fetch(PUBLIC_BACKEND_URL + "/hmu", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'Authorization': getCookie("token", document.cookie)
                },
                body: formBody,
            });

            if (response.ok) {
                document.location = "/hmu";
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="min-h-screen p-6 flex items-center justify-center">
                <div className="container max-w-screen-lg mx-auto">
                    <div>
                        <div className="bg-theme-lightgrey bg-opacity-20 rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                                <div className="text-gray-600">
                                    <p className="font-medium text-lg">Édition de matériel</p>
                                </div>

                                <form className="lg:col-span-2" onSubmit={handleSubmit}>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="type">Type</label>
                                            {typesAsOptions}
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="end_of_warranty_date">Date de fin de garantie</label>
                                            <input type="date" name="end_of_warranty_date" id="end_of_warranty_date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="buy_date">Date d&apos;achat</label>
                                            <input type="date" name="buy_date" id="buy_date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="manufacturer">Fabricant</label>
                                            <input type="text" name="manufacturer" id="manufacturer" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="model">Modèle</label>
                                            <input type="text" name="model" id="model" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="serial_number">Numéro de Série</label>
                                            <input type="text" name="serial_number" id="serial_number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="note">Note</label>
                                            <textarea name="note" id="note" className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" />
                                        </div>

                                        <div className="md:col-span-5">
                                            <input type="submit" name="submit" id="submit" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddToHmu;