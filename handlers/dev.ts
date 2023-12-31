import prisma from "../prisma/db"
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
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
            price: parseInt(req.body.price),
            portfolio_link: req.body.portfolio_link,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            imageUrl: imageUrl,
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



export const updateDeveloper = async (req, res) => {
  try {
    const checkuser = await prisma.developer.findFirst({
      where: {
        id: req.params.id
      }
    })
    // console.log(req.user.id !== checkuser.userId)
    if (req.user.id !== checkuser.userId) {
      res.status(400).json({ 'message': "invalid user" })
    } else {
      const updated = await prisma.developer.update({
        where: {
          id: req.params.id
        },
        data: {
          dev_first_name: req.body.dev_fname,
          dev_last_name: req.body.dev_lname,
          skills: req.body.skills,
          bio: req.body.bio,
          price: parseInt(req.body.price),
          background: req.body.background,
          portfolio_link: req.body.portfolio_link,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email
        }
      })
      res.json({ data: updated })
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error });
  }
}


export const deleteDeveloper = async (req, res) => {
  try {
    const checkuser = await prisma.developer.findFirst({
      where: {
        id: req.params.id
      }
    })
    // console.log(req.user.id !== checkuser.userId)
    if (req.user.id !== checkuser.userId) {
      res.status(400).json({ 'message': "invalid user" })
    } else {
      const deleted = await prisma.developer.delete({
        where: {
          id: req.params.id
          // belongsToId: req.user.id
        },
      })
      res.json({ data: deleted })
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error });
  }
}
export const patchDev = async (req, res) => {
  const { id } = req.params;

  try {
    const existingProject = await prisma.developer.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return res.status(404).json({ error: 'Project not found' });
    }

    const updatedRating = existingProject.rating.concat(req.body.rating || []);
    const updatedTestimony = existingProject.testimonial.concat(req.body.testimonial || []);


    const updatedDev = await prisma.developer.update({
      where: {
        id,
      },
      data: {
        rating: updatedRating,
        testimonial: updatedTestimony
      },
    });

    res.json({ data: updatedDev });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};