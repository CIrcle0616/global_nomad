import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ReadNotificationState {
  readIds: number[];
  markAsRead: (id: number) => void;
}

const useReadNotificaitonStore = create<ReadNotificationState>()(
  persist(
    set => ({
      readIds: [],
      markAsRead: id =>
        set(state => ({
          readIds: [...new Set([...state.readIds, id])],
        })),
    }),
    {
      name: 'read-notifications',
    },
  ),
);

export default useReadNotificaitonStore;
