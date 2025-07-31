require("dotenv").config();
const { Client, GatewayIntentBits, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Modal, TextInputComponent, SelectMenuComponent, CheckboxComponent, SwitchComponent, showModal } = require('discord-modals-v2.0');

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
        .setStyle('Paragraph')
        .setPlaceholder('Type your feedback here...'),
      new SelectMenuComponent()
        .setCustomId('color-select')
        .setPlaceholder('Choose your favorite color')
        .addOptions(
          { label: 'Red', value: 'red', emoji: '❤️' },
          { label: 'Green', value: 'green', emoji: '💚' },
          { label: 'Blue', value: 'blue', emoji: '💙' }
        ),
      new CheckboxComponent()
        .setCustomId('terms-checkbox')
        .setLabel('Do you agree to the terms?'),
      new SwitchComponent()
        .setCustomId('notifications-switch')
        .setLabel('Enable notifications?')
    );

  await showModal(interaction, modal);

  const submitted = await interaction.awaitModalSubmit({
    time: 60000,
    filter: i => i.customId === 'demo-modal' && i.user.id === interaction.user.id,
  }).catch(console.error);

  if (submitted) {
    const feedback = submitted.fields.getTextInputValue('feedback-input');
    const color = submitted.fields.getSelectMenuValues('color-select')[0];
    const terms = submitted.fields.getSelectMenuValues('terms-checkbox')[0] === 'true';
    const notifications = submitted.fields.getSelectMenuValues('notifications-switch')[0] === 'true';

    await submitted.reply(
      `**Feedback:**\n${feedback}\n\n` +
      `**Favorite Color:** ${color}\n` +
      `**Agreed to Terms:** ${terms}\n` +
      `**Notifications:** ${notifications}`
    );
  }
});

client.login(token);
