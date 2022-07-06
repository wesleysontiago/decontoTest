# example_consumer.py
import pika, os, time, requests, json

def pdf_process_function(msg):
    data = json.loads(msg)
    print(data)
    response = requests.post("http://127.0.0.1:5000/msg", json=data, headers={'Content-type': 'application/json'})
    print(response)
    print(" Processing finished");
    return;

# Access the CLODUAMQP_URL environment variable and parse it (fallback to localhost)
url = os.environ.get('CLOUDAMQP_URL', 'amqp://guest:guest@localhost:5672/%2f')
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel() # start a channel
channel.queue_declare(queue='task_queue') # Declare a queue

# create a function which is called on incoming messages
def callback(ch, method, properties, body):
    pdf_process_function(body)

# set up subscription on the queue
channel.basic_consume('task_queue', callback, auto_ack=True)

# start consuming (blocks)
channel.start_consuming()
connection.close()