import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { NastModule } from 'src/nast/nast.module';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports:[NastModule],
})
export class PaymentsModule {}
