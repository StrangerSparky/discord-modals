'use strict';

const TextInputComponent = require('./TextInputComponent');

/**
 * Enhanced Switch Component that simulates switch behavior using TextInput
 */
class SwitchComponent extends TextInputComponent {
  constructor(data = {}) {
    super({ ...data, style: 'SHORT' });
    this.switchLabel = data.label || 'Switch';
    this.defaultValue = data.defaultValue || false;
    this.isSwitch = true;
    this._updateInputProperties();
  }

  setLabel(label) {
    this.switchLabel = label;
    this._updateInputProperties();
    return this;
  }

  setDefaultValue(defaultValue) {
    this.defaultValue = defaultValue;
    this._updateInputProperties();
    return this;
  }

  _updateInputProperties() {
    const instruction = 'Type "on" or "off":';
    super.setLabel(`${this.switchLabel}\n${instruction}`);
    super.setPlaceholder(this.defaultValue ? 'on' : 'off');
    this.setRequired(false);
  }

  validateAndParseInput(input) {
    if (!input || input.trim() === '') {
      return this.defaultValue;
    }

    const normalizedInput = input.trim().toLowerCase();
    const onValues = ['on', 'enable', 'enabled', 'true', '1', 'yes', 'active'];
    const offValues = ['off', 'disable', 'disabled', 'false', '0', 'no', 'inactive'];

    if (onValues.includes(normalizedInput)) {
      return true;
    } else if (offValues.includes(normalizedInput)) {
      return false;
    } else {
      throw new Error('Please enter "on" or "off"');
    }
  }

  getDisplayValue(input) {
    try {
      const value = this.validateAndParseInput(input);
      return value ? '🟢 On' : '🔴 Off';
    } catch (error) {
      return '❓ Invalid';
    }
  }
}

module.exports = SwitchComponent;
