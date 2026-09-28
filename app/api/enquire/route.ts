import { NextResponse } from 'next/server';
import { z } from 'zod';

const EnquirySchema = z.object({
  names: z.string().min(2, 'Names are required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  date: z.string().optional(),
  cityVenue: z.string().min(2, 'Location is required'),
  guestCount: z.string().optional(),
  events: z.array(z.string()).optional(),
  budget: z.string().optional(),
  story: z.string().optional(),
  referral: z.string().optional(),
  honeypot: z.string().optional(), // Spam trap
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Check honeypot for bot submissions
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: 'Received' }, { status: 200 });
    }

    const parsed = EnquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // In demo mode: log the received inquiry payload
    console.log('[NAZAR ENQUIRY DEMO RECEIVED]:', parsed.data);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully. Demo logger recorded the event.',
    });
  } catch {
    return NextResponse.json(
      { success: false, message: 'Server processing error' },
      { status: 500 }
    );
  }
}
