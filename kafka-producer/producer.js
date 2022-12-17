//import { Kafka } from 'kafkajs'
//import {randomUUID} from 'crypto'
const {Kafka} = require("kafkajs")
const {randomUUID} = require("crypto")

async function main() {
const kafka = new Kafka({
    clientId: "kafka-producer",
    brokers: ['upright-oarfish-13385-us1-kafka.upstash.io:9092'],
    sasl: {
        mechanism: 'scram-sha-256',
        username:
            'dXByaWdodC1vYXJmaXNoLTEzMzg1JLlU8lZWlgF7gXelLvl82JgrXhaoHSGbDac',
        password:
            'aSMn02Z30tVY4iAH-lQrSgx2Fs4NfHOWx9kf2soyN1t1c53mDEEm99U5libhMJXZ2phKkQ==',
    },
    ssl: true,
})

const producer = kafka.producer()

await producer.connect()
await producer.send({
    topic: 'notifications.send-notification',
    messages: [
        {
            value: JSON.stringify({
                content: "nova solicitação",
                category: "social",
                recipientId: randomUUID()
            })
        },
    ],
})

await producer.disconnect()

}

main()