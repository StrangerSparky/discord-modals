require("dotenv").config();
const { Client, GatewayIntentBits, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Modal, TextInputComponent, showModal } = require('discord-modals-v2.0');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('DISCORD_TOKEN environment variable is not set.');
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'demo') return;

  const modal = new Modal()
    .setCustomId('demo-modal')
    .setTitle('Demonstration Modal')
    .addComponents(
      new TextInputComponent()
        .setCustomId('feedback-input')
        .setLabel('Your Feedback')
        .setStyle('PARAGRAPH')
        .setPlaceholder('Type your feedback here...'),
      new TextInputComponent()
        .setCustomId('name-input')
        .setLabel('Your Name')
        .setStyle('SHORT')
        .setPlaceholder('Enter your name')
        .setRequired(true),
      new TextInputComponent()
        .setCustomId('email-input')
        .setLabel('Your Email')
        .setStyle('SHORT')
        .setPlaceholder('Enter your email'),
      new TextInputComponent()
        .setCustomId('age-input')
        .setLabel('Your Age')
        .setStyle('SHORT')
        .setPlaceholder('Enter your age')
    );

  await showModal(interaction, modal);

  const submitted = await interaction.awaitModalSubmit({
    time: 60000,
    filter: i => i.customId === 'demo-modal' && i.user.id === interaction.user.id,
  }).catch(console.error);

  if (submitted) {
    const feedback = submitted.fields.getTextInputValue('feedback-input');
    const name = submitted.fields.getTextInputValue('name-input');
    const email = submitted.fields.getTextInputValue('email-input');
    const age = submitted.fields.getTextInputValue('age-input');

    await submitted.reply(
      `**Thank you for your submission!**\n\n` +
      `**Name:** ${name}\n` +
      `**Email:** ${email}\n` +
      `**Age:** ${age}\n` +
      `**Feedback:**\n${feedback}`
    );
  }
});

client.login(token);
