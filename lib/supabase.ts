import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jykbczxjsmylycqwxojs.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5a2Jjenhqc215bHljcXd4b2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1ODYxNjgsImV4cCI6MjA4NzE2MjE2OH0.Q3qOGF2YlCS_Eac9OBmAhuHCPs9tDbIbUkOC260ZLVc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
