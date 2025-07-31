'use strict';

/**
 * Utility for parsing simulated modal components
 */
class ModalFieldParser {
  static parseSelectMenu(input, options, minValues = 1, maxValues = 1) {
    if (!input?.trim()) {
      if (minValues > 0) throw new Error('This field is required');
      return [];
    }

    const nums = input.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    
    if (nums.length === 0) throw new Error('Enter valid numbers (e.g., "1" or "1,3")');
    if (nums.length < minValues) throw new Error(`Select at least ${minValues} option(s)`);
    if (nums.length > maxValues) throw new Error(`Select at most ${maxValues} option(s)`);

    const values = [];
    for (const num of nums) {
      if (num < 1 || num > options.length) {
        throw new Error(`Invalid: ${num}. Choose 1-${options.length}`);
      }
      values.push(options[num - 1].value);
    }
    return [...new Set(values)];
  }

  static parseCheckbox(input, defaultValue = false) {
    if (!input?.trim()) return defaultValue;
    const val = input.trim().toLowerCase();
    if (['yes', 'y', 'true', '1', 'on'].includes(val)) return true;
    if (['no', 'n', 'false', '0', 'off'].includes(val)) return false;
    throw new Error('Enter "yes" or "no"');
  }

  static parseSwitch(input, defaultValue = false) {
    if (!input?.trim()) return defaultValue;
    const val = input.trim().toLowerCase();
    if (['on', 'enable', 'true', '1', 'yes'].includes(val)) return true;
    if (['off', 'disable', 'false', '0', 'no'].includes(val)) return false;
    throw new Error('Enter "on" or "off"');
  }
}

module.exports = ModalFieldParser;
