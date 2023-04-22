import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'gx4o9x9p',
  dataset: 'production',
  apiVersion: '2023-04-13',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
