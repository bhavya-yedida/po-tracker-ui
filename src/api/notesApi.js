import api from "./axios";

export const getNotes = () => api.get("/notes");

export const createNote = (data) => api.post("/notes", data);