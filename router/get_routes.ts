import {Router} from 'express'
import { filterCss, filterDocker, filterHtml, filterJava, filterJs, filterMongodb, filterNode, filterPCss, filterPDocker, filterPHtml, filterPJava, filterPJs, filterPMongodb, filterPNode, filterPPython, filterPReact, filterPUiux, filterPython, filterReact, filterUiux, getAscCompanies, getAscDevelopers, getAscProjects, getBusinesses, getDescCompanies, getDescDevelopers, getDescProjects, getDevelopers, getPriceAscDevelopers, getPriceAscProjects, getPriceDescDevelopers, getPriceDescProjects, getProjects } from '../handlers/get'
import { getOneProject } from '../handlers/project'
import { getOneDeveloper } from '../handlers/dev'
import { getOneCompany } from '../handlers/org'


const getRouter = Router()
//get all
getRouter.get('/project' , getProjects)
getRouter.get('/dev' ,getDevelopers)
getRouter.get('/business' ,getBusinesses)


//sort company
getRouter.get('/company/sort=asc', getAscCompanies)
getRouter.get('/company/sort=desc', getDescCompanies)
//sort developers
getRouter.get('/dev/sort=asc', getAscDevelopers)
getRouter.get('/dev/sort=desc', getDescDevelopers)
getRouter.get('/dev/price=asc', getPriceAscDevelopers)
getRouter.get('/dev/price=desc', getPriceDescDevelopers)
//sort projects
getRouter.get('/project/sort=asc', getAscProjects)
getRouter.get('/project/sort=desc', getDescProjects)
getRouter.get('/project/price=asc', getPriceAscProjects)
getRouter.get('/project/price=desc', getPriceDescProjects)

//developer skill filter 
getRouter.get('/dev/filter=java', filterJava)
getRouter.get('/dev/filter=python', filterPython)
getRouter.get('/dev/filter=html', filterHtml)
getRouter.get('/dev/filter=css', filterCss)
getRouter.get('/dev/filter=node', filterNode)
getRouter.get('/dev/filter=react', filterReact)
getRouter.get('/dev/filter=javascript', filterJs)
getRouter.get('/dev/filter=mongodb', filterMongodb)
getRouter.get('/dev/filter=uiux', filterUiux)
getRouter.get('/dev/filter=docker', filterDocker)

//project technology filter
getRouter.get('/project/filter=python', filterPPython)
getRouter.get('/project/filter=java', filterPJava)
getRouter.get('/project/filter=html', filterPHtml)
getRouter.get('/project/filter=css', filterPCss)
getRouter.get('/project/filter=node', filterPNode)
getRouter.get('/project/filter=react', filterPReact)
getRouter.get('/project/filter=javascript', filterPJs)
getRouter.get('/project/filter=mongodb', filterPMongodb)
getRouter.get('/project/filter=uiux', filterPUiux)
getRouter.get('/project/filter=docker', filterPDocker)


//get one
getRouter.get('/dev/:id' ,getOneDeveloper)
getRouter.get('/project/:id' ,getOneProject)
getRouter.get('/company/:id' ,getOneCompany)
export default getRouter