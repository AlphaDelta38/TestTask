import { Module } from '@nestjs/common';
import { CurrencySwitchService } from './currency-switch.service';

@Module({
  providers: [CurrencySwitchService],
  exports: [CurrencySwitchService]
})
export class CurrencySwitchModule {}
