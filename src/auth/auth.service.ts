import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDto } from './Dto/RegisterUserDto';
import { buildResponse } from 'helper/buildResponse';
import { hash, compare } from 'bcrypt';
import { getCurrentLocalTime } from 'helper/date-helper';
import { LoginDto } from './Dto/LoginDto';
import { JwtService } from '@nestjs/jwt';
import { jwt_config } from 'src/config/jwt_config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async RegisterUserService(data: RegisterUserDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        userId: data.userId,
      },
    });

    if (checkUserExists) {
      throw new HttpException(
        buildResponse(null, 'User Already Registered', HttpStatus.FOUND),
        HttpStatus.FOUND,
      );
    }

    data.password = await hash(data.password, 12);
    const currentDateTime = getCurrentLocalTime();
    const createUser = await this.prisma.user.create({
      data: {
        userId: data.userId,
        name: data.name,
        password: data.password,
        role: data.role,
        phoneNumber: data.phoneNumber,
        createdAt: currentDateTime,
        updatedAt: currentDateTime,
      },
    });

    if (createUser) {
      return buildResponse(createUser, 'Register Successful', HttpStatus.OK);
    } else {
      return buildResponse(null, 'Please check data', HttpStatus.BAD_REQUEST);
    }
  }

  async login(data: LoginDto) {
    const checkUserExists = await this.prisma.user.findFirst({
      where: {
        userId: data.userId,
      },
      include: {
        Guru: true,
        Murid: true,
        Admin: true,
      },
    });

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(
      data.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      const accessToken = this.generateJWT({
        sub: checkUserExists.id,
        userId: checkUserExists.userId,
        name: checkUserExists.name,
        phoneNumber: checkUserExists.phoneNumber,
      });

      return buildResponse(
        { accessToken, user: checkUserExists },
        'Login successful',
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async ProfileDetailService(userId: any) {
    const Id = userId.id;
    const getProfileDetail = await this.prisma.user.findFirst({
      where: {
        id: Id,
      },
      include: {
        Guru: true,
        Murid: true,
        Admin: true,
      },
    });

    if (getProfileDetail) {
      return buildResponse(
        getProfileDetail,
        'Data Profile berhasil di muat',
        HttpStatus.OK,
      );
    } else {
      throw new HttpException(
        'Data Profile gagal di muat',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: jwt_config.expired,
    });
  }
}
