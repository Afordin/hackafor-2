export function htmlDocBuilder(tags: string, destination: string) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        ${tags}
        <meta http-equiv="refresh" content="5;url=${destination}">
        <title>Redirecting...</title>
    </head>
    <body>
    <h1>Redirecting in 5 seconds...</h1>
    </body>
    </html>`;
}

export function getEnvOrThrow(key: string): string {
  console.log({ env: process.env });
  if(!process.env[key]) {
    throw new Error(`Missing env variable: ${key}`);
  }
  return process.env[key]!;
}