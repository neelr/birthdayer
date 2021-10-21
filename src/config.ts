import * as dotenv from "dotenv";
dotenv.config();

export default {
  slackSigning: process.env.SLACK_SIGNING,
  slackBotToken: process.env.SLACK_BOT_TOKEN,
  postgresURI: process.env.DB_LINK,
  port: +process.env.PORT || 3000,
};
