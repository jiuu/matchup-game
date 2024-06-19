import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

class dbManager{
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
      let resArr = []

      let call = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json"
      );
      let data = await call.json();
      let champs = Object.keys(data.data); // Extracting champion names and sorting them
      let randomChamp = champs[(Math.floor(Math.random() * champs.length))]
      console.log(randomChamp)
        const command = new QueryCommand({
          TableName: process.env.TABLE_NAME,
          KeyConditionExpression: 'myChamp = :v1',

          //Limit:1,
          ScanIndexForward:false,
          ExpressionAttributeValues: {
            ":v1": 
              randomChamp
            ,

          },
        });
        try {
          
          let response = await this.docClient.send(command);
          
          console.log(response.Items);
          return response.Items?.[(Math.floor(Math.random() * response.Items?.length))];
        } catch (error) {
          console.log(error)
          throw error;
        }
      };
}

export const manager = new dbManager()


