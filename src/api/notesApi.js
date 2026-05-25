const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/notes";

export const getNotes = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const saveNotes = async (content) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
    }),
  });

  return response.json();
};