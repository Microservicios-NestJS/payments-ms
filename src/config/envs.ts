
import 'dotenv/config';
import * as joi  from 'joi';


interface EnvVars{
    PORT:Number;
    STRIPE_SECRET: string;
    STRIPE_SUCCESS_URL:string,
    STRIPE_CANCEL_URL:string,
    STRIPE_ENPOINTSECRET:string,
}

const envScherma= joi.object({
    PORT:joi.number().required(),
    STRIPE_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
    STRIPE_ENPOINTSECRET: joi.string().required(),
})
.unknown(true);


const {error,value} =envScherma.validate(process.env);

if(error){
    throw new Error(`config validation error ${error.message } `);

}

const envVars: EnvVars= value;

export const envs= {
    port:envVars.PORT,
    stripe_secret: envVars.STRIPE_SECRET,
    stripe_success_url:envVars.STRIPE_SUCCESS_URL,
    stripe_cancel_url:envVars.STRIPE_CANCEL_URL,
    stripe_enpointsecret:envVars.STRIPE_ENPOINTSECRET,
}