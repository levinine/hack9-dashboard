import { createConnection, Connection, ConnectionManager, getConnectionManager } from "typeorm";
import { User } from "../entity/User";
import { Team } from "../entity/Team";
import { TestExecution } from "../entity/TestExecution";
import { TestToTestExecution } from "../entity/TestToTestExecution";
import { Test } from "../entity/Test";
import { Message } from "../entity/Message";

export class DatabaseService {
  private entities = [
    User,
    Team,
    TestExecution,
    Test,
    TestToTestExecution,
    Message
  ];

  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    try {
      const connectionName = 'default';
      let connection: Connection;

      if (this.connectionManager.has(connectionName)) {
        connection = await this.connectionManager.get(connectionName);

        if (!connection.isConnected) {
          connection = await connection.connect();
        }
      } else {
        connection = await createConnection({
          type: "mysql",
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT) | 3306,
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DATABASE,
          entities: this.entities,
          synchronize: true,
          logging: true
        })
      }
      return connection;
    } catch (error) {
      console.log(`DB CONNECTION ERROR: ${error}`);
      throw new Error(error);
    }
  }

}

