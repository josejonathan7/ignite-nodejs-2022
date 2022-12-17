import { SendNotification } from '@app/useCases/sendNotification';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './kafka/controllers/notification.controller';
import { KafkaConsumerService } from './kafka/kafkaConsumer.service';

@Module({
	imports: [DatabaseModule],
	providers: [KafkaConsumerService, SendNotification],
	controllers: [NotificationsController],
})
export class MessagingModule {}
