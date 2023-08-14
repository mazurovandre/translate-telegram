import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TOKEN'),
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
