
import { createClient, RedisClientType } from "redis";
export class PubSubManager {
  private static instance: PubSubManager;
  private redisClient: RedisClientType;
  private subscriptions: Map<String, String[]>;

  private constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }

  public static getInstance(): PubSubManager {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }

    return PubSubManager.instance;
  }

  public userSubscribe(stock: string, userId: string) {
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
    }

    this.subscriptions.get(stock)?.push(userId);
    //if its first user
    if (this.subscriptions.get(stock)?.length == 1) {
      this.redisClient.subscribe(stock, (message) => {
        this.handleMessage(stock, message);
      });
    }
  }

  private handleMessage(stock: string, message: string) {
    console.log(`message recived on channel ${stock}:${message}`);
    //sending messages to all subscribed users .similating
    this.subscriptions.get(stock)?.forEach((user) => {
      console.log("sending messages to" + user);
    });
  }

  public userUnSubscribe(stock: string, userId: string) {
    if (!this.subscriptions.has(stock)) return;

    this.subscriptions.set(
      stock,
      this.subscriptions.get(stock)?.filter((id) => id !== userId) || []
    );
  }

  public async disconnect() {
    await this.redisClient.quit();
  }
}
