import prisma from "../prisma/db"
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
// get all
// export const getDevelopers = async(req,res) =>{
//  const company = await prisma.user.findUnique({
//      where:{
//           id: req.user.id
//      },
//      include:{
//           Developer: true
//           }
//  })
//  res.json({data: company,})
// }

//get one
// cloudinary.config({
//     cloud_name: 'YOUR_CLOUD_NAME',
//     api_key: 'YOUR_API_KEY',
//     api_secret: 'YOUR_API_SECRET',
//   });
cloudinary.config({ 
    cloud_name: 'dk3nocfdb', 
    api_key: '532268971997591', 
    api_secret: 'eWhVDDQveJUugM8nrVZwV2V5sX0' 
  });
  
//   const upload = multer({ dest: 'tmp/' });
  export const createDeveloper = async (req, res) => {
    try {
      const checkDev = await prisma.developer.findFirst({
        where: {
          userId: req.user.id,
        },
      });
  
      if (checkDev !== null) {
        res.json({
          message: 'Developer already exists',
          dev: 'true',
        });
        return;
      } else {
        // Handle image upload to Cloudinary
        let imageUrl = '';
        if (req.file) {
          const result = await cloudinary.uploader.upload(req.file.path);
          imageUrl = result.secure_url;

          const created = await prisma.developer.create({
            data: {
              dev_first_name: req.body.dev_fname,
              dev_last_name: req.body.dev_lname,
              bio: req.body.bio,
              skills: req.body.skills,
              background: req.body.background,
              portfolio_link: req.body.portfolio_link,
              address: req.body.address,
              phone: req.body.phone,
              email: req.body.email,
              imageUrl: imageUrl, // Use the Cloudinary image URL here
              userId: req.user.id,
            },
          });
    
          res.json({ data: created });
        }
  
        
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error });
    }
  };


export const getOneDeveloper = async (req, res) => {
    const id = req.params.id

    const dev = await prisma.developer.findFirst({
        where: {
        id
            // belongsToId: req.user.id

        }
    })
    res.json({ data: dev })
}



// export const createDeveloper = async (req, res) => {
//         const created = await prisma.developer.create({
//             data: {
//                 dev_name  : req.body.dev_name,
//                 skills    :  req.body.skills,
//                 bio       :  req.body.bio,
//                 background  : req.body.background,
//                 portfolio_link : req.body.portfolio_link,
//                 address    : req.body.address,
//                 phone      : req.body.phone,
//                 email      : req.body.email,
//                 userId : req.user.id
//             },
//          })
//     res.json({ data: created })
//     }


// export const createDeveloper = async (req, res) => {
//     try{
//         const checkDev = await prisma.developer.findFirst({
//           where:{
//             userId:req.user.id
//           }
//         })
//         // res.json({checkDev})
//         if (checkDev !== null) {
//             res.json({
//                 message :"developer already exists",
//                 dev:"true"
//             })
//             return
//         }else{
//             const created = await prisma.developer.create({
//                 data: {
//                     dev_first_name  : req.body.dev_fname,
//                     dev_last_name  : req.body.dev_lname,
//                     bio       :  req.body.bio,
//                     skills : req.body.skills,
//                     background  : req.body.background,
//                     portfolio_link : req.body.portfolio_link,
//                     address    : req.body.address,
//                     phone      : req.body.phone,
//                     email      : req.body.email,
//                     userId : req.user.id
//                 },
//              })
//         res.json({ data: created })
//         }
        
        
//     }catch(error) {
//         console.error('Error:', error);
//         res.status(500).json({ error })
//       }
//    }


export const updateDeveloper = async (req, res) => {
    const updated = await prisma.developer.update({
        where: {
            id: req.params.id
            // belongsToId: req.user.id
        },
        data: {
            dev_first_name  : req.body.dev_fname,
            dev_last_name  : req.body.dev_lname,
            skills    :  req.body.skills,
            bio       :  req.body.bio,
            background  : req.body.background,
            portfolio_link : req.body.portfolio_link,
            address    : req.body.address,
            phone      : req.body.phone,
            email      : req.body.email
        }
    })
    res.json({ data: updated })
}


export const deleteDeveloper = async (req, res) => {
    const deleted = await prisma.developer.delete({
        where: {
            id: req.params.id
            // belongsToId: req.user.id
        },
    })
    res.json({ data: deleted })
}