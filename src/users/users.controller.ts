import { CreateUserDto } from './dto/create-user.dto';
import { LoggedInGuard } from './../auth/Login.guard';
import { NotLoggedInGuard } from './../auth/NotLogin.guard';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(NotLoggedInGuard)
  @Post()
  async join(@Body() createUser: CreateUserDto) {
    return this.usersService.register(createUser);
  }

  @UseGuards(NotLoggedInGuard)
  @Post('login')
  async login(
    @Body('businessNumber') businessNumber,
    @Body('password') password,
    @Session() session: Record<string, any>,
  ) {
    const result = await this.usersService.login(businessNumber, password);
    if (result) {
      session.login = true;
      session.user = result.id;
      return true;
    } else {
      throw new ForbiddenException('error');
    }
  }

  @UseGuards(LoggedInGuard)
  @Get()
  async userProfile(@Session() session: Record<string, any>) {
    return this.usersService.getUser(session.user);
  }

  @UseGuards(LoggedInGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id) {
    return this.usersService.deleteUser(id);
  }
}
