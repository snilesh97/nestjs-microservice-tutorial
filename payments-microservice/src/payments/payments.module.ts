import { Module } from "@nestjs/common";
import { PaymentsMicroServiceController } from "./payments.controller";
import { NatsClientModule } from "src/nats-client/nats-client.module";
import { PaymentsService } from "./payments.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Payment } from "src/typeorm/entities/Payment";
import { User } from "src/typeorm/entities/User";

@Module({
  imports: [NatsClientModule,
  TypeOrmModule.forFeature([Payment, User])],
  controllers: [PaymentsMicroServiceController],
  providers: [PaymentsService]
})

export class PaymentsModule {}