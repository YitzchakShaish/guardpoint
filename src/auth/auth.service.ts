import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';



@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signup(signupDto: SignupDto) {
    // Hash the password before saving
    signupDto.password =  await hashPassword(signupDto.password);
    return this.usersService.create(signupDto);
  }

async login(loginDto: LoginDto): Promise<{ message: string; token?: string }> {
  const user = this.usersService.findOne(loginDto.username);
  if (!user) {
    return { message: 'Invalid credentials' };
  }

  const isMatch = await comparePassword(loginDto.password, user.password);
  if (!isMatch) {
    return { message: 'Invalid credentials' };
  }

  const token = createJwtToken(user, this.jwtService);
  if (!token) {
    throw new InternalServerErrorException('Failed to create token');
  }

  return { message: 'Login successful', token };
}

}


function createJwtToken(user: any, jwtService: JwtService): string | null {
  try {
    const payload = { username: user.username, role: user.role };
    return jwtService.sign(payload);
  } catch (error) {
    console.error('Error creating JWT token:', error);
    return null;
  }
}

function hashPassword(password: string): Promise<string> {
  return hash(password, 10);
} 


function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  return compare(password, hashedPassword);
}
