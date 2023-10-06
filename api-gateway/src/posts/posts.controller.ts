import {Body, Controller, Get, Inject, OnModuleDestroy, OnModuleInit, Post} from '@nestjs/common';
import {Client, ClientKafka, Transport} from "@nestjs/microservices";
import {IPost} from "./interfaces/post.interface";
import {AppService} from "../app.service";

@Controller('posts')
export class PostsController implements OnModuleInit, OnModuleDestroy {
    constructor(
        private readonly appService: AppService,
        @Inject('POST_SERVICE') private readonly clientKafka: ClientKafka,
    ) {}

    async onModuleInit() {
        this.clientKafka.subscribeToResponseOf('add.new.post');
        this.clientKafka.subscribeToResponseOf('get.posts.list');
    }
    async onModuleDestroy() {
        await this.clientKafka.close();
    }

    @Post('/')
    appPost(@Body() post: IPost) {
      // emit - не дожидаемся ответа
      //   return this.kafkaService.client.send('add.new.post', post);
        return this.appService.appPost(post);
    }

    @Get('/')
    getList() {
      // emit - дожидаемся ответа (res, req)
      // data не может быть null или undefined
      //   return this.kafkaService.client.send('get.posts.list', '');
        return this.appService.getList();
    }
}
