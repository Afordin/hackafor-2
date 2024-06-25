import { Ticket } from '@common';
import { apiClient } from '../api';

const bucketStorage = import.meta.env.VITE_STORAGE_BUCKET;

export const getUserTicket = async (providerId: string): Promise<Ticket> => {
  const { data: ticketData, error } = await apiClient.from('Ticket').select().eq('discord_id', providerId).single();

  if (error) {
    throw new Error(error.message);
  }

  return ticketData as Ticket;
};

export const uploadTicket = async (providerId: string, ticketId: string, img: Blob): Promise<void> => {
  const { data, error } = await apiClient.storage.from(bucketStorage).upload(`public/ticket-${ticketId}.png`, img!, {
    cacheControl: '3600',
    upsert: true
  });

  if (error && error['statusCode'] != '403') {
    throw new Error(error.message);
  }

  if (!data) {
    return;
  }

  const res = await apiClient.from('Ticket').upsert(
    {
      discord_id: providerId,
      image: data.path
    },
    {
      onConflict: 'discord_id'
    }
  );

  if (res.error) {
    throw new Error(res.error.message);
  }
};
