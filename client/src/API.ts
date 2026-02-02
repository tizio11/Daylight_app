export const getDayLight = async (lat:number, lng:number, date:string) => {
    const serverUrl = `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${date}`

    try {
        const response= await fetch(serverUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Errore API:",error);
        return null;
    }
}