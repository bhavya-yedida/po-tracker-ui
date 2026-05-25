const BASE_URL = import.meta.env.VITE_API_BASE_URL + "/checklist";

export const getChecklist = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

export const createChecklistItem = async (item) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  return response.json();
};

export const toggleChecklistItem = async (id) => {
  const response = await fetch(`${BASE_URL}/toggle`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
    }),
  });

  return response.json();
};