import request from 'supertest';
import {app} from '../../app';
import { Ticket } from '../../models/ticket';

it('has a route handle listening to /api/tickets for post requests',async()=>{
    const response = await request(app).post('/api/tickets').send({});
    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in',async()=>{
    const response = await request(app).post('/api/tickets').send({}); 

    expect(response.status).toEqual(401);

});
it('return a status other than 401 if the user is signed in',async()=>{
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});
    console.log(response.status);
    expect(response.status).not.toEqual(401);
});
it('return an error if an invalid title is provided',async()=>{
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10
        })
        .expect(400);

});

it('returns an error if an invalid price is provided',async()=>{
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title:'Hary',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title:'potter',
        
        })
        .expect(400);

});

it('creates a ticket with valid parameters',async()=>{
    // add in a check to make sure a ticket was saved
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);
    const title = 'abcd';
    await request(app)
        .post('/api/tickets')
        .set('Cookie',global.signin())
        .send({
            title,
            price: 30
        })
        .expect(201);
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(30);
    expect(tickets[0].title).toEqual(title);
});