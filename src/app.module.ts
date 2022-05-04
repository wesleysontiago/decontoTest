import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolhaRepository } from './Repository/folha-repository';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, FolhaRepository],
})
export class AppModule {}
