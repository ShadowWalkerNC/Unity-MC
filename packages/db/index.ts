/**
 * Unity-MC Shared Database Utility & Supabase Model Export
 */

export interface DatabaseConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
}

export interface UserSession {
  id: string;
  email: string;
  role: string;
}

export function getSharedDbConfig(): DatabaseConfig {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://shared.supabase.co",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key-placeholder"
  };
}
