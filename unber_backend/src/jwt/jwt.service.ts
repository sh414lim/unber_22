import { Inject, Injectable } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { CONFIG_OPTIONS } from 'src/common/common.constants';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    private readonly configService: ConfigService,
  ) {}

  allProjectSign(payload: object): string {
    // other project use
    return jwt.sign(payload, this.configService.get('PRIVATE_KEY'));
  }

  sign(userId: number): string {
    // custom
    return jwt.sign({ id: userId }, this.configService.get('PRIVATE_KEY'));
  }

  //암호 해독
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
