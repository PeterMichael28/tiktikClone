"use client";

import { GoogleOAuthProvider } from '@react-oauth/google';

const GoogleAuth = ({ children }: { children: React.ReactNode }) => {
  return <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID2!}>{children}</GoogleOAuthProvider>;
};

export default GoogleAuth;