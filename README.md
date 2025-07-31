<div align="center">
  <img src="https://cdn.discordapp.com/attachments/910547379617402960/942871547268436088/Discord-Modals.png" alt="Discord Modals" />
  <p align="center">
  <a href="https://www.npmjs.com/package/discord-modals-v2.0">
    <img src="https://img.shields.io/npm/dt/discord-modals-v2.0?style=for-the-badge" alt="npm" />
  </a>
</p>
</div>

> **A package that helps you create Discord Modals with simulated Select Menus, Checkboxes, and Switches in discord.js v14+.**

# 🔎 Installation

```sh
npm install discord-modals-v2.0
yarn add discord-modals-v2.0
```

# 🚀 What Makes This Special?

This package extends Discord modals beyond their limitations by simulating **Select Menus**, **Checkboxes**, and **Switches** using clever TextInput workarounds. Since Discord only supports TextInput components in modals, we provide an intuitive way for users to interact with these simulated components.

## ✨ Enhanced Components

### 🎯 Simulated Select Menu
Users type numbers to select options (e.g., "1" or "1,3" for multiple selections)

### ☑️ Simulated Checkbox  
Users type "yes/no" or similar variations

### 🔘 Simulated Switch
Users type "on/off" or similar variations

# 📋 Quick Examples

## Enhanced Select Menu

```js
const { Modal, SelectMenuComponent, showModal } = require('discord-modals-v2.0');

const modal = new Modal()
  .setCustomId('demo-modal')
  .setTitle('Choose Your Preferences')
  .addComponents(
    new SelectMenuComponent()
      .setCustomId('color-select')
      .setPlaceholder('Choose your favorite colors')
      .setMinValues(1)
      .setMaxValues(2)
      .addOptions(
        { label: 'Red', value: 'red', emoji: '❤️' },
        { label: 'Green', value: 'green', emoji: '💚' },
        { label: 'Blue', value: 'blue', emoji: '💙' }
      )
  );

await showModal(interaction, modal);

// Handle submission
const submitted = await interaction.awaitModalSubmit({ time: 60000 });
const colorInput = submitted.fields.getTextInputValue('color-select');

// Parse the selection (user typed "1,3")
const selectedColors = selectComponent.validateAndParseInput(colorInput);
// Returns: ['red', 'blue']
```

**What the user sees:**
```
Choose your favorite colors
Select 1-2 options (type "1,3"):
1. ❤️ Red | 2. 💚 Green | 3. 💙 Blue
```

## Enhanced Checkbox & Switch

```js
const { CheckboxComponent, SwitchComponent } = require('discord-modals-v2.0');

const modal = new Modal()
  .setCustomId('settings-modal')
  .setTitle('User Settings')
  .addComponents(
    new CheckboxComponent()
      .setCustomId('agree-terms')
      .setLabel('Do you agree to the terms?')
      .setDefaultValue(false),
    new SwitchComponent()
      .setCustomId('notifications')
      .setLabel('Enable notifications?')
      .setDefaultValue(true)
  );

// Parse submissions
const agreedToTerms = checkboxComponent.validateAndParseInput(termsInput); // true/false
const notificationsEnabled = switchComponent.validateAndParseInput(notifInput); // true/false
```

# 🎨 User Experience

The enhanced components provide clear, intuitive interfaces:

- **Select Menu**: `1. ❤️ Red | 2. 💚 Green | 3. 💙 Blue` → User types `1,3`
- **Checkbox**: `Type "yes" or "no":` → User types `yes`
- **Switch**: `Type "on" or "off":` → User types `off`

# 🛠️ Input Validation

All components include smart validation with helpful error messages:

```js
try {
  const values = selectComponent.validateAndParseInput('1,5'); // Invalid option 5
} catch (error) {
  console.log(error.message); // "Invalid option: 5. Choose 1-3"
}
```

## Accepted Input Variations

### Checkbox
- **True**: `yes`, `y`, `true`, `1`, `on`, `checked`
- **False**: `no`, `n`, `false`, `0`, `off`, `unchecked`

### Switch
- **On**: `on`, `enable`, `enabled`, `true`, `1`, `yes`, `active`
- **Off**: `off`, `disable`, `disabled`, `false`, `0`, `no`, `inactive`

### Select Menu
- **Single**: `1`, `2`, `3`
- **Multiple**: `1,3`, `2,1,4`, `1, 2, 3`

# 🔥 Complete Example

```js
const { Client, GatewayIntentBits } = require('discord.js');
const { Modal, TextInputComponent, SelectMenuComponent, CheckboxComponent, SwitchComponent, showModal } = require('discord-modals-v2.0');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'settings') return;

  const modal = new Modal()
    .setCustomId('user-settings')
    .setTitle('User Preferences')
    .addComponents(
      new TextInputComponent()
        .setCustomId('username')
        .setLabel('Username')
        .setStyle('SHORT')
        .setRequired(true),
      new SelectMenuComponent()
        .setCustomId('theme')
        .setPlaceholder('Choose theme')
        .addOptions(
          { label: 'Dark', value: 'dark', emoji: '🌙' },
          { label: 'Light', value: 'light', emoji: '☀️' },
          { label: 'Auto', value: 'auto', emoji: '🔄' }
        ),
      new CheckboxComponent()
        .setCustomId('analytics')
        .setLabel('Allow analytics?'),
      new SwitchComponent()
        .setCustomId('notifications')
        .setLabel('Push notifications')
        .setDefaultValue(true)
    );

  await showModal(interaction, modal);

  const submitted = await interaction.awaitModalSubmit({ time: 60000 });
  
  // Parse all inputs
  const username = submitted.fields.getTextInputValue('username');
  const themeInput = submitted.fields.getTextInputValue('theme');
  const analyticsInput = submitted.fields.getTextInputValue('analytics');
  const notificationsInput = submitted.fields.getTextInputValue('notifications');

  // Validate simulated components
  const theme = themeComponent.validateAndParseInput(themeInput)[0];
  const analytics = analyticsComponent.validateAndParseInput(analyticsInput);
  const notifications = notificationsComponent.validateAndParseInput(notificationsInput);

  await submitted.reply(`Settings saved! Theme: ${theme}, Analytics: ${analytics}, Notifications: ${notifications}`);
});
```

# ❓ FAQ

**How do users know what to type?**
Each simulated component displays clear instructions and examples in the modal label and placeholder text.

**What if users enter invalid input?**
The validation methods provide helpful error messages explaining the correct format.

**Can I customize the instructions?**
Yes! You can modify the label and placeholder text, or extend the components for custom behavior.

**Does this work with discord.js v13?**
This package is designed for discord.js v14+, but the core concepts can be adapted for v13.

# 🔨 Developers

- 『𝑴𝒂𝒕𝒆𝒐ᵗᵉᵐ』#9999
- Stranger_Sparky #7328

# ⛔ Issues/Bugs?

> **Please report them on our GitHub Repository [here](https://github.com/StrangerSparky/discord-modals/issues) to help us improve the package.**

---

**✨ Transform your Discord modals with simulated components that users actually understand! 🚀**
