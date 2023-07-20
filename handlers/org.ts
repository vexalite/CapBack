import prisma from "../prisma/db"

import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// get all
export const getCompanies = async (req, res) => {
  const company = await prisma.company.findUnique({
    where: {
      id: req.company.id,
    },
    include: {
      Businesses: {
        include: {
          Projects: true,
        },
      },
    },
  })
  res.json({ data: company, })
}

//get one

export const getOneCompany = async (req, res) => {
  const id = req.params.id

  const company = await prisma.business.findFirst({
    where: {
      id,
      // belongsToId: req.user.id

    },
  })
  res.json({ data: company })
}




export const createCompany = async (req, res) => {
  try {
    let logoUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      logoUrl = result.secure_url;
      const created = await prisma.business.create({
        data: {
          company_name: req.body.company_name,
          location: req.body.location,
          industry: req.body.industry,
          description: req.body.description,
          companyId: req.company.id,
          logoUrl: logoUrl
        },
      })
      res.json({ data: created })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


export const updateCompany = async (req, res) => {
  try {
    const checkorg = await prisma.business.findFirst({
      where: {
        id: req.params.id
      }
    })
    if (req.company.id !== checkorg.companyId) {
      res.status(400).json({ 'message': "invalid user" })
    } else {
      const updated = await prisma.business.update({
        where: {
          id: req.params.id
        },
        data: {
          company_name: req.body.company_name,
          location: req.body.location,
          industry: req.body.industry,
          description: req.body.description
        }
      })
      res.json({ data: updated })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteCompany = async (req, res) => {
  try {
    const checkorg = await prisma.business.findFirst({
      where: {
        id: req.params.id
      }
    })
    if (req.user.id !== checkorg.companyId) {
      res.status(400).json({ 'message': "invalid user" })
    } else {
      const deleted = await prisma.business.delete({
        where: {
          id: req.params.id
          // belongsToId: req.user.id
        },
      })
      res.json({ data: deleted })
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const patchBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProject = await prisma.business.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedRating = existingProject.rating.concat(req.body.rating || []);
    const updatedTestimony = existingProject.testimonial.concat(req.body.testimonial || []);


    const updatedBusiness = await prisma.business.update({
      where: {
        id,
      },
      data: {
        rating: updatedRating,
        testimonial: updatedTestimony
      },
    });

    res.json({ data: updatedBusiness });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};