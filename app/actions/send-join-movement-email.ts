"use server"

import { resend, resendFromAddress } from "@/lib/resend"
import { joinMovementEmail } from "@/components/join-movement-email"

type SendJoinMovementEmailInput = {
  email: string
  name: string
}

export async function sendJoinMovementEmail({ email, name }: SendJoinMovementEmailInput) {
  const firstName = name.split(" ")[0]

  await resend.emails.send({
    from: resendFromAddress,
    to: email,
    subject: "Welcome to the Licensed Identity Movement 👋",
    html: joinMovementEmail({ firstName }),
  })
}
