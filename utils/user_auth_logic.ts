

import prisma from "../prisma/db";
import { comparePasswords, createJWT, hashPassword } from "../utils/auth";

export const createNewUser = async (req, res) => {
     // console.log("----------",req.body);
     if (!req.body.password) {
          return res.status(400).json({ error: "Missing password field" });
     }

     const hashed = await hashPassword(req.body.password);


     const user = await prisma.user.findFirst({
          where: {
               username: req.body.username,
          },
     });

     if (!user) {
          const newUser = await prisma.user.create({
               data: {
                    name: req.body.name,
                    username: req.body.username,
                    password: hashed,
               },
          });

          const token = createJWT(newUser);
          res.json({ token });
     } else {
          res.json({ message: "User already exists" });
     }

}



export const signin = async (req, res) => {

     const user = await prisma.user.findFirst({
          where: {
               username: req.body.username
          }
     })
     if (!user) {
          res.status(401)
          res.json({ message: "Invalid Credentials" })
          return
     }

     const isValid = await comparePasswords(req.body.password, user.password)
    
          if (!isValid){
               
               res.json({message:'Invalid Credentials'})
               return
          }
          const token = createJWT(user)
          // console.log(user)
          const checkDev = await prisma.developer.findFirst({
               where:{
                 userId:user.id
               }
             })
         
          if (checkDev !== null) {
               res.json({token,
                    message :"developer already exists",
                          dev:"true"
               })}else{
                    res.json({token,
                         message :"developer doesn't exists",
                               dev:"false"
                    }) 
               }
}
