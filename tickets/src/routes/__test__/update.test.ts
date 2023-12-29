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
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title:'aslksd',
            price:20
        });
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie',global.signin())
        .send({
            title:'adfagad',
            price:100
        })
        .expect(401);

});
it('returns a 400 if the user provides an invalid title or price ', async()=>{
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title:'aslksd',
            price:20
        });
    
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title:'',
            price:20
        })
        .expect(400);
    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({
            title:'asdasfas',
            price:-10
        })
        .expect(400);

});

it('updates the ticket provided valid inputs', async()=>{
    const cookie = global.signin();
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title:'aslksd',
            price:20
        });


    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie',cookie)
        .send({
            title:'title',
            price:1000
        })
        .expect(200);
    
    const ticketResponse = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send();

    expect(ticketResponse.body.title).toEqual('title');
    expect(ticketResponse.body.price).toEqual(1000);
    

});