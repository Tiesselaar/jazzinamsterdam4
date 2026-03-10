import { RequestData } from "node-mailjet/declarations/request/Request";
import Mailjet from 'node-mailjet';

const { MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE } = process.env

if (!MJ_APIKEY_PUBLIC || !MJ_APIKEY_PRIVATE) {
  throw new Error("Missing Mailjet API keys")
}

const mailjet = Mailjet.apiConnect(
  MJ_APIKEY_PUBLIC,
  MJ_APIKEY_PRIVATE
)

function formatModeratorEmail(subject: string, body: string): RequestData {
  return {
    Messages: [
      {
        From: {
          Email: "submitform@jazzin.amsterdam",
          Name: "Submit Form"
        },
        To: [
          {
            Email: "jazzinmokum@gmail.com",
            Name: "Jazz in Amsterdam"
          }
        ],
        Subject: subject,
        HTMLPart: body
      }
    ]
  }
}

export async function POST(req: Request): Promise<Response> {
  const data = await req.json()
  const subject = data.subject as string
  const body = data.body as string

  if (!subject || !body) {
    return Response.json({ error: "Missing subject or body" }, { status: 400 })
  }

  const msg = formatModeratorEmail(subject, body)

  try {
    await mailjet.post('send', { version: 'v3.1' }).request(msg)
    return Response.json({ status: "Email sent" })
  } catch (error) {
    return Response.json(
      { error: "Failed to send mail to moderator" },
      { status: 500 }
    )
  }
}