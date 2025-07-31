'use strict';

/**
 * Utility class for parsing and validating modal field inputs
 * that simulate select menus, checkboxes, and switches
 */
class ModalFieldParser {
  
  /**
   * Parses select menu input (expects numbers like "1" or "1,3")
   */
  static parseSelectMenu(input, options, minValues = 1, maxValues = 1) {
    if (!input || input.trim() === '') {
      if (minValues > 0) {
        throw new Error('This field is required');
      }
      return [];
    }

    const inputNumbers = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (inputNumbers.length === 0) {
      throw new Error('Please enter valid numbers (e.g., "1" or "1,3")');
    }

    if (inputNumbers.length < minValues) {
      throw new Error(`Please select at least ${minValues} option(s)`);
    }

    if (inputNumbers.length > maxValues) {
      throw new Error(`Please select at most ${maxValues} option(s)`);
    }

    const selectedValues = [];
    for (const num of inputNumbers) {
      if (num < 1 || num > options.length) {
        throw new Error(`Invalid option: ${num}. Choose 1-${options.length}`);
      }
      selectedValues.push(options[num - 1].value);
    }

    return [...new Set(selectedValues)]; // Remove duplicates
  }

  /**
   * Parses checkbox input (expects yes/no variations)
   */
  static parseCheckbox(input, defaultValue = false) {
    if (!input || input.trim() === '') {
      return defaultValue;
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

  /**
   * Parses switch input (expects on/off variations)
   */
  static parseSwitch(input, defaultValue = false) {
    if (!input || input.trim() === '') {
      return defaultValue;
    }

    const normalizedInput = input.trim().toLowerCase();
    const onValues = ['on', 'enable', 'enabled', 'true', '1', 'yes', 'active'];
    const offValues = ['off', 'disable', 'disabled', 'false', '0', 'no', 'inactive'];

    if (onValues.includes(normalizedInput)) {
      return true;
    } else if (offValues.includes(normalizedInput)) {
      return false;
    } else {
      throw new Error('Please enter "on" or "off" (or similar variations)');
    }
  }

  /**
   * Gets display value for checkbox
   */
  static getCheckboxDisplay(value) {
    return value ? '✅ Yes' : '❌ No';
  }

  /**
   * Gets display value for switch
   */
  static getSwitchDisplay(value) {
    return value ? '🟢 On' : '🔴 Off';
  }

  /**
   * Gets display values for select menu
   */
  static getSelectMenuDisplay(values, options) {
    return values.map(value => {
      const option = options.find(opt => opt.value === value);
      return option ? `${option.emoji ? option.emoji + ' ' : ''}${option.label}` : value;
    });
  }
}

module.exports = ModalFieldParser;
