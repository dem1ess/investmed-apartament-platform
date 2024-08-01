import { Module } from '@nestjs/common'
import { MailService } from './MailService'

@Module({
  providers: [MailService],
  exports: [MailService] // Export MailService to be used in other modules
})
export class MailModule {}
