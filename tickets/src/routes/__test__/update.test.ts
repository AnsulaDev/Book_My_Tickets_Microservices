import request from 'supertest';

import {app} from  '../../app';

import mongoose from 'mongoose';
const id = new mongoose.Types.ObjectId().toHexString();

it('returns a 404 if the provided id dose not exist ', async()=>{
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title:'asdfjk',
            price:20
        })
        .expect(404)
});
it('returns a 401 if the user id dose not authenticated ', async()=>{
    await request(app)
    .put(`/api/tickets/${id}`)
    .send({
        title:'asdfjk',
        price:20
    })
    .expect(401)

});
it('returns a 401 if the use does not own the ticket ', async()=>{

});
it('returns a 400 if the user provides an invalid title or price ', async()=>{

});

it('updates the ticket provided valid inputs', async()=>{

});