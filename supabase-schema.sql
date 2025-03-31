-- Contact form submissions table
CREATE TABLE contact_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' -- 'new', 'read', 'replied'
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
  status TEXT NOT NULL DEFAULT 'pending' -- 'pending', 'confirmed', 'cancelled'
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
  status TEXT NOT NULL DEFAULT 'pending' -- 'pending', 'processing', 'shipped', 'delivered', 'cancelled'
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
  type TEXT NOT NULL -- 'book' or 'service'
);

-- Create Row Level Security (RLS) policies to protect the data
ALTER TABLE contact_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Allow public access for all operations (since we're using client-side auth)
CREATE POLICY "Allow public access to contact forms" ON contact_forms
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public access to service bookings" ON service_bookings
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public access to orders" ON orders
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow public access to order items" ON order_items
  FOR ALL USING (true) WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX contact_forms_created_at_idx ON contact_forms(created_at DESC);
CREATE INDEX contact_forms_status_idx ON contact_forms(status);

CREATE INDEX service_bookings_booking_ref_idx ON service_bookings(booking_ref);
CREATE INDEX service_bookings_created_at_idx ON service_bookings(created_at DESC);
CREATE INDEX service_bookings_date_idx ON service_bookings(date);
CREATE INDEX service_bookings_status_idx ON service_bookings(status);

CREATE INDEX orders_order_number_idx ON orders(order_number);
CREATE INDEX orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX orders_customer_email_idx ON orders(customer_email);
CREATE INDEX orders_status_idx ON orders(status);

CREATE INDEX order_items_order_id_idx ON order_items(order_id); 