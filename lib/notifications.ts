import { ContactInquiry } from './types';

export async function notifyAdminOfInquiry(inquiry: ContactInquiry): Promise<{ notified: boolean; method: string }> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'piyushkumargupta159@gmail.com';
  
  console.log(`========================================================================`);
  console.log(`[REALTIME LEAD ALERT] New Project Inquiry Received`);
  console.log(`Client Name: ${inquiry.name}`);
  console.log(`Client Email: ${inquiry.email}`);
  console.log(`Client Phone: ${inquiry.phone || 'Not provided'}`);
  console.log(`Category: ${inquiry.projectType}`);
  console.log(`Budget: ${inquiry.budgetRange}`);
  console.log(`Date & Time: ${inquiry.createdAt}`);
  console.log(`Message: "${inquiry.message}"`);
  console.log(`Target Admin Email: ${adminEmail}`);
  console.log(`========================================================================`);

  // 1. If Resend / Webhook API Key is provided in environment variables, dispatch direct HTTP notification
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'Piyush Portfolio <onboarding@resend.dev>',
          to: adminEmail,
          reply_to: inquiry.email,
          subject: `🔥 New Video Project Inquiry: ${inquiry.name} (${inquiry.projectType})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0A0C; color: #ffffff; padding: 24px; border-radius: 16px; border: 1px solid #27272a;">
              <h2 style="color: #60a5fa; margin-top: 0;">New Project Inquiry on Portfolio</h2>
              <hr style="border-color: #27272a; margin: 16px 0;" />
              <p><strong>Name:</strong> ${inquiry.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${inquiry.email}" style="color: #38bdf8;">${inquiry.email}</a></p>
              <p><strong>Phone:</strong> ${inquiry.phone || 'Not provided'}</p>
              <p><strong>Category:</strong> ${inquiry.projectType}</p>
              <p><strong>Budget:</strong> ${inquiry.budgetRange}</p>
              <p><strong>Date:</strong> ${new Date(inquiry.createdAt).toLocaleString('en-US')}</p>
              <div style="background: #18181b; padding: 16px; border-radius: 12px; margin-top: 16px; border: 1px solid #27272a;">
                <p style="margin: 0; font-style: italic; color: #e4e4e7;">"${inquiry.message}"</p>
              </div>
            </div>
          `
        })
      });
      if (res.ok) {
        return { notified: true, method: 'resend_api' };
      }
    } catch (err) {
      console.error('[Notification Dispatch Error]:', err);
    }
  }

  // 2. Webhook notification (Discord, Telegram, Slack, Zapier) if configured
  if (process.env.ADMIN_WEBHOOK_URL) {
    try {
      await fetch(process.env.ADMIN_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `🔥 **New Lead on Piyush Portfolio!**\n**Name:** ${inquiry.name}\n**Email:** ${inquiry.email}\n**Phone:** ${inquiry.phone || 'N/A'}\n**Category:** ${inquiry.projectType}\n**Message:** ${inquiry.message}`
        })
      });
      return { notified: true, method: 'webhook' };
    } catch {}
  }

  return { notified: true, method: 'database_and_admin_cms' };
}
