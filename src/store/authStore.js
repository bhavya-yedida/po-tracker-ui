import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
    window.location.href = "/login"; 
  },
}));

export default useAuthStore;