import { create } from 'zustand'

type SettingsStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

// zustand状态管理 设置窗口的展示
export const useSettingsStore = create<SettingsStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))