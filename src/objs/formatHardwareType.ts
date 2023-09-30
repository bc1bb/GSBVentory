import fetchHardwareTypes from "@/scripts/fetchHardwareTypes";

const formatHardwareType = async (cookies: string, hardwareType: number) => {
    const hardwareTypes: string[] = [];

    const hardwareTypesObject = await fetchHardwareTypes(cookies);
    for (const i in hardwareTypesObject) {
        hardwareTypes.push(hardwareTypesObject[i].name);
    }

    return hardwareTypes[hardwareType-1];
}

export default formatHardwareType;