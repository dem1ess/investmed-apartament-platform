import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { AuthModule } from './auth/auth.module'
import { getJwtConfig } from './config/jwt.config'
import { FilesService } from './file.service'
import { PrismaService } from './prisma.service'
import { PropertyController } from './property/property.controller'
import { PropertyService } from './property/property.service'
import { PurchaseController } from './purchase/purchase.controller'
import { PurchaseService } from './purchase/purchase.service'
import { TransactionController } from './transaction/transaction.controller'
import { TransactionService } from './transaction/transaction.service'
import { UserModule } from './user/user.module'
import { BankDetailsModule } from './bank-details/bank-details.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService]
    }),
    ConfigModule.forRoot(),
    BankDetailsModule
  ],
  providers: [
    PrismaService,
    TransactionService,
    PropertyService,
    PurchaseService,
    FilesService
  ],
  controllers: [TransactionController, PropertyController, PurchaseController]
})
export class AppModule {}
