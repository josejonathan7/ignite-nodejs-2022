import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepositorie';
import { SendNotification } from './sendNotification';

describe('Send Notification', () => {
	it('should be able to send a notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const sendNotification = new SendNotification(notificationsRepository);

		const { notification } = await sendNotification.execute({
			category: 'social',
			content: 'testing',
			recipientId: 'recep',
		});

		expect(notificationsRepository.notifications).toHaveLength(1);
		expect(notificationsRepository.notifications[0]).toEqual(notification);
	});
});
