const API_URL = import.meta.env.VITE_API_URL;

export const postData = async (endpoint: string, postData: unknown) => {
  console.log(`${API_URL}${endpoint}`);

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur réseau : ", error);
    return error;
  }
};

export const fetchData = async (endpoint: string) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return error;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur réseau : ", error);
    return error;
  }
};
