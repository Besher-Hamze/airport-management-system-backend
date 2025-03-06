import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShamModule } from './sham/sham.module';
import { EmiratesModule } from './emirates/emirates.module';
import { QatarModule } from './qatar/qatar.module';
import { AirportsModule } from './airports/airports.module';
import envConfig from './config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    
    // MongoDB connection for Sham Airport
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      connectionName: 'sham',
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('mongodb.uri'),
        dbName: configService.get<string>('mongodb.database'),
      }),
    }),
    
    // PostgreSQL connection for Emirates Airport
    TypeOrmModule.forRootAsync({
      name: 'emirates',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('postgres.host'),
        port: configService.get<number>('postgres.port'),
        username: configService.get<string>('postgres.username'),
        password: configService.get<string>('postgres.password'),
        database: configService.get<string>('postgres.database'),
        entities: ['dist/emirates/entities/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('postgres.synchronize'),
      }),
    }),
    
    // MySQL connection for Qatar Airport
    TypeOrmModule.forRootAsync({
      name: 'qatar',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('mysql.host'),
        port: configService.get<number>('mysql.port'),
        username: configService.get<string>('mysql.username'),
        password: configService.get<string>('mysql.password'),
        database: configService.get<string>('mysql.database'),
        entities: ['dist/qatar/entities/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('mysql.synchronize'),
      }),
    }),
    
    // Application modules
    AirportsModule,
    ShamModule,
    EmiratesModule,
    QatarModule,
    // AuthModule,
    // UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}