import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type QuotePayload = {
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  message?: string;
};

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }

  return value;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as QuotePayload;

    const name = payload.name?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const email = payload.email?.trim() ?? "";
    const product = payload.product?.trim() ?? "";
    const message = payload.message?.trim() ?? "";

    if (!name || !email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const smtpHost = getRequiredEnv("SMTP_HOST");
    const smtpPort = Number.parseInt(getRequiredEnv("SMTP_PORT"), 10);
    const smtpUser = getRequiredEnv("SMTP_USER");
    const smtpPass = getRequiredEnv("SMTP_PASS");
    const quoteToEmail = getRequiredEnv("QUOTE_TO_EMAIL");
    const quoteFromEmail = process.env.QUOTE_FROM_EMAIL?.trim() || smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const textBody = [
      "New quote request from Medem site",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone || "-"}`,
      `Product category: ${product || "-"}`,
      "",
      "Message:",
      message || "-"
    ].join("\n");

    await transporter.sendMail({
      from: `Medem Website <${quoteFromEmail}>`,
      to: quoteToEmail,
      replyTo: email,
      subject: `Quote request: ${name}`,
      text: textBody
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Quote send failed:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send quote request." },
      { status: 500 }
    );
  }
}
