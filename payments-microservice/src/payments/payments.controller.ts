import { Controller, Inject} from "@nestjs/common";
import { CreatePaymentDto } from "./dtos/CreatePayment.dto";
import { EventPattern, Payload } from "@nestjs/microservices";
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsService } from "./payments.service";
import { InjectRepository } from "@nestjs/typeorm";

@Controller()
export class PaymentsMicroServiceController {

  constructor(
   @Inject('NATS_SERVICE') private natsClient: ClientProxy,
   private paymentsService:  PaymentsService
  ) {}
  @EventPattern('createPayment')
  async createPayment(@Payload() createPaymentDto: CreatePaymentDto) {
    console.log(createPaymentDto);
    const newPayment = await this.paymentsService.createPayment(createPaymentDto);
    if (newPayment) {
    this.natsClient.emit('paymentCreated', newPayment);
  }
  }
}