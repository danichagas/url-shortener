import { IsNotEmpty, IsUrl } from "class-validator";

export class CreateUrlDto {
    @IsNotEmpty({ message: 'The original URL cannot be empty' })
    @IsUrl({}, { message: 'The provided string must be a valid URL' })
    originalUrl!: string
}