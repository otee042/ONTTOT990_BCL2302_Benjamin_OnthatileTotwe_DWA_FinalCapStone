import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ndldkpdwqxwlatvwwcmu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kbGRrcGR3cXh3bGF0dnd3Y211Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwNTM4OTgsImV4cCI6MjAwNjYyOTg5OH0.0SXH_6D21i46W28ntvGabNzMFu72G3vDT-Y-SppfyEg';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;