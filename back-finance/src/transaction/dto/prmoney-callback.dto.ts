import { IsString } from 'class-validator'

export class CallbackDto {
  @IsString()
  payment: string
}
