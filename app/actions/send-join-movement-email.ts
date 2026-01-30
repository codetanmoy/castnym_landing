"use server"

import { resend, resendFromAddress } from "@/lib/resend"
import { joinMovementEmail } from "@/components/join-movement-email"
import { getPostHogClient } from "@/lib/posthog-server"

type SendJoinMovementEmailInput = {
  email: string
  name: string
}

export async function sendJoinMovementEmail({ email, name }: SendJoinMovementEmailInput) {
  const firstName = name.split(" ")[0]
  const posthog = getPostHogClient()

  try {
    await resend.emails.send({
      from: resendFromAddress,
      to: email,
      subject: "Welcome to the Licensed Identity Movement 👋",
      html: joinMovementEmail({ firstName }),
    })

    // Track server-side email sent event
    posthog.capture({
      distinctId: email,
      event: "join_movement_email_sent",
      properties: {
        email: email,
        name: name,
        source: "server_action",
      },
    })

    await posthog.shutdown()
  } catch (error) {
    // Track email send failure
    posthog.capture({
      distinctId: email,
      event: "join_movement_email_failed",
      properties: {
        email: email,
        error_message: error instanceof Error ? error.message : "Unknown error",
      },
    })

    await posthog.shutdown()
    throw error
  }
}
