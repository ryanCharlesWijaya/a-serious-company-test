import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
	constructor(
		@Inject('USER_REPOSITORY')
		private userRepository: Repository<User>,
		private jwtService: JwtService
	) { }

	async authenticateByEmailAndPassword(email: string, password: string) {
		const user = await this.userRepository.findOne({
			where: {
				email: email,
				password: password,
			}
		});

		if (user?.password !== password) throw new UnauthorizedException();

		const payload = { sub: user.id, email: user.email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async registerNewUser(userData: Record<string, any>): Promise<User> {
		const user = await this.userRepository.create({
			email: userData.email,
			name: userData.name,
			password: userData.password,
			created_at: userData.created_at,
			updated_at: userData.updated_at,
		});

		await this.userRepository.save(user);

		return user;
	}
}
