import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import  request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';
declare global {
    var signin: () => string[];
}

let mongo: any;

beforeAll( async () => {
    process.env.JWT_KEY = 'asdfadf';
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach( async ()=> {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});

    }
});

afterAll(async () => {
    if (mongo) {
        await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin = () =>{

    const payload ={
        id:'1lk24j124l',
        email:'test@test.com'
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);
    const session = {jwt: token};

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');


    // const email = 'testing@gmail.com';
    // const password = 'password';

    // const response = await request(app)
    //     .post('/api/users/signup')
    //     .send({
    //         email,
    //         password
    //     })
    //     .expect(201)
    
    // const cookie = response.get('Set-Cookie');

    // return cookie;
    return  [`session=${base64}`];
}
