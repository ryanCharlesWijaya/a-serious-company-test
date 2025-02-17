import { Body, Controller, Inject, Post } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor (
        private authService: AuthService
    ) {}

    @Post("/api/auth/login")
    public async login(
        @Body() requestDto: Record<string, any>
    ) : Promise<Record<string, any>> 
    {
        const result = await this.authService.authenticateByEmailAndPassword(requestDto.email, requestDto.password);

        return {
            message: "success",
            data: {
                access_token: result.access_token
            }
        };
    }

    @Post("/api/auth/register")
    public async register(
        @Body() requestDto: Record<string, any>
    ) : Promise<Record<string, any>> 
    {
        const user = await this.authService.registerNewUser(requestDto);

        return {
            message: "success",
            data: user
        };
    }
}
