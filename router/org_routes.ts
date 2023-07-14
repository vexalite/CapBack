import {Router} from 'express'
import { body,validationResult } from 'express-validator'
import { handleInputErrors } from '../utils/middleware'
import { createProject, deleteProject, updateProject } from '../handlers/project'
import { createCompany, deleteCompany, updateCompany } from '../handlers/org'



const orgRouter = Router()

//////////////////////////////////////               Project            //////////////////////////////////////


orgRouter.post('/project/:id', 
body('project_name').isString(),
body('description').isString(),
body('timeframe').isString(),
// body('technology').isString(),
handleInputErrors, createProject)



orgRouter.put('/project/:id' , 
body('project_name').isString(),
body('description').isString(),
body('timeframe').isString(),
body('technology').isString(),
handleInputErrors,updateProject)

orgRouter.delete('/project/:id' ,deleteProject)



orgRouter.post('/company' ,
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