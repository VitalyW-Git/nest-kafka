import { Module } from '@nestjs/common';
import { PostsController } from './posts/posts.controller';
import {KafkaService} from "./posts/kafka.service";

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [KafkaService],
})
export class AppModule {}
