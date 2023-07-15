import prisma from "../prisma/db"

//get all
// export const getProjects = async(req,res) =>{
//  const project = await prisma.project.findMany({
//      where:{
//           counter: true
//      }
//  })
//  res.json({data: project,})
// }

// get one

export const getOneProject = async(req,res) =>{
     const id = req.params.id

     const project = await prisma.project.findFirst({
          where:{
               id,
               // belongsToId: req.user.id

          },
     })
     res.json({data: project})
}



export const createProject = async (req,res)=>{
     try{
     if (!req.company || !req.company.id) {
          // Handle the case when req.company or req.company.id is undefined
          res.json({message:"company not signed in"})
          console.log(req.company.id)
          return
        }
     //    const find = prisma.company.findUnique({
     //      where:{
     //           id : req.params.id,
     //      }
     //    })
     //    res.json({data :find})
     const created = await prisma.project.create({
         data: {
             project_name: req.body.project_name,
             timeframe: req.body.timeframe,
             technology: req.body.technology,
             description: req.body.description,
             status:req.body.status,
             devlist: req.body.devlist,
             businessId: req.params.id
         },
     })
     res.json({data :created})
}catch(error) {
     console.error('Error:', error)
     res.status(500).json({ error: 'Internal server error' })
   }
}

export const updateProject = async (req,res)=>{
     const updated = await prisma.project.update({
          where:{
               id : req.params.id
               // belongsToId: req.user.id
          },
          data:{
            project_name: req.body.project_name,
             timeframe: req.body.timeframe,
             technology: req.body.technology,
             description: req.body.description,
             devlist: req.body.devlist,
          }
     })
     res.json({data :updated})
}


export const patchProject = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedDevlist = existingProject.devlist.concat(req.body.devlist || []);

    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        devlist: updatedDevlist,
      },
    });

    res.json({ data: updatedProject });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const deleteProject = async (req,res)=>{
     const deleted = await prisma.project.delete({
          where:{
               id : req.params.id
               // belongsToId: req.user.id
          },
     })
     res.json({data :deleted})
}