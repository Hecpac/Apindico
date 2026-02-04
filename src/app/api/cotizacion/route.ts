import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validación básica
    if (!data.services || data.services.length === 0) {
      return NextResponse.json(
        { error: "Debe seleccionar al menos un servicio" },
        { status: 400 }
      )
    }

    if (!data.nombre || !data.email || !data.telefono) {
      return NextResponse.json(
        { error: "Faltan datos de contacto requeridos" },
        { status: 400 }
      )
    }

    // TODO: Integrar con Resend para enviar email
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'cotizaciones@apindico.com',
    //   to: ['info@apindico.com'],
    //   subject: `Nueva solicitud de cotización - ${data.nombre}`,
    //   html: `...`
    // })

    // Por ahora, solo log y respuesta exitosa
    console.log("Nueva solicitud de cotización:", {
      nombre: data.nombre,
      empresa: data.empresa,
      email: data.email,
      telefono: data.telefono,
      servicios: data.serviciosNombres,
      ciudad: data.ciudad,
      urgencia: data.urgencia,
      estimado: data.estimado,
      metrosLineales: data.metrosLineales,
      diametroTuberia: data.diametroTuberia,
      material: data.material,
      mensaje: data.mensaje,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Solicitud recibida correctamente"
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error procesando cotización:", error)
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    )
  }
}
