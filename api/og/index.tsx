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
  image: (url) => `<meta property="og:image" content=${url} />`,
  twitter_image: (url) => `<meta property="twitter:image" content=${url} />`
};

export default async function handler(request: VercelRequest) {
  const searchParams = new URL(request.url!).searchParams;
  const userId = searchParams.get('userId');
  if (!userId) {
    //TODO: display nice error html
    return new ImageResponse(<>Visit with &quot;?userId=vercel&quot;</>, {
      width: 1200,
      height: 630
    });
  }

  const urlToImage = 'https://user-images.githubusercontent.com/43246362/228169742-496fac89-0191-4d24-a2f5-90106160185c.png';

  return new Response(
    htmlDocBuilder(
      Object.keys(metaTags)
        .map((key) => {
          if (key === 'image' || key === 'twitter_image') {
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
