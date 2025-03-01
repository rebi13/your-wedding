import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { getCookie, setCookie } from 'cookies-next';
import { Database } from '@/types/supabase';

// ServerActions, RouterHandler
export const createServerSideClient = async (isServerComponent = false) => {
  const cookieStore = await cookies(); // key value store

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => cookieStore.get(key)?.value,
        set: (key, value, options) => {
          if (isServerComponent) {
            return;
          } // RSC일 경우 쿠키 조작 x
          cookieStore.set(key, value, options);
        },
        remove: (key, options) => {
          cookieStore.set(key, '', options);
        },
      },
    }
  );
};

// React Server Component
export const createServerSideClientRSC = async () => {
  return createServerSideClient(true);
};

// Middleware
export const createServerSideClientMiddleware = async (req: NextRequest, res: NextResponse) => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (key) => getCookie(key, { req, res }),
        set: (key, value, options) => {
          setCookie(key, value, { req, res, ...options });
        },
        remove: (key, options) => {
          setCookie(key, '', { req, res, ...options });
        },
      },
    }
  );
};
