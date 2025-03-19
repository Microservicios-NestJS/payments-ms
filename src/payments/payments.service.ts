import { Injectable } from '@nestjs/common';
import { envs } from 'src/config';
import Stripe from 'stripe';
import { PaymentSessionDto } from './dto/paymants-session.dto';
import { Request, Response } from 'express';
 

@Injectable()
export class PaymentsService { 

private readonly stripe= new Stripe(envs.stripe_secret);


async createPaymentSession(paymentSessionDto:PaymentSessionDto){

    const {currency,items,orderID}=paymentSessionDto;
    const lineItems= items.map(item=>{
     return   {price_data:{
            currency: currency,
            product_data:{
                name:item.name
            },
            unit_amount: Math.round(item.price*100)//esto es con decimales ya incluido tiene un /100 el cual lo convierte a 20.00
        },
        quantity: item.quantity
    }
    })
    const session = await this.stripe.checkout.sessions.create({
        payment_intent_data:{
            metadata:{
                orderId:orderID,
            }
        },
        line_items:lineItems, 
        mode:'payment',
        success_url: envs.stripe_success_url,
        cancel_url:envs.stripe_cancel_url,

    });

    return session;
}


async stripeWechook(req:Request,res:Response){
    const sig = req.headers['stripe-signature'] as string;
    let event:Stripe.Event;
    ///testing
    //const enpointSecret="whsec_eae5c78307bd69fa74c836a7e729d53ca32108e45d7629a12e8c8549fdf7594f";
    const enpointSecret= envs.stripe_enpointsecret;
    try {
        event = this.stripe.webhooks.constructEvent(
            req['rawBody'],
            sig,
            enpointSecret,
        );

    } catch (error) {
     res.status(400).send(`webhook Error: ${error.message}`);
     return;
    }

    console.log({event});
    switch(event.type){
        case 'charge.succeeded':
            const chargesucceded=event.data.object;
            console.log({
                metadata:chargesucceded.metadata
            });
            break;
            default:
                console.log(`event ${event.type} not hndled`);
    }

    return  res.status(200).json({sig});
}
}