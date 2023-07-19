import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { handleInputErrors } from '../utils/middleware'
import { patchProject } from '../handlers/project'
import { createDeveloper, deleteDeveloper, updateDeveloper } from '../handlers/dev'
import multer from 'multer';
import { patchBusiness } from '../handlers/org'


const userRouter = Router()
const upload = multer({ dest: 'tmp/' });

///////////////////////////////////////////       Project            //////////////////////////////////
userRouter.patch('/project/:id',
    body('devlist').isString(),
    handleInputErrors, patchProject)


userRouter.patch('rateorg/:id', patchBusiness)
///////////////////////////////////////         Developer Routes            ///////////////////////////

userRouter.post('/dev',
    upload.single('image'),
    body('dev_fname').isString(),
    body('dev_lname').isString(),
    body('skills').isArray(),
    body('bio').isString(),
    body('background').isString(),
    body('portfolio_link').optional(),
    body('address').optional(),
    body('phone').optional(),
    body('email').optional(),
    handleInputErrors, createDeveloper)

userRouter.put('/dev/:id',
    body('dev_fname').isString(),
    body('dev_lname').isString(),
    body('skills').isArray(),
    body('bio').isString(),
    body('background').isString(),
    body('portfolio_link').optional(),
    body('address').optional(),
    body('phone').optional(),
    body('email').optional(),
    handleInputErrors, updateDeveloper)

userRouter.delete('/dev/:id', deleteDeveloper)
// router.patch('/dev/:id' ,updateDev, ()=>{})

export default userRouter