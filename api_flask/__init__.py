import pika
import json

print(' [*] Connecting to server ...')
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue='task_queue', durable=False)

print(' [*] Waiting for messages.')

def callback(ch, method, properties, body):
    data = json.loads(body)
    print(data)
    return data


channel.basic_qos(prefetch_count=1)
channel.basic_consume(queue='task_queue', auto_ack=True, on_message_callback=callback)
channel.start_consuming()