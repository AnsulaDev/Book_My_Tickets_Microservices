import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest,BadRequestError } from '@ansulatickets/common';
import { Password } from '../services/password';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('You must apply a password')
    ],
    validateRequest,
async(req: Request, res: Response) => {
    const { email, password} = req.body;

    const existingUser = await User.findOne({ email });//to find existing email
    if(!existingUser){//if email doesnt exist it's gonna throw errors
        throw new BadRequestError('Invalid credentials');
    }
    const passwordsMatch = await Password.compare( //to compare stored password and currently entered password
        existingUser.password, 
        password);
    if(!passwordsMatch){// if password doesnt match it,s gonna throw errors
        throw new BadRequestError('Invalid Credentials');
    }

     //generate JWT
    const userJwt = jwt.sign({
        id: existingUser.id,
        email: existingUser.email
    }, process.env.JWT_KEY!);

    //store it on session object
    req.session = {
        jwt: userJwt
    };
    res.status(200).send(existingUser);

});

export { router as signinRouter};