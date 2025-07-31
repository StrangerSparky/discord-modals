<div align="center">
  <img src="https://cdn.discordapp.com/attachments/910547379617402960/942871547268436088/Discord-Modals.png" alt="Discord Modals" />
  <p align="center">
  <a href="https://www.npmjs.com/package/discord-modals">
    <img src="https://img.shields.io/npm/dt/discord-modals?style=for-the-badge" alt="npm" />
  </a>
</p>

</div>

> **A package that helps you create and interact with Discord Modals in discord.js v14+.**

# 🔎 Installation

```sh
npm install discord-modals
yarn add discord-modals
```

# 🔮 What is this package for?

This package provides a simple and intuitive way to build and show Discord Modals. It's designed to work seamlessly with discord.js v14 and above.

# ✨ Usage

Creating and showing a modal is straightforward. You build a modal using the provided component classes, and then show it in an interaction.

## 📜 Examples

### Basic Modal

Here's how to create a simple modal with a text input and show it when a slash command is used.

```js
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'ping') return;

  const modal = new Modal()
    .setCustomId('ping-modal')
    .setTitle('My First Modal')
    .addComponents(
      new TextInputComponent()
        .setCustomId('name-input')
        .setLabel('What is your name?')
        .setStyle('SHORT')
        .setPlaceholder('John Doe')
        .setRequired(true)
    );

  await showModal(interaction, modal);
});

client.login('YOUR_BOT_TOKEN');
```

### Handling Submissions

You can await the modal submission and get the values from the fields.

```js
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand() || interaction.commandName !== 'ping') return;

  const modal = new Modal() // ... (same as above)

  await showModal(interaction, modal);

  const submitted = await interaction.awaitModalSubmit({
    time: 60000,
    filter: i => i.customId === 'ping-modal' && i.user.id === interaction.user.id,
  }).catch(console.error);

  if (submitted) {
    const name = submitted.fields.getTextInputValue('name-input');
    await submitted.reply(`Hello, ${name}!`);
  }
});
```

### Checkboxes and Switches

This library also provides convenient `CheckboxComponent` and `SwitchComponent` classes.

```js
const { Modal, CheckboxComponent, SwitchComponent, showModal } = require('discord-modals');

// ...

const modal = new Modal()
  .setCustomId('settings-modal')
  .setTitle('Your Settings')
  .addComponents(
    new CheckboxComponent()
      .setCustomId('agree-checkbox')
      .setLabel('Do you agree to the terms?'),
    new SwitchComponent()
      .setCustomId('notifications-switch')
      .setLabel('Enable notifications?')
      .setDefaultValue(true)
  );

// ... (show the modal and handle submission as above)

// To get the values:
if (submitted) {
  const agreed = submitted.fields.getSelectMenuValues('agree-checkbox')[0] === 'true';
  const notifications = submitted.fields.getSelectMenuValues('notifications-switch')[0] === 'true';

  await submitted.reply(`Agreed: ${agreed}, Notifications: ${notifications}`);
}
```

# ❓ FAQ

**DiscordAPIError: Interaction has already been acknowledged.**

The `showModal()` function is a response to an interaction. You cannot reply to an interaction more than once. If you have already used `reply()` or `deferReply()`, you cannot use `showModal()`.

**Can I add more than 5 components to a modal?**

No, a modal can only have up to 5 action rows, and each action row can only contain one text input or select menu.

# 🔨 Developers

- 『𝑴𝒂𝒕𝒆𝒐ᵗᵉᵐ』#9999
- Your Name Here (if you contribute!)

# ⛔ Issues/Bugs?

> **Please report them on our GitHub Repository [here](https://github.com/Mateo-tem/discord-modals/issues) to help us improve the package.**
