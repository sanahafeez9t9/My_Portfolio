
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Here you can add your email sending logic.
    // For example, using a service like Nodemailer or SendGrid.
    // For now, we'll just log the data to the console.
    console.log("Received contact form submission:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Message:", message);

    // You can add a delay here to simulate sending an email.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json({ message: "Failed to send message." }, { status: 500 });
  }
}
