import express from 'express'
import cors from 'cors'
import cookieParsers from 'cookie-parser'

const app  = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit:"16kb"})) //if anyone send data in JSON formate then we do that 
app.use(express.urlencoded({extended: true, limit:"16kb"})) //if anyone send data in URl formate then we do that 
app.use(express.static("public")) // sometime we store any pdf,img, etc so we can access through our (public/ or your choice ) dir which i make
app.use(cookieParsers()) //this cookies is used only by server and int client requests we store the cookies


export {app}  