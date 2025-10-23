import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY
const RESEND_FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS

if (!RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is required")
}

if (!RESEND_FROM_ADDRESS) {
  throw new Error("RESEND_FROM_ADDRESS is required")
}

export const resend = new Resend(RESEND_API_KEY)
export const resendFromAddress = RESEND_FROM_ADDRESS
