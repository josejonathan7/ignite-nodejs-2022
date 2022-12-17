import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService
	extends ServerKafka
	implements OnModuleDestroy
{
	constructor() {
		super({
			client: {
				clientId: 'notifications',
				brokers: ['upright-oarfish-13385-us1-kafka.upstash.io:9092'],
				sasl: {
					mechanism: 'scram-sha-256',
					username:
						'dXByaWdodC1vYXJmaXNoLTEzMzg1JLlU8lZWlgF7gXelLvl82JgrXhaoHSGbDac',
					password:
						'aSMn02Z30tVY4iAH-lQrSgx2Fs4NfHOWx9kf2soyN1t1c53mDEEm99U5libhMJXZ2phKkQ==',
				},
				ssl: true,
			},
		});
	}
	async onModuleDestroy() {
		await this.close();
	}
}
