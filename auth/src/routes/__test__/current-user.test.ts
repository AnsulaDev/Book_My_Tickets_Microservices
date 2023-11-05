import request from 'supertest';
import { app } from '../../app';


it('clears the cookie after signin after sign out', async()=>{
    const cookie = await global.signin();
    
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser.email).toEqual('testing@gmail.com');

});


it('responds with null if the user is not authenticated', async()=>{
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});