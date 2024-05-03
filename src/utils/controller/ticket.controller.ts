import { Ticket } from '@common';
import { apiClient } from '../api';

const bucketStorage = import.meta.env.VITE_STORAGE_BUCKET;

export const getUserTicket = async (providerId: string): Promise<Ticket> => {
  const { data: ticketData, error } = await apiClient.from('Ticket').select().eq('discord_id', providerId).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!ticketData) {
    throw new Error('No ticket found.');
  }

  // TODO: Hacer esto correctamente
  return ticketData as Ticket;
};

export const uploadTicket = async (providerId: string, ticketId: string, img: Blob): Promise<void> => {
  const { data, error } = await apiClient.storage.from(bucketStorage).upload(`public/ticket-${ticketId}.png`, img!, {
    cacheControl: '3600',
    upsert: true
  });

  if (error) {
    throw new Error(error.message);
  }

  const res = await apiClient.from('Ticket').update({ image: data.path }).eq('discord_id', providerId);

  if (res.error) {
    throw new Error(res.error.message);
  }
};
