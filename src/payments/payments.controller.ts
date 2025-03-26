import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentSessionDto } from './dto/paymants-session.dto';
import { Request, Response } from 'express';
import { MessagePattern } from '@nestjs/microservices';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

 
  @MessagePattern({cmd:'creat.payment.session'})
  createPaymentSession(paymentSessionDto:PaymentSessionDto){
    return this.paymentsService.createPaymentSession(paymentSessionDto);
  }

  @Get('success')
  success(){
    return{
      ok:true,
      message:'payment successful'
    }
  }
  @Get('cancelled')
  cancel(){
    return{
      ok:false,
      message:'payment cancelled'
    }
  }

  @Post('webhook')
  async stripeWebhook(@Req()req:Request,@Res()res:Response){
    return this.paymentsService.stripeWechook(req,res);
  }
}
