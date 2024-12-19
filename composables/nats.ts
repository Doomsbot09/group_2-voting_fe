import { connect, type NatsConnection } from 'nats.ws';


export function useNats() {
  const natsClient = ref<NatsConnection>();

    const connectToNats = async () => {
        if (!natsClient.value) {
            try {
                console.log("Connecting To NATS...")
                natsClient.value = await connect({ servers: "ws://localhost:9222" });
                console.log("NATS Is Connected")
            } catch (error: any) {
                console.error(`NATS Server Error On Connect: `, error)
            }
        }
    }

  function closeConnection() {
    if (natsClient.value) {
        try {
            console.log("Closing Connection To NATS...")
            natsClient.value.close();
            console.log("NATS Connection Is Closed!")
        } catch (error: any) {
            console.error(`NATS Server Error On Close: `, error)
        }
    }
  }

  function publish(topic: string, message: string) {
    if (natsClient.value) {
      try {
        natsClient.value.publish(topic, new TextEncoder().encode(message));
      } catch (error: any) {
        console.error(`NATS Server Error On Publish: `, error)
      }
    }
  }

  onBeforeUnmount(() => {
    closeConnection();
  });

  return {
    natsClient,
    connectToNats,
    publish,
  };
}
