import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ShiftsModule } from './shifts/shifts.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './common/middleware/jwt.middleware';
import { UsersController } from './users/users.controller';
import { RoleMiddleware } from './common/middleware/role.middleware';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), JwtModule.register({
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '1h' },
  }),
    AuthModule, UsersModule, ShiftsModule, AssignmentsModule],
  controllers: [AppController],
  providers: [AppService],

})
// export class AppModule {  configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes(UsersController); 

//   } }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        ('users')
      );
    consumer
      .apply(RoleMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET })
  }
}