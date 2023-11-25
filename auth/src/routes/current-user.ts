import express from 'express';
import {currentUser} from '@ansulatickets/common';
const router = express.Router();

router.get('/api/users/currentuser', currentUser,(req, res) => {
    /* if the request does not flow through that cookie session
    middleware, then the session property will not be set. */
    res.send({currentUser: req.currentUser || null});
});

export { router as currntUserRouter};