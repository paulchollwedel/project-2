import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const getPasswordResetURL = (user, token) =>
  `http://localhost:3000/password/reset/${user._id}/${token}`

export const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN
  const to = user.email
  const subject = "🌻 The Fridge Password Rest 🌻"
  const html = `
  <p>Hey ${user.displayName || user.email},</p>
  <p>Hey there !its okay if you dont remember your The Fridge password</p>
  <p>Hey dont lose your freon! You can use the following link to reset your password:</p>
  <a href=${url}>${url}</a>
  <p>If you don’t use this link within 1 hour, it will expire.</p>
  <p>Buy soome art! Post some art </p>
  <p>–Your friends at The Fridge!</p>
  `

  return { from, to, subject, html }
}
