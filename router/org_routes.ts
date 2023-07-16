import {Router} from 'express'
import { body,validationResult } from 'express-validator'
import { handleInputErrors } from '../utils/middleware'
import { createProject, deleteProject, updateProject } from '../handlers/project'
import { createCompany, deleteCompany, getCompanies, updateCompany } from '../handlers/org'
import multer from 'multer';
import { patchDev } from '../handlers/dev'


const orgRouter = Router()
const upload = multer({ dest: 'tmp/' });


orgRouter.patch('/ratedev/:id',patchDev)
//////////////////////////////////////               Project            //////////////////////////////////////

orgRouter.get('/company',getCompanies)


orgRouter.post('/project/:id', 
body('project_name').isString(),
body('description').isString(),
body('timeframe').isString(),
body('technology').isArray(),
handleInputErrors, createProject)



orgRouter.put('/project/:id' , 
body('project_name').isString(),
body('description').isString(),
body('timeframe').isString(),
body('technology').isArray(),
handleInputErrors,updateProject)

orgRouter.delete('/project/:id' ,deleteProject)



orgRouter.post('/company' ,
upload.single('image'),
body('company_name').isString(),
body('location').isString(),
body('industry').isString(),
body('description').isString(),
handleInputErrors, createCompany)



orgRouter.put('/company/:id',
body('company_name').isString(),
body('location').isString(),
body('industry').isString(),
body('description').isString(),
handleInputErrors, updateCompany)
orgRouter.delete('/company/:id' ,deleteCompany)

export default orgRouter