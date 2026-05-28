import api from "./axios";

export const getChecklist = () => api.get("/checklist");

export const createChecklist = (data) =>
  api.post("/checklist", data);

export const toggleChecklist = (id) =>
  api.put(`/checklist/toggle/${id}`);