import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  nombre: z.string().min(2).max(100),
  email: z.string().email(),
  telefono: z.string().optional().or(z.literal("")),
  mensaje: z.string().min(10).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // TODO: Implement email sending with Resend
    // For now, just log the contact request
    console.log("Contact form submission:", data)

    // In production, you would:
    // 1. Send email notification using Resend
    // 2. Store in database if needed
    // 3. Return appropriate response

    return NextResponse.json(
      { success: true, message: "Mensaje recibido correctamente" },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, errors: error.issues },
        { status: 400 }
      )
    }

    console.error("Contact form error:", error)
    return NextResponse.json(
      { success: false, message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
