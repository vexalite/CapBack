import prisma from "../prisma/db"

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({ 
     cloud_name: 'dk3nocfdb', 
     api_key: '532268971997591', 
     api_secret: 'eWhVDDQveJUugM8nrVZwV2V5sX0' 
   });
//get all
// export const getCompanies = async(req,res) =>{
//  const company = await prisma.company.findUnique({
//      where:{
//           id: req.company.id
//      },
//      include:{
//           Business: true
//           }
//  })
//  res.json({data: company,})
// }

//get one

export const getOneCompany = async(req,res) =>{
     const id = req.params.id

     const company = await prisma.business.findFirst({
          where:{
               id,
               // belongsToId: req.user.id

          },
     })
     res.json({data: company})
}



// export const createCompany = async (req,res)=>{
//      const created = await prisma.business.create({
//           data:{
//             company_name : req.body.company_name,
//             location   : req.body.location,
//             industry   : req.body.industry,
//             description : req.body.description,
//             companyId: req.company.id
//           },
//      })
//      res.json({data :created})
// }

export const createCompany = async (req,res)=>{
     try{
      let logoUrl = '';
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          logoUrl = result.secure_url;
     const created = await prisma.business.create({
          data:{
            company_name : req.body.company_name,
            location   : req.body.location,
            industry   : req.body.industry,
            description : req.body.description,
            companyId: req.company.id,
            logoUrl:logoUrl
          },
     })
     res.json({data :created})
}
}catch(error) {
     console.error('Error:', error)
     res.status(500).json({ error: 'Internal server error' })
   }
     }
export const updateCompany = async (req,res)=>{
     const updated = await prisma.business.update({
          where:{
               id : req.params.id
               // belongsToId: req.user.id
          },
          data:{
            company_name : req.body.company_name,
            location   : req.body.location,
            industry   : req.body.industry,
            description : req.body.description
          }
     })
     res.json({data :updated})
}


export const deleteCompany = async (req,res)=>{
     const deleted = await prisma.business.delete({
          where:{
               id : req.params.id
               // belongsToId: req.user.id
          },
     })
     res.json({data :deleted})
}