require("dotenv").config();
const { Client, GatewayIntentBits } = require('discord.js');
const { Modal, TextInputComponent, SelectMenuComponent, CheckboxComponent, SwitchComponent, showModal } = require('discord-modals-v2.0');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.DISCORD_TOKEN;
if (!token) {
  throw new Error('DISCORD_TOKEN environment variable is not set.');
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Enhanced Modal Components Demo Bot Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'demo') return;

  // Create a modal with simulated components
  const modal = new Modal()
    .setCustomId('enhanced-demo-modal')
    .setTitle('Enhanced Components Demo')
    .addComponents(
      // Regular text input
      new TextInputComponent()
        .setCustomId('feedback-input')
        .setLabel('Your Feedback')
        .setStyle('PARAGRAPH')
        .setPlaceholder('Tell us what you think...'),
      
      // Simulated Select Menu
      new SelectMenuComponent()
        .setCustomId('color-select')
        .setPlaceholder('Choose your favorite color')
        .addOptions(
          { label: 'Red', value: 'red', emoji: '❤️' },
          { label: 'Green', value: 'green', emoji: '💚' },
          { label: 'Blue', value: 'blue', emoji: '💙' },
          { label: 'Purple', value: 'purple', emoji: '💜' },
          { label: 'Yellow', value: 'yellow', emoji: '💛' }
        ),
      
      // Simulated Checkbox
      new CheckboxComponent()
        .setCustomId('terms-checkbox')
        .setLabel('Do you agree to the terms?')
        .setDefaultValue(false),
      
      // Simulated Switch
      new SwitchComponent()
        .setCustomId('notifications-switch')
        .setLabel('Enable notifications?')
        .setDefaultValue(true)
    );

  await showModal(interaction, modal);

  const submitted = await interaction.awaitModalSubmit({
    time: 60000,
    filter: i => i.customId === 'enhanced-demo-modal' && i.user.id === interaction.user.id,
  }).catch(console.error);

  if (submitted) {
    try {
      // Get regular text input
      const feedback = submitted.fields.getTextInputValue('feedback-input');
      
      // Parse simulated components
      const colorInput = submitted.fields.getTextInputValue('color-select');
      const termsInput = submitted.fields.getTextInputValue('terms-checkbox');
      const notificationsInput = submitted.fields.getTextInputValue('notifications-switch');

      // Get the component instances to parse inputs
      const colorComponent = modal.components.find(row => 
        row.components.find(comp => comp.customId === 'color-select')
      )?.components.find(comp => comp.customId === 'color-select');

      const termsComponent = modal.components.find(row => 
        row.components.find(comp => comp.customId === 'terms-checkbox')
      )?.components.find(comp => comp.customId === 'terms-checkbox');

      const notificationsComponent = modal.components.find(row => 
        row.components.find(comp => comp.customId === 'notifications-switch')
      )?.components.find(comp => comp.customId === 'notifications-switch');

      // Parse the inputs
      let selectedColors = [];
      let agreedToTerms = false;
      let notificationsEnabled = true;
      let errors = [];

      try {
        selectedColors = colorComponent?.validateAndParseInput ? 
          colorComponent.validateAndParseInput(colorInput) : [colorInput];
      } catch (error) {
        errors.push(`Color selection: ${error.message}`);
      }

      try {
        agreedToTerms = termsComponent?.validateAndParseInput ? 
          termsComponent.validateAndParseInput(termsInput) : termsInput === 'yes';
      } catch (error) {
        errors.push(`Terms agreement: ${error.message}`);
      }

      try {
        notificationsEnabled = notificationsComponent?.validateAndParseInput ? 
          notificationsComponent.validateAndParseInput(notificationsInput) : notificationsInput === 'on';
      } catch (error) {
        errors.push(`Notifications: ${error.message}`);
      }

      // Create response
      let response = `**🎉 Enhanced Modal Demo Results**\n\n`;
      response += `**�� Feedback:**\n${feedback || 'No feedback provided'}\n\n`;
      
      if (errors.length === 0) {
        response += `**🎨 Selected Colors:** ${selectedColors.join(', ') || 'None'}\n`;
        response += `**📋 Agreed to Terms:** ${agreedToTerms ? '✅ Yes' : '❌ No'}\n`;
        response += `**🔔 Notifications:** ${notificationsEnabled ? '🟢 Enabled' : '🔴 Disabled'}\n\n`;
        response += `*✨ All components parsed successfully!*`;
      } else {
        response += `**❌ Parsing Errors:**\n${errors.join('\n')}\n\n`;
        response += `**Raw Inputs:**\n`;
        response += `- Color: "${colorInput}"\n`;
        response += `- Terms: "${termsInput}"\n`;
        response += `- Notifications: "${notificationsInput}"`;
      }

      await submitted.reply(response);

    } catch (error) {
      console.error('Error processing modal submission:', error);
      await submitted.reply('❌ An error occurred while processing your submission.');
    }
  }
});

client.login(token);
