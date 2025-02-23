const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://nwnhppzjzggqcaqqcfjp.supabase.co'
const supabaseKey = process.env.SERVICE_ROLE
const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = { supabase }
