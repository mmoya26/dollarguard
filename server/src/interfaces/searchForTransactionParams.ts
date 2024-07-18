import { IsNumberString } from "class-validator";

export class SearchForTransactionParams {
    @IsNumberString()
    year: string

    @IsNumberString()
    month: string
}