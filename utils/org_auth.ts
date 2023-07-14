import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



export const comparePasswords = (password, hash) =>{
 return bcrypt.compare(password, hash)
}

export const hashPassword = (password) => {
     return bcrypt.hash(password, 10)
}


export const createJWT = (newcompany) =>{
    //  console.log(newcompany.id, newcompany.username)
     const token = jwt.sign({
          id: newcompany.id,
          // username: newcompany.username
     },
     process.env.JWT_SECRET_KEY)
    //  console.log('Generated JWT:', token_c);
    
     return token
}

// console.log(createJWT_C)
//auth middleware
export const orgProtect = (req, res, next)=>{
const bearer = req.headers.authorization
// console.log(req.headers.authorization)

if(!bearer){
     res.status(400)
     res.json({message :'Unauthorized'})
     return
}
const [, token] = bearer.split(' ')

if (!token){
     res.status(400)
     res.json({message:'no token '})
     return;
}

try{
     const company = jwt.verify(token, process.env.JWT_SECRET_KEY)
     req.company = company
     console.log('try',company)
     next()
} catch (e){
     console.error(e)
     console.log(token)
     res.status(400)
     res.json({message: 'invalid company token '})
     return
}
}