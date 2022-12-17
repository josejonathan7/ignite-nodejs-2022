import { Module } from '@nestjs/common';
import { SendNotification } from '@app/useCases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/useCases/cancelNotification';
import { CountRecipientNotification } from '@app/useCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@app/useCases/getRecipientNotification';
import { ReadNotification } from '@app/useCases/readNotifications';
import { UnreadNotification } from '@app/useCases/unreadNotification';

@Module({
	imports: [DatabaseModule],
	controllers: [NotificationsController],
	providers: [
		SendNotification,
		CancelNotification,
		CountRecipientNotification,
		GetRecipientNotifications,
		ReadNotification,
		UnreadNotification,
	],
})
export class HttpModule {}
