import { Prisma } from "@prisma/client";
import prisma from "../prisma/db"

//get all
export const getBusinesses = async (req, res) => {
     try {
       const companies = await prisma.business.findMany({
         include:{
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





/////////////////////////////////////////  SORTING   /////////////////////////////////////////

//business
   export const getAscCompanies = async (req, res) => {
    try {
      const companies = await prisma.business.findMany({
        orderBy: {
          createdAt: 'asc',
        }
      });
  
      res.json({ data: companies })
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const getDescCompanies = async (req, res) => {
    try {
      const companies = await prisma.business.findMany({
        orderBy: {
          createdAt: 'desc',
        }
      });
  
      res.json({ data: companies })
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

// developers
   
export const getAscDevelopers = async (req, res) => {
  try {
    const developers = await prisma.developer.findMany({
      orderBy:{
        createdAt:'asc'
      }
})
    res.json({ data: developers });
  } catch (error) {
    console.error('Error fetching developers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
     
export const getDescDevelopers = async(req,res) =>{
      const developers = await prisma.developer.findMany({
        orderBy:{
          createdAt:'desc'
        }
      })
      res.json({data: developers})
    }

    export const getPriceAscDevelopers = async(req,res) =>{
      const developers = await prisma.developer.findMany({
        orderBy:{
          price:'asc'
        }
      })
      res.json({data: developers})
    }

    export const getPriceDescDevelopers = async(req,res) =>{
      const developers = await prisma.developer.findMany({
        orderBy:{
          price:'desc'
        }
      })
      res.json({data: developers})
    }   
// projects

     export const getAscProjects = async(req,res) =>{
      const project = await prisma.project.findMany({
          orderBy: {
            createdAt: 'desc',
          }
      })
      res.json({data: project,})
     }


     export const getDescProjects = async(req,res) =>{
      const project = await prisma.project.findMany({
          orderBy: {
            createdAt: 'desc',
          }
      })
      res.json({data: project,})
     }
     export const getPriceAscProjects = async(req,res) =>{
      const project = await prisma.project.findMany({
          orderBy: {
            price: 'asc',
          }
      })
      res.json({data: project,})
     }
     export const getPriceDescProjects = async(req,res) =>{
      const project = await prisma.project.findMany({
          orderBy: {
            price: 'desc',
          }
      })
      res.json({data: project,})
     }

/////////////////////////////////////////////////  FILTERING   ///////////////////////////////////////////////////////////

export const filterJava = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'java'
      }
    }
  })
  res.json({data: filter})
 }

 export const filterHtml = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'html'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterPython = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'python'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterCss = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'css'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterNode = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'node'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterReact = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'react'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterJs = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'javascript'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterMongodb = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'mongodb'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterUiux = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'uiux'
      }
    }
  })
  res.json({data: filter})
 }
 export const filterDocker = async(req,res) =>{
  const filter = await prisma.developer.findMany({
    where: {
      skills: {
        has: 'docker'
      }
    }
  })
  res.json({data: filter})
 }


 //for projects

 
export const filterPJava = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'java'
    }
  }
})
res.json({data: filter})
}

export const filterPHtml = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'html'
    }
  }
})
res.json({data: filter})
}
export const filterPPython = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'python'
    }
  }
})
res.json({data: filter})
}
export const filterPCss = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'css'
    }
  }
})
res.json({data: filter})
}
export const filterPNode = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'node'
    }
  }
})
res.json({data: filter})
}
export const filterPReact = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'react'
    }
  }
})
res.json({data: filter})
}
export const filterPJs = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'javascript'
    }
  }
})
res.json({data: filter})
}
export const filterPMongodb = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'mongodb'
    }
  }
})
res.json({data: filter})
}
export const filterPUiux = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'uiux'
    }
  }
})
res.json({data: filter})
}
export const filterPDocker = async(req,res) =>{
const filter = await prisma.project.findMany({
  where: {
    technology: {
      has: 'docker'
    }
  }
})
res.json({data: filter})
}
