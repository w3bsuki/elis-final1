# Supabase Setup Instructions

## Credentials
- **URL**: https://nlabjdsqkfbzkblwcdma.supabase.co
- **Anon Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYWJqZHNxa2ZiemtibHdjZG1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODk5NTMsImV4cCI6MjA1Nzk2NTk1M30.qHLpeR92nNhF7CP8iN9XviT5bJK3zHl68GqKkvCTi1c
- **Service Role Key**: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sYWJqZHNxa2ZiemtibHdjZG1hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MjM4OTk1MywiZXhwIjoyMDU3OTY1OTUzfQ.8UEI9AIDau66wd29FBgK4yVMPL-GinNz7j8kvB2jaP8

## Creating Database Tables

To set up the database tables:

1. Log in to the Supabase dashboard at https://supabase.com/dashboard/
2. Select your project "nlabjdsqkfbzkblwcdma"
3. Navigate to the SQL Editor in the left sidebar
4. Create a new query
5. Copy the entire contents of the `supabase-schema.sql` file from this project
6. Run the SQL commands to create all tables and policies

The SQL script will create the following tables:
- `contact_forms` - Stores contact form submissions
- `service_bookings` - Stores service booking requests
- `orders` - Stores order information
- `order_items` - Stores items within orders

## Testing the Connection

After setting up the database:

1. Make sure you have the correct environment variables in your `.env.local` file
2. Run the development server: `pnpm dev`
3. Submit a test contact form, book a service, or place an order
4. Check the Supabase dashboard to see if the data was stored correctly

## Manual SQL Commands

If you prefer to create the tables one by one, here are the basic commands:

```sql
-- Contact form submissions table
CREATE TABLE contact_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);

-- Service bookings table
CREATE TABLE service_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  service TEXT NOT NULL,
  service_id TEXT,
  message TEXT,
  booking_ref TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_number TEXT NOT NULL,
  order_date TIMESTAMP WITH TIME ZONE NOT NULL,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  shipping_address TEXT NOT NULL,
  shipping_city TEXT NOT NULL,
  shipping_postal_code TEXT NOT NULL,
  shipping_country TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  notes TEXT,
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping_cost DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending'
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  title TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  quantity INTEGER NOT NULL,
  type TEXT NOT NULL
);
``` 