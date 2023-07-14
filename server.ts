
import express from 'express'
import cors from 'cors'
import { body } from 'express-validator'
import { createNewUser, signin } from './utils/user_auth_logic';
import { handleInputErrors } from './utils/middleware';
import { createNewCompany, signinCompany } from './utils/org_auth_logic';
import { protect } from './utils/auth';
import orgRouter from './router/org_routes';
import getRouter from './router/get_routes';
import { orgProtect } from './utils/org_auth';
import userRouter from './router/user_routes';

const app = express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
// app.use('/api',protect, router,getrouter,comprouter)


//User routes

app.post('/user/signup',
body('username').isString(),
body('password').isString(),
handleInputErrors,createNewUser)
app.post('/user/signin',
body('username').isString(),
body('password').isString(),
handleInputErrors,signin)
//Company routes
app.post('/company/signup',
body('username').isString(),
body('password').isString(),
handleInputErrors,createNewCompany)
app.post('/company/signin',
body('username').isString(),
body('password').isString(),
handleInputErrors,signinCompany)


app.get('/', (req, res) =>{
     console.log('hello from server')
     res.status(200)
     res.json({message:'holla 😃'})
     console.log(req.body)
})
app.post('/', (req, res) =>{
     console.log(req.body)
     res.json({message:'post done'})
})

app.use('/o/api',orgProtect,orgRouter)
app.use('/u/api',protect, userRouter)
app.use('/api', getRouter)

export default app;