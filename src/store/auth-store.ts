import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user_id: string | null;

  email: string | null;

  name: string | null;

  avatar: string | null;

  hydrated: boolean;

  setUser: (user: {
    user_id: string;
    email: string;
    name: string;
    avatar: string;
  }) => void;

  clearAll: () => void;

  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user_id: null,
      email: null,
      name: null,
      avatar: null,

      hydrated: false,

      setUser: (user) =>
        set({
          user_id: user.user_id,

          email: user.email,

          name: user.name,

          avatar: user.avatar,
        }),

      clearAll: () =>
        set({
          user_id: null,
          email: null,
          name: null,
          avatar: null,
          hydrated: false,
        }),

      setHydrated: () =>
        set({
          hydrated: true,
        }),
    }),

    {
      name: "moneyflow-auth",

      onRehydrateStorage: () => {
        return (state) => {
          state?.setHydrated();
        };
      },
    },
  ),
);
