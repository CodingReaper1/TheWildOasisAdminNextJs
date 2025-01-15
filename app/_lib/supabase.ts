// Still needed to setup supabase for file/image uploads couldn't find other solution that works with serverless edge runtime

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
export const bucketUrl = `${supabaseUrl}/storage/v1/object/public/images-bucket/`;

const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
