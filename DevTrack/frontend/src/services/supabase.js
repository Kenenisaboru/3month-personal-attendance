import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('YOUR_SUPABASE')) {
    console.error('Supabase URL and Key are missing or default. App will not function correctly.');
    // Return a dummy client to prevent crash on import, but auth calls will fail
    supabase = {
        auth: {
            getSession: () => Promise.resolve({ data: { session: null } }),
            onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => { } } } }),
            signInWithPassword: () => Promise.reject(new Error('Supabase not configured')),
            signUp: () => Promise.reject(new Error('Supabase not configured')),
            signOut: () => Promise.resolve(),
        },
        from: () => ({ select: () => Promise.resolve({ data: [], error: null }) })
    };
} else {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }
