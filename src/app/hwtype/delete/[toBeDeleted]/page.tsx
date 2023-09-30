'use client';

import Sidebar from "@/components/Sidebar";
import {useEffect} from "react";
import deleteUser from "@/scripts/deleteUser";
import deleteHardwareType from "@/scripts/deleteHardwareType";

const ToBeDeleted = ({params}: {params: { toBeDeleted: string }}) => {
    useEffect(() => {
        deleteHardwareType(document.cookie, params.toBeDeleted).then(() => {document.location = "/hwtype";})
    });

    return (
        <div className="flex">
            <Sidebar />
            Working...
        </div>
    )
}

export default ToBeDeleted;