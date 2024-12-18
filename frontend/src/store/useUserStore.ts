import { create } from 'zustand';

interface UserInfo {
  email: string;
  name: string;
  role: string;
}

interface UserState {
  email: string;
  name: string;
  role: string;
  setUserDetails: (data: UserInfo) => void;
}

export const useUserStore = create<UserState>((set) => ({
  email: '',
  name: '',
  role: '',
  setUserDetails: (data) =>
    set({ email: data.email, name: data.name, role: data.role }),
}));
