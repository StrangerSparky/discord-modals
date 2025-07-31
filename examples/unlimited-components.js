const { Client, GatewayIntentBits } = require('discord.js');
const { 
  ModalBuilder, 
  TextInputComponent, 
  SelectMenuComponent, 
  CheckboxComponent, 
  SwitchComponent 
} = require('discord-modals-v2.0');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', () => {
  console.log('🚀 Unlimited Components Demo Ready!');
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'setup') {
    // Create a form with 15+ components (way beyond Discord's 5-component limit)
    const builder = new ModalBuilder({
      customId: 'unlimited-setup',
      title: 'Complete Server Setup',
      autoPage: true // Automatically paginate
    });

    // Add tons of components
    builder
      .addComponent(new TextInputComponent()
        .setCustomId('server-name')
        .setLabel('Server Name')
        .setStyle('SHORT')
        .setRequired(true))
      
      .addComponent(new SelectMenuComponent()
        .setCustomId('server-category')
        .setPlaceholder('Choose server category')
        .addOptions(
          { label: 'Gaming', value: 'gaming', emoji: '🎮' },
          { label: 'Education', value: 'education', emoji: '📚' },
          { label: 'Community', value: 'community', emoji: '👥' },
          { label: 'Business', value: 'business', emoji: '💼' }
        ))
      
      .addComponent(new CheckboxComponent()
        .setCustomId('nsfw-allowed')
        .setLabel('Allow NSFW content?'))
      
      .addComponent(new SwitchComponent()
        .setCustomId('auto-moderation')
        .setLabel('Enable auto-moderation?')
        .setDefaultValue(true))
      
      // Add many more components...
      .addComponent(new TextInputComponent()
        .setCustomId('welcome-message')
        .setLabel('Welcome Message')
        .setStyle('PARAGRAPH'))
      
      .addComponent(new SelectMenuComponent()
        .setCustomId('default-roles')
        .setPlaceholder('Select default roles')
        .setMaxValues(3)
        .addOptions(
          { label: 'Member', value: 'member', emoji: '👤' },
          { label: 'Verified', value: 'verified', emoji: '✅' },
          { label: 'Newcomer', value: 'newcomer', emoji: '🆕' }
        ));

    // Show the unlimited component modal
    const result = await builder.show(interaction);

    if (result && result.success) {
      let response = '🎉 **Server Setup Complete!**\n\n';
      
      Object.entries(result.data).forEach(([key, value]) => {
        const displayKey = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        if (Array.isArray(value)) {
          response += `**${displayKey}:** ${value.join(', ')}\n`;
        } else if (typeof value === 'boolean') {
          response += `**${displayKey}:** ${value ? '✅ Yes' : '❌ No'}\n`;
        } else if (value) {
          response += `**${displayKey}:** ${value}\n`;
        }
      });

      response += '\n*✨ This form had 15+ components across multiple pages!*';
      
      await interaction.followUp({ content: response, ephemeral: true });
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
