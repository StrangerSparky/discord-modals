'use strict';

const TextInputComponent = require('./TextInputComponent');

class EnhancedCheckboxComponent extends TextInputComponent {
  constructor(data = {}) {
    super({ ...data, style: 'SHORT' });
    this.checkboxLabel = data.label || 'Checkbox';
    this.defaultValue = data.defaultValue || false;
    this.isCheckbox = true;
    this._updateInputProperties();
  }

  setLabel(label) {
    this.checkboxLabel = label;
    this._updateInputProperties();
    return this;
  }

  setDefaultValue(defaultValue) {
    this.defaultValue = defaultValue;
    this._updateInputProperties();
    return this;
  }

  _updateInputProperties() {
    const instruction = 'Type "yes", "y", "true", "1" for checked, or "no", "n", "false", "0" for unchecked:';
    super.setLabel(`${this.checkboxLabel}\n${instruction}`);
    super.setPlaceholder(this.defaultValue ? 'yes' : 'no');
    this.setRequired(false);
  }

  validateAndParseInput(input) {
    if (!input || input.trim() === '') {
      return this.defaultValue;
    }

    const normalizedInput = input.trim().toLowerCase();
    const trueValues = ['yes', 'y', 'true', '1', 'on', 'checked'];
    const falseValues = ['no', 'n', 'false', '0', 'off', 'unchecked'];

    if (trueValues.includes(normalizedInput)) {
      return true;
    } else if (falseValues.includes(normalizedInput)) {
      return false;
    } else {
      throw new Error('Please enter "yes" or "no" (or similar variations)');
    }
  }

  getDisplayValue(input) {
    try {
      const value = this.validateAndParseInput(input);
      return value ? '✅ Yes' : '❌ No';
    } catch (error) {
      return '❓ Invalid';
    }
  }
}

module.exports = EnhancedCheckboxComponent;
