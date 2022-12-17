import { makeNotification } from '@test/factories/notificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepositorie';
import { GetRecipientNotifications } from './getRecipientNotification';

describe('Get Recipient Notification', () => {
	it('should be able to get recipient notification', async () => {
		const notificationsRepository = new InMemoryNotificationsRepository();
		const getRecipientNotifications = new GetRecipientNotifications(
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

		const { notifications } = await getRecipientNotifications.execute({
			recipientId: 'example',
		});

		expect(notifications).toHaveLength(2);
		expect(notifications).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ recipientId: 'example ' }),
				expect.objectContaining({ recipientId: 'example ' }),
			]),
		);
	});
});
