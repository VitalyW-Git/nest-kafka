import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Injectable()
export class KafkaService implements OnModuleInit {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'posts',
        // brokers: ['localhost:9092'],
        brokers: ['localhost:9093']
      },
      consumer: {
        groupId: 'posts-consumer'
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('add.new.post');
    this.client.subscribeToResponseOf('get.posts.list');
    await this.client.connect();
  }
}