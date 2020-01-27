//One time use token uses pashword hash and created date as a onetime use token
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { Artist } from "../user/user.model"
import {
 transporter,
 getPasswordResetURL,
 resetPasswordTemplate
} from "../../modules/email"

// `secret` is passwordHash concatenated with user's createdAt,
// so if someones gets a user token they still need a timestamp to intercept.
export const usePasswordHashToMakeToken = ({
 password: passwordHash,
 _id: userId,
 createdAt
}) => {
 const secret = passwordHash + "-" + createdAt
 const token = jwt.sign({ userId }, secret, {
   expiresIn: 3600 // 1 hour
 })
 return token
}

/*** Calling this function with a registered user's email sends an email IRL ***/
/*** I think Nodemail has a free service specifically designed for mocking   ***/
export const sendPasswordResetEmail = async (req, res) => {
 const { email } = req.params
 let user
 try {
   user = await User.findOne({ email }).exec()
 } catch (err) {
   res.status(404).json("No user with that email")
 }
 const token = usePasswordHashToMakeToken(user)
 const url = getPasswordResetURL(user, token)
 const emailTemplate = resetPasswordTemplate(user, url)

 const sendEmail = () => {
   transporter.sendMail(emailTemplate, (err, info) => {
     if (err) {
       res.status(500).json("Error sending email")
     }
     console.log(`** Email sent **`, info.response)
   })
 }
 sendEmail()
}

export const receiveNewPassword = (req, res) => {
 const { userId, token } = req.params
 const { password } = req.body

 User.findOne({ _id: userId })

   .then(user => {
     const secret = user.password + "-" + user.createdAt
     const payload = jwt.decode(token, secret)
     if (payload.userId === user.id) {
       bcrypt.genSalt(10, function(err, salt) {
         if (err) return
         bcrypt.hash(password, salt, function(err, hash) {
           if (err) return
           User.findOneAndUpdate({ _id: userId }, { password: hash })
             .then(() => res.status(202).json("Password changed accepted"))
             .catch(err => res.status(500).json(err))
         })
       })
     }
   })

   .catch(() => {
     res.status(404).json("Invalid user")
   })
}