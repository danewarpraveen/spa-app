

export default function saveToLocalStorage(key: string, value: any) {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);         


    } catch (error) {
        console.error("Error saving to localStorage", error);
    }       
}

export function getFromLocalStorage(key: string) {
    try {
        const serializedValue = localStorage.getItem(key);      
        if (serializedValue === null) {
            return undefined;
        }

        return JSON.parse(serializedValue);
    } catch (error) {
        console.error("Error getting data from localStorage", error);
        return undefined;
    }   
}

export function removeFromLocalStorage(key: string) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error("Error removing data from localStorage", error);
    }   
}