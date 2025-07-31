require('dotenv').config();
const { Client, GatewayIntentBits, Routes, REST } = require('discord.js');
const { ModalBuilder, SelectMenuComponent, SwitchComponent, CheckboxComponent } = require('../index');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commands = [
  {
    name: 'testmodal',
    description: 'Shows a test modal with all the cool components.',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  try {
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'testmodal') {
    const modal = new ModalBuilder({
      customId: 'my-test-modal',
      title: 'Test Modal',
      autoPage: true, // This will be ignored since we have less than 5 components, but good for show.
    })
      .addComponents(
        new SelectMenuComponent()
          .setCustomId('color-picker')
          .setPlaceholder('Choose your favorite colors')
          .setMinValues(1)
          .setMaxValues(2)
          .addOptions(
            { label: 'Red', value: 'red', emoji: '❤️' },
            { label: 'Blue', value: 'blue', emoji: '💙' },
            { label: 'Green', value: 'green', emoji: '💚' }
          ),
        new SwitchComponent()
          .setCustomId('notifications')
          .setLabel('Enable notifications?')
          .setDefaultValue(true),
        new CheckboxComponent()
          .setCustomId('terms')
          .setLabel('Do you agree to the terms?')
          .setDefaultValue(false)
      );

    const result = await modal.show(interaction);

    if (result.success) {
      await interaction.followUp({
        content: 'Modal submitted successfully! Check the console for the parsed data.',
        ephemeral: true,
      });
      console.log('Modal Data:', result.data);
    } else {
       await interaction.followUp({
        content: 'Modal submission failed. See console for details.',
        ephemeral: true,
      });
      console.error('Modal Errors:', result.errors);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
