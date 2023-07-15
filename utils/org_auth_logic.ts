
import prisma from "../prisma/db";
import { comparePasswords, createJWT, hashPassword } from "./org_auth";


export const createNewCompany = async (req, res) => {
     // console.log("----------",req.body);
     if (!req.body.password) {
          return res.status(400).json({ error: "Missing password field" });
        }

     const hashed = await hashPassword(req.body.password);
   

     const company = await prisma.company.findFirst({
          where: {
            username: req.body.username,
          },
        });
        
        if (!company) {
          const newCompany = await prisma.company.create({
            data: {
              username: req.body.username,
              password: hashed,
            },
          });
        
          const token = createJWT(newCompany);
          res.json({ token });
        } else {
          res.json({ message: "Organization already exists" });
        }

}



export const signinCompany = async(req,res) =>{
   
     const company = await prisma.company.findFirst({
          where:{
               username: req.body.username
          }
     })
     if(!company){
          res.status(401)
          res.json({message:"Invalid Credentials"})
          return
     }

     const isValid = await comparePasswords(req.body.password, company.password)
    
          if (!isValid){
               
               res.json({message:'Invalid Credentials'})
               return
          }

          const token = createJWT(company)
          res.json({token})
       
}