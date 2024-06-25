/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { VercelRequest } from '@vercel/node';
import { ImageResponse } from '@vercel/og';
import { htmlDocBuilder } from './util';

export const config = {
  runtime: 'edge'
};

const metaTags = {
  card: `<meta name="twitter:card" content="summary_large_image" />`,
  site: `<meta name="twitter:site" content="@afor_digital" />`,
  creator: `<meta name="twitter:creator" content="@afor_digital" />`,
  url: `<meta property="og:url" content="https://hackafor-2.vercel.app/" />`,
  title: `<meta property="og:title" content="Hackafor 2024 - Ticket" />`,
  description: `<meta property="og:description" content="Mensaje troncho" />`,
  image: (url) => `<meta property="og:image" content="${url}" />`,
  twitter_image: (url) => `<meta property="twitter:image" content="${url}" />`,
  twitter_image_2: (url) => `<meta name="twitter:image" content="${url}" />`
};

export default async function handler(request: VercelRequest) {
  const searchParams = new URL(request.url!).searchParams;
  const ticketId = searchParams.get('id');
  if (!ticketId) {
    //TODO: display nice error html
    return new ImageResponse(<>Visit with &quot;?id={'<tu_ticket_id>'}&quot;</>, {
      width: 1200,
      height: 630
    });
  }

  const urlToImage = `https://zokfnpputuhdqcjsnatq.supabase.co/storage/v1/object/public/hackafor2/public/ticket-${ticketId}.png`;

  return new Response(
    htmlDocBuilder(
      Object.keys(metaTags)
        .map((key) => {
          if (typeof metaTags[key] === 'function') {
            return metaTags[key](urlToImage);
          }
          return metaTags[key];
        })
        .join('\n'),
      'https://hackafor-2.vercel.app'
    ), // todo: replace via env variable
    {
      status: 200,
      headers: {
        'Content-Type': 'text/html'
      }
    }
  );
}
