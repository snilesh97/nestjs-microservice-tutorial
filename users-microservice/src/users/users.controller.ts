import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersMicroserviceController {
  constructor(private usersService: UsersService) {}
  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto) {
    console.log(`data in UserService---${data.username}`);
    return this.usersService.createUser(data);
  }

  @MessagePattern({cmd: 'getUserById'})
  getUserById(@Payload() data: any){
    const { userId } = data;
    return this.usersService.getUserById(userId);
  }
  @EventPattern('paymentCreated')
  paymentCreated(@Payload() data: any) {
    console.log(data);
  }
}