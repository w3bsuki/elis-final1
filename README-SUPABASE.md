# Supabase Database Setup

This guide explains how to properly set up the Supabase database for the ELIS Book Store application.

## Required Tables

The application requires the following tables in your Supabase database:
- `contact_forms` - Stores contact form submissions
- `service_bookings` - Stores service booking requests
- `orders` - Stores order information
- `order_items` - Stores items within orders

## Issue Diagnosis

If you're experiencing errors like "Failed to store order in database" or issues with the contact form, 
it's likely that your Supabase database hasn't been properly set up with the necessary tables and Row Level Security (RLS) policies.

## Step-by-Step Setup Instructions

1. **Access your Supabase project**
   - Log in to [Supabase](https://app.supabase.com/)
   - Select your project (URL should be: https://nlabjdsqkfbzkblwcdma.supabase.co)

2. **Open the SQL Editor**
   - In the left sidebar, click on "SQL Editor"
   - Click "New Query" to create a new SQL query

3. **Execute the Database Schema**
   - Copy the entire contents of the `supabase-schema.sql` file from this project
   - Paste it into the SQL Editor
   - Click "Run" to execute the SQL commands

4. **Verify Table Creation**
   - In the left sidebar, click on "Table Editor"
   - You should see the four tables: `contact_forms`, `service_bookings`, `orders`, and `order_items`

## Troubleshooting

If you're still experiencing issues, check:

1. **Database Tables**
   - Visit our diagnostic endpoint: `/api/check-supabase` in your browser
   - This will show the connection status and table existence

2. **Row Level Security (RLS) Policies**
   - In Supabase, go to "Authentication" > "Policies"
   - Make sure your tables have the following RLS policies:
     - "Allow public access to insert contact forms"
     - "Allow public access to insert service bookings"
     - "Allow public access to insert orders"
     - "Allow public access to insert order items"

3. **Environment Variables**
   - Check your `.env.local` file and make sure these variables are correctly set:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://nlabjdsqkfbzkblwcdma.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYWJqZHNxa2ZiemtibHdjZG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODk5NTMsImV4cCI6MjA1Nzk2NTk1M30.qHLpeR92nNhF7CP8iN9XviT5bJK3zHl68GqKkvCTi1c
     ```

## Direct SQL Commands

If you need to manually create or fix tables:

```sql
-- Drop tables if they already exist (be careful, this will delete all data!)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS service_bookings;
DROP TABLE IF EXISTS contact_forms;

-- Then run the schema file to recreate them
-- (copy-paste from supabase-schema.sql)
```

## Testing

After setting up the database:
1. Run the application
2. Try submitting the contact form
3. Try placing an order
4. Check the Network tab in your browser's developer tools to see the API responses

If you encounter any specific error messages, check the error details to diagnose the issue further. 