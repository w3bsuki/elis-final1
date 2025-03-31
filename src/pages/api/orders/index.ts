import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { supabase, supabaseAdmin, Order, OrderItem } from '@/lib/supabase';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Order API called');
    
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Supabase environment variables are missing');
      return res.status(500).json({ 
        error: 'Server configuration error: Supabase not configured' 
      });
    }
    
    // Check if we have admin access to bypass RLS
    if (!supabaseAdmin) {
      console.warn('Supabase service role key is missing - RLS bypass is not available');
    }
    
    const body = req.body;
    console.log('Order request body:', JSON.stringify(body, null, 2));
    
    const { 
      customer, 
      shipping, 
      items,
      paymentMethod,
      notes,
      subtotal,
      shippingCost,
      tax,
      totalAmount,
      paymentIntentId // New field for Stripe payment
    } = body;

    // Validate required fields
    if (!customer || !shipping || !items || !items.length) {
      console.error('Missing required order information', { customer, shipping, items });
      return res.status(400).json({
        error: 'Missing required order information'
      });
    }

    // Simple validation for customer info
    if (!customer.firstName || !customer.lastName || !customer.email) {
      console.error('Missing required customer information', { customer });
      return res.status(400).json({
        error: 'Missing required customer information'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      console.error('Invalid email format', { email: customer.email });
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Generate order ID
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const orderDate = new Date().toISOString();

    // If using Stripe, verify the payment
    if (paymentMethod === 'card' && paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      if (paymentIntent.status !== 'succeeded') {
        return res.status(400).json({
          error: 'Payment has not been completed'
        });
      }
    }

    // Create the order object for Supabase
    const orderData: Order = {
      order_number: orderId,
      order_date: orderDate,
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: shipping.address,
      shipping_city: shipping.city,
      shipping_postal_code: shipping.postalCode,
      shipping_country: shipping.country,
      payment_method: paymentMethod,
      notes: notes,
      subtotal: subtotal,
      shipping_cost: shippingCost,
      tax: tax,
      total_amount: totalAmount,
      status: paymentMethod === 'card' ? 'processing' : 'pending'
    };

    let dbOrderId = null;
    
    // Save order to database
    try {
      console.log('Saving order to Supabase:', orderData);
      
      // Try using the admin client first if available to bypass RLS
      if (supabaseAdmin) {
        console.log('Using Supabase Admin client with service role key to bypass RLS');
        const { data: adminOrderResult, error: adminOrderError } = await supabaseAdmin
          .from('orders')
          .insert(orderData)
          .select();
        
        if (adminOrderError) {
          console.error('Error saving order via admin client:', adminOrderError);
          // Fall back to regular approach
        } else {
          console.log('Order saved successfully via admin client:', adminOrderResult);
          dbOrderId = adminOrderResult && adminOrderResult.length > 0 ? adminOrderResult[0].id : null;
          console.log('Database order ID from admin client:', dbOrderId);
          
          // Continue to save order items with admin client
          if (dbOrderId) {
            const orderItems: OrderItem[] = items.map(item => ({
              order_id: dbOrderId,
              item_id: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              type: item.type
            }));

            console.log('Saving order items to Supabase using admin client:', orderItems);

            const { error: adminItemsError } = await supabaseAdmin
              .from('order_items')
              .insert(orderItems);

            if (adminItemsError) {
              console.error('Error saving order items via admin client:', adminItemsError);
            } else {
              console.log('Order items saved successfully via admin client');
            }
            
            // Send email notifications and return success response
            return await sendEmailsAndReturnResponse(res, orderId, orderDate, customer, shipping, items, paymentMethod, notes, subtotal, shippingCost, tax, totalAmount);
          }
        }
      }
      
      // If admin client not available or failed, try standard approach
      const { data: orderResult, error: orderError } = await supabase
        .from('orders')
        .insert(orderData)
        .select();

      if (orderError) {
        console.error('Error saving order to Supabase using standard approach:', orderError);
        
        // If we got an RLS error, return a more specific error message
        if (orderError.code === '42501' && orderError.message.includes('row-level security')) {
          console.error('Row Level Security preventing database writes - please update RLS policies');
          
          return res.status(500).json({ 
            error: 'Row Level Security preventing database writes', 
            details: 'Please check that you have added the service role key correctly',
            code: orderError.code,
            rls_error: true
          });
        }
        
        return res.status(500).json({ 
          error: 'Failed to store order in database', 
          details: orderError.message, 
          code: orderError.code,
          hint: orderError.hint || 'Check if the orders table exists and has the correct schema' 
        });
      }

      console.log('Order saved successfully:', orderResult);
      dbOrderId = orderResult && orderResult.length > 0 ? orderResult[0].id : null;
      console.log('Database order ID:', dbOrderId);
      
      // Save order items
      if (dbOrderId) {
        const orderItems: OrderItem[] = items.map(item => ({
          order_id: dbOrderId,
          item_id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          type: item.type
        }));

        console.log('Saving order items to Supabase:', orderItems);

        const { error: itemsError } = await supabase
          .from('order_items')
          .insert(orderItems);

        if (itemsError) {
          console.error('Error saving order items to Supabase:', itemsError);
          // Continue even if item saving fails, at least we have the main order
        } else {
          console.log('Order items saved successfully');
        }
      }

      // For development/demo purposes, log the order
      console.log('New order received:', { 
        orderId, 
        orderDate, 
        customer, 
        shipping, 
        items, 
        paymentMethod, 
        notes, 
        subtotal, 
        shippingCost, 
        tax, 
        totalAmount,
        dbOrderId
      });

      // Send email notifications and return success response
      return await sendEmailsAndReturnResponse(res, orderId, orderDate, customer, shipping, items, paymentMethod, notes, subtotal, shippingCost, tax, totalAmount);
      
    } catch (supabaseError) {
      console.error('Exception when saving order to Supabase:', supabaseError);
      return res.status(500).json({ 
        error: 'Exception when connecting to database', 
        details: supabaseError instanceof Error ? supabaseError.message : 'Unknown error'
      });
    }
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ 
      error: 'Failed to process order', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

// Helper function to send emails and return success response
async function sendEmailsAndReturnResponse(
  res: NextApiResponse,
  orderId: string, 
  orderDate: string, 
  customer: any, 
  shipping: any, 
  items: any, 
  paymentMethod: string, 
  notes: string, 
  subtotal: number, 
  shippingCost: number, 
  tax: number, 
  totalAmount: number
) {
  try {
    if (process.env.NODE_ENV !== 'development') {
      // In production, send actual emails
      
      // Send confirmation email to customer
      const customerMailOptions = {
        from: `"ELISBooks Shop" <${process.env.EMAIL_USER || 'orders@elisbooks.com'}>`,
        to: customer.email,
        subject: `Order Confirmation #${orderId}`,
        html: generateOrderConfirmationEmail({
          id: orderId,
          date: orderDate,
          customer,
          shipping,
          items,
          paymentMethod,
          notes,
          subtotal,
          shippingCost,
          tax,
          totalAmount
        }),
      };

      // Send notification email to store admin
      const adminMailOptions = {
        from: `"ELISBooks Shop" <${process.env.EMAIL_USER || 'orders@elisbooks.com'}>`,
        to: process.env.ADMIN_EMAIL || 'admin@elisbooks.com',
        subject: `New Order #${orderId}`,
        html: generateAdminOrderNotificationEmail({
          id: orderId,
          date: orderDate,
          customer,
          shipping,
          items,
          paymentMethod,
          notes,
          subtotal,
          shippingCost,
          tax,
          totalAmount
        }),
      };

      // Send emails
      await Promise.all([
        transporter.sendMail(customerMailOptions),
        transporter.sendMail(adminMailOptions)
      ]);
    } else {
      // In development, simulate sending
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return res.status(200).json({
      success: true,
      message: 'Order processed and stored successfully',
      orderId: orderId,
      orderDate: orderDate
    });
  } catch (emailError) {
    console.error('Failed to send order emails:', emailError);
    // We still return success since the order was saved to database
    return res.status(200).json({
      success: true,
      message: 'Order stored successfully but email notification failed',
      orderId: orderId,
      orderDate: orderDate
    });
  }
}

// Email template functions
function generateOrderConfirmationEmail(order: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your order!</h2>
      <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
      <p>We're pleased to confirm your order #${order.id}.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        
        <h4>Items:</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 8px;">Item</th>
              <th style="text-align: right; padding: 8px;">Qty</th>
              <th style="text-align: right; padding: 8px;">Price</th>
              <th style="text-align: right; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((item: any) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="text-align: left; padding: 8px;">${item.title}</td>
                <td style="text-align: right; padding: 8px;">${item.quantity}</td>
                <td style="text-align: right; padding: 8px;">${item.price.toFixed(2)} BGN</td>
                <td style="text-align: right; padding: 8px;">${(item.price * item.quantity).toFixed(2)} BGN</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Subtotal:</strong></td>
              <td style="text-align: right; padding: 8px;">${order.subtotal.toFixed(2)} BGN</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Shipping:</strong></td>
              <td style="text-align: right; padding: 8px;">${order.shippingCost === 0 ? 'Free' : `${order.shippingCost.toFixed(2)} BGN`}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Tax:</strong></td>
              <td style="text-align: right; padding: 8px;">${order.tax.toFixed(2)} BGN</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;"><strong>Total:</strong></td>
              <td style="text-align: right; padding: 8px; font-weight: bold;">${order.totalAmount.toFixed(2)} BGN</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="margin: 20px 0;">
        <h3>Shipping Information</h3>
        <p>${order.customer.firstName} ${order.customer.lastName}</p>
        <p>${order.shipping.address}</p>
        <p>${order.shipping.city}, ${order.shipping.postalCode}</p>
        <p>${order.shipping.country}</p>
      </div>
      
      ${order.notes ? `
        <div style="margin: 20px 0;">
          <h3>Order Notes</h3>
          <p>${order.notes}</p>
        </div>
      ` : ''}
      
      <p>If you have any questions about your order, please contact our customer service.</p>
      <p>Thank you for shopping with ELISBooks!</p>
    </div>
  `;
}

function generateAdminOrderNotificationEmail(order: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Order Received</h2>
      <p>A new order has been placed on the website.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Details</h3>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)} BGN</p>
        
        <h4>Customer Information:</h4>
        <p>Name: ${order.customer.firstName} ${order.customer.lastName}</p>
        <p>Email: ${order.customer.email}</p>
        <p>Phone: ${order.customer.phone}</p>
        
        <h4>Shipping Address:</h4>
        <p>${order.shipping.address}</p>
        <p>${order.shipping.city}, ${order.shipping.postalCode}</p>
        <p>${order.shipping.country}</p>
        
        <h4>Items:</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 8px;">Item</th>
              <th style="text-align: left; padding: 8px;">Type</th>
              <th style="text-align: right; padding: 8px;">Qty</th>
              <th style="text-align: right; padding: 8px;">Price</th>
              <th style="text-align: right; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((item: any) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="text-align: left; padding: 8px;">${item.title}</td>
                <td style="text-align: left; padding: 8px;">${item.type}</td>
                <td style="text-align: right; padding: 8px;">${item.quantity}</td>
                <td style="text-align: right; padding: 8px;">${item.price.toFixed(2)} BGN</td>
                <td style="text-align: right; padding: 8px;">${(item.price * item.quantity).toFixed(2)} BGN</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      ${order.notes ? `
        <div style="margin: 20px 0;">
          <h3>Customer Notes</h3>
          <p>${order.notes}</p>
        </div>
      ` : ''}
      
      <p>Please process this order as soon as possible.</p>
    </div>
  `;
} 