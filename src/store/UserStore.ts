import { create } from 'zustand';

interface IUserStore {
    username: string;
    id: number;
    isLoggedIn : boolean,
    toggleLogin: (newState : boolean) => void;
    setUsername: (newUsername: string) => void;
    setId : (newId : number) => void;

}
export const useUser = create<IUserStore>()((set) => ({
    username: "",
    id: 0,
    isLoggedIn: false,
    toggleLogin: (newState : boolean) => set((state) => ({ isLoggedIn: newState })),
    setUsername: (newUsername: string) => set((state) => ({username: newUsername})),
    setId : (newId : number) => set((state) => ({id: newId})),
}))

