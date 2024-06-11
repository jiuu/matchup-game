import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

export class dbManager{
    dbClient: DynamoDBClient;
    docClient: DynamoDBDocumentClient;
    constructor() {
        this.dbClient =  new DynamoDBClient({
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
            },
            region: process.env.AWS_REGION as string,
          });
        this.docClient =DynamoDBDocumentClient.from(this.dbClient);
    }

      



    createNewMatchup = async (matchup: Object) => {
        const command = new PutCommand({
          TableName: process.env.TABLE_NAME,
          Item: matchup,
        });
        try {
          let response = await this.docClient.send(command);
          console.log(response );
          return response;
        } catch (error) {
          console.log(error)
          throw error;
        }
      };

    getRandomMatchup = async () => {
        const command = new GetCommand({
          TableName: process.env.TABLE_NAME,
          Key: {
            myChamp: "Draven",
            enemyChamp: "Jinx"
          },
        });
        try {
          const response = await this.docClient.send(command);
          console.log(response.Item);
          return response;
        } catch (error) {
          console.log(error)
          throw error;
        }
      };
}


