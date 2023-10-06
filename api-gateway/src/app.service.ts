import {Inject, Injectable} from '@nestjs/common';
import {IPost} from "./posts/interfaces/post.interface";
import {ClientKafka} from "@nestjs/microservices";


@Injectable()
export class AppService {
    constructor(
        @Inject('POST_SERVICE') private readonly clientKafka: ClientKafka,
    ) {}

    appPost(post: IPost) {
        console.log(post)
        // emit - не дожидаемся ответа
        return this.clientKafka.send('add.new.post', post);
    }

    getList() {
        // emit - дожидаемся ответа (res, req)
        // data не может быть null или undefined
        return this.clientKafka.send('get.posts.list', '');
    }
}
