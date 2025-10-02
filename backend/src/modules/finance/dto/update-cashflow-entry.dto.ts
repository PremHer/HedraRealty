import { PartialType } from '@nestjs/mapped-types';

import { CreateCashflowEntryDto } from './create-cashflow-entry.dto';

export class UpdateCashflowEntryDto extends PartialType(CreateCashflowEntryDto) {}
