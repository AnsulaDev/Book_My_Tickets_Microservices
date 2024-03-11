import nats, { Message} from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();



const stan = nats.connect('ticketing',randomBytes(4).toString('hex'),{
    url:'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log('Listener connectec to NATS');

    stan.on('close', ()=> {
        console.log('NATS connection closed!');
        process.exit();
    });

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)//to avoid default behaviours of nats streaming
        .setDeliverAllAvailable()//we can get all the events that have been emitted in the past
        .setDurableName('accounting-service');//to make sure that we keep track of all the different events
    const subscription = stan.subscribe(
        'ticket:created',
        'queue-group-name',/*to make sure that we do not accidentally dump the
                                durable names even if all of our 
                                services restart for a brief period of time */
        options
        );

    subscription.on('message', (msg:Message) =>{
        const data = msg.getData();//to get data from publisher

        if(typeof data ==='string'){
            console.log(`Recieved event #${msg.getSequence()}, with data:${data}}`)
        }

        msg.ack();

    })
});


//these are watching interupt signals
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());