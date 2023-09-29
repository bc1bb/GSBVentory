'use client';

import Sidebar from "@/components/Sidebar";
import React, {useEffect, useState} from "react";
import getCookie from "@/scripts/getCookie";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";
import fetchHardware from "@/scripts/fetchHardware";
import dateHtmlValue from "@/scripts/dateHtmlValue";

const ToBeUpdated = ({params}: {params: { toBeUpdated: string }}) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    let [isLoaded, setIsLoaded] = useState(false);
    const [typesAsOptions, setTypesAsOptions] = useState(<div></div>);
    const newHardware = (params.toBeUpdated == "new");

    const [internalId, setInternalId] = useState("");
    const [type, setType] = useState("");
    const [buyDate, setBuyDate] = useState(new Date());
    const [serialNumber, setSerialNumber] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [endOfWarrantyDate, setEndOfWarrantyDate] = useState(new Date());
    const [note, setNote] = useState("");

    useEffect(() => {
        if (isLoaded) return; setIsLoaded(true);

        // if this is 'old' hardware no need to load hardware types selector, it cannot be edited
        if (newHardware) {
            fetchHardwareTypes(document.cookie).then(
                (hardwareTypes) => {
                    let content: JSX.Element[] = [];

                    for (const hardwareType of hardwareTypes) {
                        content.push(<option value={hardwareType.name} className="capitalize">{hardwareType.name}</option>);
                    }

                    setTypesAsOptions(<select id="type" name="type" className="capitalize h-10 border mt-1 rounded px-4 w-full bg-gray-50">{content}</select>);
                }
            ).catch(console.error);

            // next code is going to load from backend so need to stop here for new hardware
            return;
        }

        // From now on only new hardware
        fetchHardware(document.cookie, params.toBeUpdated).then(
            (hardware) => {
                setTypesAsOptions(<input disabled value={hardware.type} id="type" name="type" className="capitalize h-10 border mt-1 rounded px-4 w-full bg-gray-50"></input>);


                setSerialNumber(hardware.serialNumber);
                setInternalId(hardware.internalId);
                setManufacturer(hardware.manufacturer);
                setModel(hardware.model);
                setNote(hardware.note);

                if (new Date(hardware.buyDate).getFullYear() !== 1970) setBuyDate(new Date(hardware.buyDate));
                if (new Date(hardware.endOfWarrantyDate).getFullYear() !== 1970) setEndOfWarrantyDate(new Date(hardware.endOfWarrantyDate));
            }
        ).catch(console.error);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setType((document.getElementById("type") as HTMLInputElement).value);
        setBuyDate(new Date((document.getElementById("buy_date") as HTMLInputElement).value));
        setSerialNumber((document.getElementById("serial_number") as HTMLInputElement).value);
        setManufacturer((document.getElementById("manufacturer") as HTMLInputElement).value);
        setModel((document.getElementById("model") as HTMLInputElement).value);
        setEndOfWarrantyDate(new Date((document.getElementById("end_of_warranty_date") as HTMLInputElement).value));
        setNote((document.getElementById("note") as HTMLInputElement).value);

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
                                    <p className="font-medium text-lg">Editing hardware</p>
                                    <p className="font-sm text-sm">{internalId}</p>
                                </div>

                                <form className="lg:col-span-2" onSubmit={handleSubmit}>
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="type">Type</label>
                                            {typesAsOptions}
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="end_of_warranty_date">End of warranty</label>
                                            <input type="date" defaultValue={dateHtmlValue(endOfWarrantyDate)} name="end_of_warranty_date" id="end_of_warranty_date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="buy_date">Date of buy</label>
                                            <input type="date" defaultValue={dateHtmlValue(buyDate)} name="buy_date" id="buy_date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="manufacturer">Manufacturer</label>
                                            <input type="text" defaultValue={manufacturer} name="manufacturer" id="manufacturer" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="model">Model</label>
                                            <input type="text" defaultValue={model} name="model" id="model" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="serial_number">Serial Number</label>
                                            <input type="text" defaultValue={serialNumber} name="serial_number" id="serial_number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="note">Note</label>
                                            <textarea name="note" defaultValue={note} id="note" className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" />
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

export default ToBeUpdated;