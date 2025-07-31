'use strict';

const TextInputComponent = require('./TextInputComponent');

class EnhancedSelectMenuComponent extends TextInputComponent {
  constructor(data = {}) {
    super({ ...data, style: 'SHORT' });
    this.options = [];
    this.selectPlaceholder = data.placeholder || 'Select an option';
    this.minValues = data.min_values ?? data.minValues ?? 1;
    this.maxValues = data.max_values ?? data.maxValues ?? 1;
    this.allowMultiple = this.maxValues > 1;
    this.isSelectMenu = true;
  }

  addOptions(...options) {
    this.options.push(...this.constructor.normalizeOptions(options));
    this._updateInputProperties();
    return this;
  }

  setOptions(...options) {
    this.options = this.constructor.normalizeOptions(options);
    this._updateInputProperties();
    return this;
  }

  setPlaceholder(placeholder) {
    this.selectPlaceholder = placeholder;
    this._updateInputProperties();
    return this;
  }

  setMinValues(minValues) {
    this.minValues = minValues;
    this.allowMultiple = this.maxValues > 1;
    this._updateInputProperties();
    return this;
  }

  setMaxValues(maxValues) {
    this.maxValues = maxValues;
    this.allowMultiple = this.maxValues > 1;
    this._updateInputProperties();
    return this;
  }

  _updateInputProperties() {
    const optionsList = this.options
      .map((option, index) => {
        const emoji = option.emoji ? option.emoji + ' ' : '';
        return `${index + 1}. ${emoji}${option.label}`;
      })
      .join(' | ');

    const instructionText = this.allowMultiple
      ? `Select ${this.minValues}-${this.maxValues} options (e.g., "1,3"):`
      : 'Select an option (type number):';

    this.setLabel(`${this.selectPlaceholder}\n${instructionText}`);
    
    const shortOptions = this.options.length <= 3 
      ? optionsList 
      : `Options 1-${this.options.length} available`;
    
    super.setPlaceholder(shortOptions);
    this.setRequired(this.minValues > 0);
  }

  validateAndParseInput(input) {
    if (!input || input.trim() === '') {
      if (this.minValues > 0) throw new Error('This field is required');
      return [];
    }

    const inputNumbers = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (inputNumbers.length === 0) {
      throw new Error('Please enter valid numbers (e.g., "1" or "1,3")');
    }

    if (inputNumbers.length < this.minValues) {
      throw new Error(`Please select at least ${this.minValues} option(s)`);
    }

    if (inputNumbers.length > this.maxValues) {
      throw new Error(`Please select at most ${this.maxValues} option(s)`);
    }

    const selectedValues = [];
    for (const num of inputNumbers) {
      if (num < 1 || num > this.options.length) {
        throw new Error(`Invalid option: ${num}. Choose 1-${this.options.length}`);
      }
      selectedValues.push(this.options[num - 1].value);
    }

    return [...new Set(selectedValues)];
  }

  getSelectedLabels(input) {
    try {
      const values = this.validateAndParseInput(input);
      return values.map(value => {
        const option = this.options.find(opt => opt.value === value);
        return option ? `${option.emoji ? option.emoji + ' ' : ''}${option.label}` : value;
      });
    } catch (error) {
      return [];
    }
  }

  static normalizeOption(option) {
    return {
      label: String(option.label),
      value: String(option.value),
      description: option.description ? String(option.description) : null,
      emoji: option.emoji || null,
      default: option.default ?? false,
    };
  }

  static normalizeOptions(...options) {
    return options.flat(Infinity).map(option => this.normalizeOption(option));
  }
}

module.exports = EnhancedSelectMenuComponent;
