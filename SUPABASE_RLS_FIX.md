# Fixing Supabase Row Level Security (RLS) Issues

This guide will help you fix the current issue with database operations failing due to Row Level Security (RLS) policies in Supabase.

## The Problem

The application is currently unable to insert data into Supabase tables (contact_forms, orders, etc.) due to Row Level Security (RLS) policies. You may see error messages like:

```
new row violates row-level security policy for table "contact_forms"
```

This happens because Supabase has RLS enabled but the policies aren't correctly configured to allow public access.

## Solution 1: Update RLS Policies in Supabase Dashboard (Recommended)

1. **Log in to the Supabase Dashboard**:
   - Go to: https://app.supabase.com/
   - Select your project

2. **Navigate to the Table Editor**:
   - Go to the "Table Editor" section in the left sidebar

3. **Update RLS Policies for Each Table**:
   For each of these tables: `contact_forms`, `orders`, `order_items`, `service_bookings`
   
   a. Select the table from the list
   b. Click on "Authentication" tab at the top
   c. Under "Row Level Security (RLS)" make sure it's enabled
   d. Look for existing policies - they should allow all operations (`SELECT`, `INSERT`, `UPDATE`, `DELETE`)
   e. If policies are missing or incorrect, click "New Policy"
   f. Create a policy that allows all operations:
      - Name: "Allow public access"
      - Using expression: `true`
      - With check expression: `true`
   g. Save the policy
   h. Repeat for each operation type as needed

## Solution 2: Use Service Role Key (Alternative)

If you can't modify the RLS policies directly, you can use a service role key to bypass RLS:

1. **Get Your Service Role Key**:
   - In Supabase dashboard, go to Project Settings > API
   - Copy the `service_role` key (warning: this has admin privileges!)

2. **Add to Environment Variables**:
   - Open `.env.local` file
   - Add: `SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here`
   - Restart your application

3. **The admin API endpoints in the app will now use this key to bypass RLS**

## Verifying the Fix

After implementing either solution:

1. Try submitting the contact form
2. Attempt to place an order
3. Check the console for any errors
4. Verify in the Supabase Table Editor that the data was saved successfully

## Need Further Help?

If you're still experiencing issues:

1. Check the browser console and server logs for specific error messages
2. Ensure your Supabase project is active and the database is online
3. Verify your API keys are correct in the `.env.local` file
4. Make sure the tables exist and have the correct schema as defined in `supabase-schema.sql` 