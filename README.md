<div align="center">
  <img src="https://cdn.discordapp.com/attachments/910547379617402960/942871547268436088/Discord-Modals.png" alt="Discord Modals v2.0" />
  
  # 🚀 Discord Modals v2.0
  
  **The Ultimate Discord Modals Package - Beyond Discord's Limits**
  
  [![NPM Version](https://img.shields.io/npm/v/discord-modals-v2.0?style=for-the-badge)](https://www.npmjs.com/package/discord-modals-v2.0)
  [![Downloads](https://img.shields.io/npm/dt/discord-modals-v2.0?style=for-the-badge)](https://www.npmjs.com/package/discord-modals-v2.0)
  [![License](https://img.shields.io/npm/l/discord-modals-v2.0?style=for-the-badge)](LICENSE)
  [![GitHub Stars](https://img.shields.io/github/stars/StrangerSparky/discord-modals?style=for-the-badge)](https://github.com/StrangerSparky/discord-modals)

</div>

---

## ✨ **What Makes This Special?**

Discord Modals v2.0 **breaks through Discord's limitations** and provides:

- 🎯 **Simulated Select Menus, Checkboxes & Switches** in modals
- 🚫 **Unlimited Components** (bypass 5-component limit)  
- 🔗 **Modal Chaining** for complex multi-step forms
- 📄 **Auto-Pagination** for large forms
- 🧠 **Conditional Logic** and branching workflows
- 🛡️ **Advanced Validation** with custom rules
- 📝 **TypeScript Support** with full type definitions

## 🔥 **Beyond Discord's Limits**

| Discord's Limits | Discord Modals v2.0 |
|------------------|---------------------|
| ❌ 5 components max | ✅ **Unlimited components** |
| ❌ Only TextInput | ✅ **Select menus, checkboxes, switches** |  
| ❌ No multi-step forms | ✅ **Modal chaining & wizards** |
| ❌ No conditional logic | ✅ **Smart branching & conditions** |
| ❌ Basic validation | ✅ **Advanced validation & parsing** |

---

## 🚀 **Quick Start**

```bash
npm install discord-modals-v2.0
```

```js
const { 
  ModalBuilder, 
  SelectMenuComponent, 
  CheckboxComponent, 
  SwitchComponent 
} = require('discord-modals-v2.0');

// Create a form with 10+ components (auto-paginated)
const form = new ModalBuilder({
  title: 'Server Setup',
  autoPage: true // Automatically handles pagination
})
.addComponents(
  new SelectMenuComponent()
    .setCustomId('theme')
    .setPlaceholder('Choose themes')
    .setMaxValues(3)
    .addOptions(
      { label: 'Dark Mode', value: 'dark', emoji: '🌙' },
      { label: 'Light Mode', value: 'light', emoji: '☀️' },
      { label: 'Auto Mode', value: 'auto', emoji: '🔄' }
    ),
  
  new CheckboxComponent()
    .setCustomId('newsletter')
    .setLabel('Subscribe to newsletter?'),
    
  new SwitchComponent()
    .setCustomId('notifications')
    .setLabel('Enable notifications?')
    .setDefaultValue(true),
    
  // Add as many components as you want!
  // They'll automatically be split across multiple pages
);

// Show the unlimited form
const result = await form.show(interaction);
console.log(result.data); // All parsed data from all pages
```

---

## 🎯 **Enhanced Components**

### **SelectMenuComponent** - Dropdown Simulation
```js
new SelectMenuComponent()
  .setCustomId('colors')
  .setPlaceholder('Choose your favorite colors')
  .setMinValues(1)
  .setMaxValues(3)
  .addOptions(
    { label: 'Red', value: 'red', emoji: '❤️' },
    { label: 'Blue', value: 'blue', emoji: '💙' },
    { label: 'Green', value: 'green', emoji: '💚' }
  )
```

**User Experience:**
```
Choose your favorite colors
Select 1-3 options (type "1,3"):
1. ❤️ Red | 2. 💙 Blue | 3. 💚 Green
```
**User types:** `1,3` → **Returns:** `['red', 'green']`

### **CheckboxComponent** - Yes/No Input
```js
new CheckboxComponent()
  .setCustomId('terms')
  .setLabel('Do you agree to the terms?')
  .setDefaultValue(false)
```

**Accepts:** `yes`, `y`, `true`, `1`, `on` → **Returns:** `true`

### **SwitchComponent** - On/Off Toggle
```js
new SwitchComponent()
  .setCustomId('notifications')
  .setLabel('Enable notifications?')
  .setDefaultValue(true)
```

**Accepts:** `on`, `enable`, `active`, `true` → **Returns:** `true`

---

## 🚫 **Unlimited Components**

Bypass Discord's 5-component limit automatically:

```js
const { ModalPagination } = require('discord-modals-v2.0');

const form = new ModalPagination({
  title: 'Large Form',
  onComplete: async (submitted, data) => {
    // Handle all collected data
    console.log('Collected from all pages:', data);
  }
});

// Add 15+ components - they'll be auto-split into pages
form.addComponents(
  component1, component2, component3, component4, component5,  // Page 1
  component6, component7, component8, component9, component10, // Page 2
  component11, component12, component13, component14, component15 // Page 3
  // ... add as many as you need!
);

await form.show(interaction);
```

---

## 🧠 **Advanced Features**

### **Conditional Logic**
```js
const form = new ModalBuilder()
  .addComponent(ageComponent)
  .addComponent(drinkComponent, {
    // Only show if age >= 21
    condition: (data) => data.age >= 21
  });
```

### **Custom Validation**
```js
form.addValidator('email', (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) || 'Please enter a valid email';
});
```

### **Data Persistence**
```js
// Data is automatically stored across pages and steps
const allData = form.getData();
const specificField = form.getComponentData('email');
```

---

## 📚 **Examples**

Check out the [examples directory](examples/) for complete working examples:

- **[Unlimited Components](examples/unlimited-components.js)** - 15+ component demo
- **[Modal Chain Wizard](examples/modal-chain-wizard.js)** - Complex wizard with branching
- **[Advanced Survey](examples/advanced-survey.js)** - Conditional survey logic

---

## 📊 **Comparison**

| Feature | discord.js | Other Modal Libs | Discord Modals v2.0 |
|---------|------------|------------------|---------------------|
| Component Limit | 5 | 5 | ✅ **Unlimited** |
| Select Menus | ❌ | ❌ | ✅ **Simulated** |
| Checkboxes | ❌ | ❌ | ✅ **Simulated** |
| Multi-step Forms | ❌ | Limited | ✅ **Full Support** |
| Conditional Logic | ❌ | ❌ | ✅ **Advanced** |
| Auto-pagination | ❌ | ❌ | ✅ **Built-in** |
| TypeScript | ✅ | Varies | ✅ **Full Support** |

---

## 🛠️ **Advanced Usage**

### **TypeScript Support**
```typescript
import { 
  ModalBuilder, 
  SelectMenuComponent, 
  CheckboxComponent 
} from 'discord-modals-v2.0';

const form: ModalBuilder = new ModalBuilder({
  title: 'Typed Form',
  autoPage: true
});
```

### **Error Handling**
```js
const result = await form.show(interaction);

if (result.success) {
  console.log('✅ Form completed:', result.data);
} else {
  console.log('❌ Errors:', result.errors);
}
```

---

## 🤝 **Contributing**

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 **Links**

- **NPM Package:** https://www.npmjs.com/package/discord-modals-v2.0
- **GitHub Repository:** https://github.com/StrangerSparky/discord-modals
- **Documentation:** [Full Documentation](docs/README.md)
- **Examples:** [Example Directory](examples/)

---

## 🔨 **Developers**

- 『𝑴𝒂𝒕𝒆𝒐ᵗᵉᵐ』#9999
- Stranger_Sparky #7328

---

<div align="center">

**⭐ Star this repository if it helped you!**

**🚀 Transform your Discord bots with unlimited modal possibilities!**

</div>
