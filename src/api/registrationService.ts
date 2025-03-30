export async function registrationService(userData: Record<string, string>) {
    try {
        const response = await fetch(import.meta.env.VITE_SIGNUP_API, {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(userData),
        });
        if(!response.ok) {
            throw new Error(`Server Error: ${response.status} - ${response.text()}`);
        }
        return await response.json();
    }catch(error) {
        console.error("Fetch error: ", error);
        throw new Error("Network error or API issue.");
    }
}