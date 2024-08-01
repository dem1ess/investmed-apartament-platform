import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import emailVerificationTemplate from '../emailTemplates/emailVerification'
import passwordResetTemplate from '../emailTemplates/resetPasswordEmail'

@Injectable()
export class MailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })
  }

  async sendEmailVerification(email: string, token: string) {
    const url = `http://localhost:5005/api/auth/verify-email?token=${token}`
    const htmlContent = emailVerificationTemplate(url)
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Email',
      html: htmlContent
    })
    console.log('Email sent')
  }

  async sendPasswordReset(email: string, token: string) {
    const url = `http://localhost:5173/reset-password?token=${token}`
    const htmlContent = passwordResetTemplate(url)
    await this.transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      html: htmlContent
    })
    console.log('Email sent')
  }
}
