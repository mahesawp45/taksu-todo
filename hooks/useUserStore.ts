import LocalStorage, { USER_KEY } from 'service/localStorage';
import { create } from 'zustand';

type UserStore = {
  user: string;
  isLoggedin: boolean;
  login: ({ user, isLoggedin }: { user: string; isLoggedin: boolean }) => void;
  logout: () => void;
  loadUser: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  user: '',
  isLoggedin: false,

  login: ({ user, isLoggedin }) => {
    set({ user, isLoggedin: true });
    LocalStorage.set(USER_KEY, JSON.stringify({ user, isLoggedin: true }));
  },

  logout: () => {
    set({ user: '', isLoggedin: false });
    LocalStorage.remove(USER_KEY);
  },

  loadUser: async () => {
    const storedUser = await LocalStorage.get(USER_KEY);
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      set({ user: parsedUser.user, isLoggedin: parsedUser.isLoggedin });
    }
  },
}));

export default useUserStore;
