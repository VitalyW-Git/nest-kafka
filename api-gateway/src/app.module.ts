import {Module} from '@nestjs/common';
import {PostsController} from './posts/posts.controller';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {AppService} from "./app.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'POST_SERVICE',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'posts',
                        brokers: ['localhost:9093'],
                    },
                    consumer: {
                        groupId: 'posts-consumer',
                    },
                },
            },
        ]),
    ],
    controllers: [PostsController],
    providers: [AppService],
})
export class AppModule {
}
