import { AuthEmail } from "@/constants/email";
import { Readable } from "stream";

export interface SendEmailProps {
  recipients: string[];
  subject?: string;
  html?: string | Buffer<ArrayBufferLike> | Readable;
}

export interface AuthEmailProps extends Partial<SendEmailProps> {
  emailType: AuthEmail;
  bodyText: string;
  userId: string;
}
