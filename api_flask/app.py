from asyncworker import App, RouteTypes
from asyncworker.options import Options, Events, Actions

app = App("localhost", "guest", "guest", 5000)


@app.route(
    ["items"],
    type=RouteTypes.AMQP_RABBITMQ,
    options={Options.BULK_SIZE: 2014, Events.ON_EXCEPTION: Actions.REJECT},
)
async def check(msgs):
    for m in msgs:
        print(m.body)
        1 / 0