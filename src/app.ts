import config from "./config";
import "reflect-metadata";
import { App } from "@slack/bolt";

const app = new App({
  signingSecret: config!.slackSigning,
  token: config!.slackBotToken,
});

app.command("/birthday-channel", async ({ command, ack, respond }) => {
  await ack();
  let [uid, group] = <[tag: string, group: string]>command.text.split(" ");
  group = group.split("^")[1].split("|")[0];
  console.log(group);
  let res = await app.client.usergroups.users.list({
    token: config.slackBotToken,
    usergroup: group,
  });
  let people = <Array<string>>res.users;

  people = people.filter((x) => x !== uid);

  let tag = await app.client.users.info({
    token: config.slackBotToken,
    user: uid,
  });

  let channel = await app.client.conversations.create({
    token: config.slackBotToken,
    name: `${tag.user.name}-${Math.round(
      Math.random() * 1000
    ).toString()}-cakeday`,
    is_private: true,
  });

  await app.client.conversations.invite({
    token: config.slackBotToken,
    users: people.join(","),
    channel: channel.channel.id,
  });

  await respond(`Created channel <#${channel.channel.id}>!`);
});

app.start(config.port);
console.log(`Birthdaybot is running on ${config.port}!`);
