const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy

const user = {
    username: 'test-user',
    passwordHash: 'bcrypt-hashed-password',
    id:1

}
passport.use(new LocalStrategy(
    (username, password, done) => {
        findUser(username,(err,user) => {
            if (err){
                return done(err)            

        }
        //if user not found

        if (!user) {
            return done(null, false)
        }

        //Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.passwordHash, (err, isValid))
        }
    }
))