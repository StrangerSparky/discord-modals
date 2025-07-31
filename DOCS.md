<div align="center">
  <img src="https://cdn.discordapp.com/attachments/910547379617402960/945169823648866414/Discord-Modals-Docs.png" alt="Discord Modals" />
  <p align="center">
  <a href="https://www.npmjs.com/package/discord-modals">
    <img src="https://img.shields.io/npm/dt/discord-modals?style=for-the-badge" alt="npm" />
  </a>
</p>

</div>

> **Discord-Modals is a package that helps you create and interact with Modals in discord.js v14+.**

# 📚 Documentation

This page provides a high-level overview of the main components of `discord-modals`. For detailed usage examples, please see the [README.md](README.md) file.

## 🧩 Main Components

### `Modal`

The `Modal` class is used to build the main modal window. You can set a title, a custom ID, and add components to it.

### `TextInputComponent`

Represents a text input field in a modal. You can set a label, placeholder, style (short or long), and other properties.

### `SelectMenuComponent`

Represents a dropdown select menu in a modal. You can add options with labels, descriptions, and values.

### `CheckboxComponent`

A convenient wrapper around `SelectMenuComponent` that creates a "Yes" or "No" choice. It simplifies creating boolean-like inputs.

### `SwitchComponent`

Similar to `CheckboxComponent`, this creates an "On" or "Off" switch, providing another way to get boolean-like input from the user.

### `showModal(interaction, modal)`

This function is used to show a modal to a user in response to an interaction.

---

> For more detailed information and code examples, please refer to the [main README.md file](README.md).
