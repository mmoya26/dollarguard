import { IsNumberString } from "class-validator";

export class SearchForExpensesParams {
    @IsNumberString()
    year: string

    @IsNumberString()
    month: string
}