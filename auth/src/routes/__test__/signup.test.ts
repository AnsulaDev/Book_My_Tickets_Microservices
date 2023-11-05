import request from 'supertest';
import { app } from '../../app';

it('return a 201 on successful signup', async()=>{
    return request(app)
        .post('/api/users/signup')
        .send({
            email:'testing@gmail.com',
            password:'password'
        })
        .expect(201);
});

it('returns a 400 with an invalid email',async () =>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email:'dadhaauwa',
        password:'password'
    })
    .expect(400);
});

it('returns a 400 with an invalid password',async () =>{
    return request(app)
    .post('/api/users/signup')
    .send({
        email:'dadhaauwa',
        password:'p'
    })
    .expect(400);
});

it('returns a 400 with missing email and password',async () =>{
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'testing@gmail.com'
    })
    .expect(400);

    await request(app)
    .post('/api/users/signup')
    .send({
        password:'adadfesf'
    })
    .expect(400);
});

it('ban from using duplicate emails', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'testing@gmail.com',
            password:'password'
        })
        .expect(201);
    
    await request(app)
        .post('/api/users/signup')
        .send({
            email:'testing@gmail.com',
            password:'password'
        })
        .expect(400);  
});

it('sets a cookie after successful signup', async()=>{
    const response =  await request(app)
        .post('/api/users/signup')
        .send({
            email:'testing@gmail.com',
            password:'password'
        })
        .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
});