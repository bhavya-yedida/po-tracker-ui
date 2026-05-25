const BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getTasks = async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  return response.json();
};

export const createTask = async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return response.json();
};

export const updateTask = async (id, updatedTask) => {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
};

export const deleteTaskApi = async (id) => {
  await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
};