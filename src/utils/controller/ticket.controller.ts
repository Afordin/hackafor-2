import { Ticket } from '@common';
import { apiClient } from '../api';

export const getUserTicket = async (providerId: string): Promise<Ticket> => {
  const { data: ticketData, error } = await apiClient.from('Ticket').select().gte('discord_id', providerId).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!ticketData) {
    throw new Error('No ticket found.');
  }

  // TODO: Hacer esto correctamente
  return ticketData as Ticket;
};
