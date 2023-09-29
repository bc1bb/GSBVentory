'use client';

import Sidebar from "@/components/Sidebar";
import {useEffect} from "react";
import deleteHardware from "@/scripts/deleteHardware";
const ToBeDeleted = ({params}: {params: { toBeDeleted: string }}) => {

    useEffect(() => {
       deleteHardware(document.cookie, params.toBeDeleted).then(() => {document.location = "/hmu";})
    });

    return (
        <div className="flex">
            <Sidebar />
            Working...
        </div>
    )
}

export default ToBeDeleted;