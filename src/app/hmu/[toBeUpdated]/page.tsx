'use client';

import Sidebar from "@/components/Sidebar";
import React, {useEffect, useState} from "react";
import getCookie from "@/scripts/getCookie";
import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";
import fetchHardware from "@/scripts/fetchHardware";
import dateHtmlValue from "@/scripts/dateHtmlValue";
import formatHardwareType from "@/objs/formatHardwareType";

const ToBeUpdated = ({params}: {params: { toBeUpdated: string }}) => {
    const PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    let [isLoaded, setIsLoaded] = useState(false);
    const [typesAsOptions, setTypesAsOptions] = useState(<div></div>);
    const newHardware = (params.toBeUpdated == "new");

    const [internalId, setInternalId] = useState("");
    const [internalIdForm, setInternalIdForm] = useState(<></>);
    const [type, setType] = useState(0);
    const [buyDate, setBuyDate] = useState("");
    const [serialNumber, setSerialNumber] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [model, setModel] = useState("");
    const [endOfWarrantyDate, setEndOfWarrantyDate] = useState("");
    const [note, setNote] = useState("");

    useEffect(() => {
        if (isLoaded) return; setIsLoaded(true);

        // load <options> for <select> only on new hardware, old hardware will have a <input type="text" readOnly={true} ... />
        if (newHardware) {
            fetchHardwareTypes(document.cookie).then(
                (hardwareTypes) => {
                    let content = [ <option></option> ];
                    let i = 1;
                    for (const hardwareType of hardwareTypes) {
                        content.push(<option value={i} className="capitalize">{hardwareType.name}</option>);
                        i++
                    }

                    setTypesAsOptions(<select id="type" name="type" value={type} onChange={e => setType(parseInt(e.target.value, 10))} className="capitalize h-10 border mt-1 rounded px-4 w-full bg-gray-50">{content}</select>);
                }
            ).catch(console.error);

            // next code is going to load from backend so need to stop here for new hardware
            return;
        }

        // From now on only old hardware
        fetchHardware(document.cookie, params.toBeUpdated).then(
            async (hardware) => {
                setSerialNumber(hardware.serialNumber);
                setType(parseInt(hardware.type, 10));
                setInternalId(hardware.internalId);
                setManufacturer(hardware.manufacturer);
                setModel(hardware.model);
                setNote(hardware.note);

                setTypesAsOptions(<input value={type} id="type" name="type" readOnly={true} className="capitalize text-gray-400 h-10 border mt-1 rounded px-4 w-full bg-gray-50" />);

                // invisible input to complete request on backend
                setInternalIdForm(<input type="text" value={internalId} readOnly={true} name="internalId" id="internalId" className="invisible h-0 w-0" />)

                // because sometimes typescript gets funky
                if (new Date(hardware.buyDate).getFullYear() !== 1970) setBuyDate(dateHtmlValue(hardware.buyDate));
                if (new Date(hardware.endOfWarrantyDate).getFullYear() !== 1970) setEndOfWarrantyDate(dateHtmlValue(hardware.endOfWarrantyDate));
            }
        ).catch(console.error);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // new hardware is a POST, edit on hardware is PATCH
        const method = newHardware ? "POST" : "PATCH";

        let details: object
        if (newHardware)
            details = {type: await formatHardwareType(document.cookie, type), buyDate, serialNumber, manufacturer, model, endOfWarrantyDate, note};
        else
            details = {type: await formatHardwareType(document.cookie, type), internalId, buyDate, serialNumber, manufacturer, model, endOfWarrantyDate, note};

        //@ts-ignore
        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');
        console.log(formBody)

        try {
            const response = await fetch(PUBLIC_BACKEND_URL + "/hmu", {
                method: method,
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
                                    {internalIdForm}
                                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                        <div className="md:col-span-5">
                                            <label htmlFor="type">Type</label>
                                            {typesAsOptions}
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="end_of_warranty_date">End of warranty</label>
                                            <input type="date" value={endOfWarrantyDate} onChange={e=>setEndOfWarrantyDate(dateHtmlValue(e.target.value))} name="end_of_warranty_date" id="end_of_warranty_date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="buy_date">Date of buy</label>
                                            <input type="date" value={buyDate} onChange={e=>setBuyDate(dateHtmlValue(e.target.value))} name="buy_date" id="buy_date" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-2">
                                            <label htmlFor="manufacturer">Manufacturer</label>
                                            <input type="text" value={manufacturer} onChange={e=>setManufacturer(e.target.value)} name="manufacturer" id="manufacturer" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-3">
                                            <label htmlFor="model">Model</label>
                                            <input type="text" value={model} onChange={e=>setModel(e.target.value)} name="model" id="model" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="serial_number">Serial Number</label>
                                            <input type="text" value={serialNumber} onChange={e=>setSerialNumber(e.target.value)} name="serial_number" id="serial_number" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" required />
                                        </div>

                                        <div className="md:col-span-5">
                                            <label htmlFor="note">Note</label>
                                            <textarea name="note" value={note} onChange={e=>setNote(e.target.value)} id="note" className="h-20 border mt-1 rounded px-4 w-full bg-gray-50 resize-none" />
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