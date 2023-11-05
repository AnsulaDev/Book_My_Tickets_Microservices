import { Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';

export const validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const erros = validationResult(req);//It checks if there are any validation errors based on the validation rules defined for the request.

    if(!erros.isEmpty()){//This line checks if the errors object is not empty, indicating that there are validation errors.
        throw new RequestValidationError(erros.array());
    }
    next();
};