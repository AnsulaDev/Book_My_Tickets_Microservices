import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface UserPayload{
    id: string;
    email: string;
}

declare global{ /*this is how we can reach into an existing 
type definition and make a modification to it.*/
namespace Express{
        interface Request{
            currentUser?: UserPayload;
        }
    }
}
export const currentUser = (
    req:Request, 
    res:Response,
    next:NextFunction
    ) =>{
        if(!req.session?.jwt){/*
        !req.session || !req.session.jwt is equal to 
        to this !req.session?.jwt in typeScript(if some internal property actually
        exists or not.) Or if we do not have a session object or if
        JWT is not defined, we want to return and move on to the
        next middleware inside of our chain. */
        return next();

        }
        try{
            const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
            req.currentUser = payload;
        }catch(err){

        }
        next();
    }