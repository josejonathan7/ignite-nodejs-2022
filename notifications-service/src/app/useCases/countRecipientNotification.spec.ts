import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepositorie';
import { CountRecipientNotification } from './countRecipientNotifications';

describe('Count Recipient Notification', () => {
	it('should be able to count recipient notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const countRecipientNotification = new CountRecipientNotification(
			notificationsRepository,
		);

		await notificationsRepository.create(
			makeNotification({ recipientId: 'example' }),
		);

		await notificationsRepository.create(
			makeNotification({ recipientId: 'example' }),
		);

		await notificationsRepository.create(
			makeNotification({ recipientId: 'example2' }),
		);

		const { count } = await countRecipientNotification.execute({
			recipientId: 'example',
		});

		expect(count).toEqual(2);
	});
});
