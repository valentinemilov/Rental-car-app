const validateUniqueId = (id: string): boolean => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    if(id === null || id === undefined) {
        return false;
    }
    
    return regex.test(id.trim());
};

export default validateUniqueId;
