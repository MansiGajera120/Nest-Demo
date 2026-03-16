import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { PostModule } from './post/post.module';
import { ChallengeModule } from './challenge/challenge.module';
import { AdminModule } from './admin/admin.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://node_demo_vkg6_user:kB6kTqvq1qZMlV5VWWbkK5sP5ayIMeIf@dpg-d6rombpj16oc73earrt0-a.oregon-postgres.render.com/node_demo_vkg6',
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    UserModule,
    OtpModule,
    PostModule,
    ChallengeModule,
    AdminModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
