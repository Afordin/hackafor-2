import { Ticket } from '@common';
import { create } from 'zustand';

interface TicketStore {
  ticket: Ticket | null;
  setTicket: (ticket: Ticket) => void;
}

export const useTicketStore = create<TicketStore>((set) => ({
  ticket: null,
  setTicket: (ticket) => set({ ticket })
}));
