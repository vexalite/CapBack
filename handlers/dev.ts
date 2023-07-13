import prisma from "../prisma/db"

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

export const getOneDeveloper = async (req, res) => {
    const id = req.params.id

    const dev = await prisma.developer.findFirst({
        where: {
        id
            // belongsToId: req.user.id

        },
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


export const createDeveloper = async (req, res) => {
    try{
        if (!req.user || !req.user.id) {
             // Handle the case when req.company or req.company.id is undefined
             res.json({message:"company not signed in"})
             return
           }
        const created = await prisma.developer.create({
            data: {
                dev_first_name  : req.body.dev_fname,
                dev_last_name  : req.body.dev_lname,
                bio       :  req.body.bio,
                background  : req.body.background,
                portfolio_link : req.body.portfolio_link,
                address    : req.body.address,
                phone      : req.body.phone,
                email      : req.body.email,
                userId : req.user.id
            },
         })
    res.json({ data: created })
    }catch(error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' })
      }
   }


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