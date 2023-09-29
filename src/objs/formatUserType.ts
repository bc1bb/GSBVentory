const formatUserType = (usertype: number) => {
    switch (usertype) {
        case 1: return "Lab Employee";
        case 2: return "IT Dept";
        case 3: return "Director";
        case 4: return "Super-user";
    }
}

export default formatUserType;