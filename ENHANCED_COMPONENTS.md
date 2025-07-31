# Enhanced Discord Modal Components

This package extends Discord modals to support simulated **Select Menus**, **Checkboxes**, and **Switches** using clever TextInput workarounds.

## 🚀 How It Works

Since Discord only supports TextInput components in modals, we simulate other components by:

1. **Select Menus**: Users type numbers (e.g., "1" or "1,3") to select options
2. **Checkboxes**: Users type "yes/no" or similar variations
3. **Switches**: Users type "on/off" or similar variations

## 📋 Enhanced Select Menu

```js
const selectMenu = new SelectMenuComponent()
  .setCustomId('color-select')
  .setPlaceholder('Choose your favorite colors')
  .setMinValues(1)
  .setMaxValues(2)
  .addOptions(
    { label: 'Red', value: 'red', emoji: '❤️' },
    { label: 'Green', value: 'green', emoji: '💚' },
    { label: 'Blue', value: 'blue', emoji: '💙' }
  );
```

**User sees:**
```
Choose your favorite colors
Select 1-2 options (type "1,3"):
1. ❤️ Red | 2. 💚 Green | 3. 💙 Blue
```

**User types:** `1,3` → Selects Red and Blue

## ☑️ Enhanced Checkbox

```js
const checkbox = new CheckboxComponent()
  .setCustomId('agree-terms')
  .setLabel('Do you agree to the terms?')
  .setDefaultValue(false);
```

**User sees:**
```
Do you agree to the terms?
Type "yes" or "no":
```

**User types:** `yes` → Returns `true`

## 🔘 Enhanced Switch

```js
const switch = new SwitchComponent()
  .setCustomId('notifications')
  .setLabel('Enable push notifications?')
  .setDefaultValue(true);
```

**User sees:**
```
Enable push notifications?
Type "on" or "off":
```

**User types:** `off` → Returns `false`

## 🎯 Complete Example

```js
const { Modal, SelectMenuComponent, CheckboxComponent, SwitchComponent, showModal } = require('discord-modals-v2.0');

const modal = new Modal()
  .setCustomId('settings-modal')
  .setTitle('User Settings')
  .addComponents(
    new SelectMenuComponent()
      .setCustomId('theme-select')
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

// Show modal
await showModal(interaction, modal);

// Handle submission
const submitted = await interaction.awaitModalSubmit({ time: 60000 });

// Parse results
const themeInput = submitted.fields.getTextInputValue('theme-select');
const analyticsInput = submitted.fields.getTextInputValue('analytics');
const notificationsInput = submitted.fields.getTextInputValue('notifications');

// Use component validation methods
const selectedTheme = selectComponent.validateAndParseInput(themeInput);
const allowAnalytics = checkboxComponent.validateAndParseInput(analyticsInput);
const pushNotifications = switchComponent.validateAndParseInput(notificationsInput);
```

## 🛠️ Validation & Error Handling

All components include built-in validation:

```js
try {
  const values = selectComponent.validateAndParseInput(userInput);
  console.log('Selected:', values); // ['red', 'blue']
} catch (error) {
  console.log('Error:', error.message); // "Invalid option: 5. Choose 1-3"
}
```

## 🎨 User Experience

The enhanced components provide clear instructions and validation:

- **Intuitive**: Users understand what to type
- **Forgiving**: Accepts multiple input variations
- **Validated**: Clear error messages for invalid inputs
- **Visual**: Uses emojis and formatting for clarity

## 📖 Accepted Input Variations

### Checkbox Inputs
- **True**: `yes`, `y`, `true`, `1`, `on`, `checked`
- **False**: `no`, `n`, `false`, `0`, `off`, `unchecked`

### Switch Inputs  
- **On**: `on`, `enable`, `enabled`, `true`, `1`, `yes`, `active`
- **Off**: `off`, `disable`, `disabled`, `false`, `0`, `no`, `inactive`

### Select Menu Inputs
- **Single**: `1`, `2`, `3`
- **Multiple**: `1,3`, `2,1,4`, `1, 2, 3`

This approach provides a seamless user experience while working within Discord's modal limitations! 🚀
