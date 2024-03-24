import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { Payment } from './typeorm/entities/Payment';

@Module({
  imports: [UsersModule,
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'mysql_db',
    port: 3307,
    database: 'nestjs_db',
    entities: [User, Payment],
    synchronize: true,
    username: 'testuser',
    password: 'testuser123'
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
