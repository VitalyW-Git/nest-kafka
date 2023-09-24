import {Body, Controller, Get, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {IPost} from "./interfaces/post.interface";
import {KafkaService} from "./kafka.service";

@Controller('posts')
export class PostsController {
  constructor(private kafkaService: KafkaService) {}

    @Post('/')
    appPost(@Body() post: IPost) {
        console.log(post)
      // emit - не дожидаемся ответа
        return this.kafkaService.client.send('add.new.post', post);
    }

    @Get('/')
    getList() {
      // emit - дожидаемся ответа (res, req)
      // data не может быть null или undefined
        return this.kafkaService.client.send('get.posts.list', '');
    }
}
