import { Prisma } from "@prisma/client";
import prisma from "../prisma/db"

//get all
export const getCompanies = async (req, res) => {
     try {
       const companies = await prisma.business.findMany({
         where: {
           present: true
         },include:{
          Projects:true
         }
       });
   
       res.json({ data: companies })
     } catch (error) {
       console.error('Error:', error);
       res.status(500).json({ error: 'Internal server error' });
     }
   };

   export const getDevelopers = async(req,res) =>{
     const company = await prisma.developer.findMany()
     res.json({data: company,})
    }

    export const getProjects = async(req,res) =>{
     const project = await prisma.project.findMany()
     res.json({data: project,})
    }







/////////////////////////////////////////  SORTING   /////////////////////////////////////////


//    export const getAscCompanies = async (req, res) => {
//     try {
//       const companies = await prisma.business.findMany({
//         where: {
//           present: true // Include the related Present data
//         },orderBy: {
//           company_name: 'asc',
//         }
//       });
  
//       res.json({ data: companies })
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };

//   export const getDescCompanies = async (req, res) => {
//     try {
//       const companies = await prisma.business.findMany({
//         where: {
//           present: true // Include the related Present data
//         },
//         orderBy: {
//           company_name: 'desc',
//         }
//       });
  
//       res.json({ data: companies })
//     } catch (error) {
//       console.error('Error:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };


   
export const getAscDevelopers = async (req, res) => {
  try {
    const developers = await prisma.developer.findMany({
      orderBy:{
        dev_first_name:'desc'
      }
})
    res.json({ data: developers });
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
     
     export const getDescDevelopers = async(req,res) =>{
      const company = await prisma.developer.findMany({
        where: {
          skills: {
            has: 'HTML'
          }
        }
      })
      res.json({data: company})
     }

//      export const getAscProjects = async(req,res) =>{
//       const project = await prisma.project.findMany({
//           where:{
//                counter: true
//           },
//           orderBy: {
//             project_name: 'desc',
//           }
//       })
//       res.json({data: project,})
//      }


//      export const getDescProjects = async(req,res) =>{
//       const project = await prisma.project.findMany({
//           where:{
//                counter: true
//           },
//           orderBy: {
//             project_name: 'desc',
//           }
//       })
//       res.json({data: project,})
//      }