// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export const comparePasswords = (password, hash) => {
     return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
     return bcrypt.hash(password, 5)
}

export const createJWT = (newuser) => {
     const token = jwt.sign({
          id: newuser.id,
          username: newuser.username
     },
          process.env.JWT_SECRET)

     return token
}

//auth middleware
export const protect = (req, res, next) => {
     const bearer = req.headers.authorization

     if (!bearer) {
          res.status(400)
          res.json({ message: "Unauthorised" })
          return
     }
     const [, token] = bearer.split(' ')

     if (!token) {
          res.status(400)
          res.json({ message: "no token" })
          return
     }

     try {
          const user = jwt.verify(token, process.env.JWT_SECRET)
          req.user = user
          // const company = jwt.verify(token, process.env.JWT_SECRET)
          // req.company = company
          next()
     } catch (e) {
          // console.error(e)
          res.status(400)
          res.json({ message: "invalid user token" })
          return
     }
}