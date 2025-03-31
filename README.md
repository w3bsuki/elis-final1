# ELISBooks Website

## Database Setup

The application uses Supabase as a backend database. To set up the database:

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to the SQL Editor in your Supabase dashboard
4. Run the SQL commands provided in the `supabase-schema.sql` file to create the necessary tables
5. After creating the tables, copy your Supabase URL and anon key from the API settings
6. Create a `.env.local` file in the root of the project using the `.env.local.example` as a template
7. Add your Supabase URL and anon key to the `.env.local` file:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

## Email Configuration

The application uses Nodemailer to send emails. To configure email sending:

1. Update the email settings in your `.env.local` file
2. For development, emails are simulated (not actually sent)
3. In production, provide proper SMTP credentials for sending real emails

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- Responsive, dual-language (English/Bulgarian) website for a bookstore
- Full e-commerce functionality for selling books and services
- Integration with Supabase for database storage
- Email notifications for order confirmations and contact form submissions
- Checkout process with shipping/billing information
- Service bookings
- Contact form

## Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

## Deploy on Vercel

The easiest way to deploy this application is to use the [Vercel Platform](https://vercel.com).

When deploying to Vercel, make sure to set the necessary environment variables in the Vercel dashboard.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
