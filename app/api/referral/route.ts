import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const requiredFields = ["referrerName", "organization", "email", "phone", "participantName", "location", "consent"];
  const missing = requiredFields.some((field) => !body[field]);

  if (missing) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  // Placeholder for email integration or CRM webhook.
  console.log("New referral", {
    ...body,
    submittedAt: new Date().toISOString()
  });

  return NextResponse.json({ ok: true, message: "Referral submitted" });
}
