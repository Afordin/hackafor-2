/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { VercelRequest } from '@vercel/node';
import { ImageResponse } from '@vercel/og';
import { getEnvOrThrow, htmlDocBuilder } from './util';

export const config = {
  runtime: 'edge'
};

const metaTags = {
  site: `<meta name="twitter:site" content="@afor_digital" />`,
  creator: `<meta name="twitter:creator" content="@afor_digital" />`,
  url: `<meta property="og:url" content="https://${getEnvOrThrow('VERCEL_PROJECT_PRODUCTION_URL')}" />`,
  title: `<meta property="og:title" content="Hackafor 2024 - Ticket" />`,
  image: ({ url }) => `<meta name="og:image" content="${url}" />`,
  description: `<meta property="og:description" content="Mensaje troncho" />`,
  twitter_card: `<meta name="twitter:card" content="summary_large_image" />`,
  twitter_domain: `<meta property="twitter:domain" content="https://${getEnvOrThrow('VERCEL_PROJECT_PRODUCTION_URL')}" />`,
  twitter_url: ({ ticketId }) =>
    `<meta property="twitter:url" content="https://${getEnvOrThrow('VERCEL_PROJECT_PRODUCTION_URL')}/api/og?id=${ticketId}" />`,
  twitter_title: `<meta name="twitter:title" content="Hackafor 2024 - Ticket" />`,
  twitter_description: `<meta name="twitter:description" content="Mensaje troncho" />`,
  twitter_image: ({ url }) => `<meta name="twitter:image" content="${url}" />`
};

export default function handler(request: VercelRequest) {
  console.log('here!!!!!!')
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
            return metaTags[key]({ url: urlToImage, ticketId });
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
