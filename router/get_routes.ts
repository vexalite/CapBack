import {Router} from 'express'
import { getCompanies, getDevelopers, getProjects } from '../handlers/get'
import { getOneProject } from '../handlers/project'
import { getOneDeveloper } from '../handlers/dev'
import { getOneCompany } from '../handlers/org'


const getRouter = Router()
getRouter.get('/project' , getProjects)
getRouter.get('/dev' ,getDevelopers)
getRouter.get('/company' ,getCompanies,(req,res)=>{
     res.json({message:"get done"})
})
getRouter.get('/project/:id' ,getOneProject)
getRouter.get('/dev/:id' ,getOneDeveloper)
getRouter.get('/company/:id' ,getOneCompany)



// getRouter.get('/company?name=asc', getAscCompanies)
// getRouter.get('/project?name=asc', getAscProjects)
// getRouter.get('/dev?name=asc', getAscDevelopers)
// getRouter.get('/company?name=desc', getDescCompanies)
// getRouter.get('/dev?name=desc', getDescDevelopers)
export default getRouter