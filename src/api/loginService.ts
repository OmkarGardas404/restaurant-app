interface formType {
    email: string;
    password: string;
  }

export async function loginService(userData: formType) {
  try {
    const response = await fetch(import.meta.env.VITE_LOGIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`Server Error: ${response.status} - ${response.text()}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error: ", error);
    throw new Error("Network error or API issue.");
  }
}
