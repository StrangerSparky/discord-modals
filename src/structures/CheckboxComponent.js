'use strict';

const SelectMenuComponent = require('./SelectMenuComponent');

/**
 * Represents a Checkbox Component of a Modal.
 * @extends {SelectMenuComponent}
 */
class CheckboxComponent extends SelectMenuComponent {
  /**
   * Represents a Checkbox Component of a Modal.
   * @param {Object} data
   * @example
   * new CheckboxComponent()
   *  .setCustomId('checkbox-customid')
   *  .setLabel('Do you agree?')
   *  .setDefaultValue(true)
   */
  constructor(data = {}) {
    const options = [
      {
        label: 'Yes',
        value: 'true',
        emoji: '✅',
      },
      {
        label: 'No',
        value: 'false',
        emoji: '❌',
      },
    ];

    if (data.defaultValue) {
      const defaultOption = options.find(o => o.value === 'true');
      if (defaultOption) {
        defaultOption.default = true;
      }
    }

    super({
      ...data,
      placeholder: data.label ?? 'Select an option',
      options,
    });
  }

  /**
   * Sets the label of the checkbox.
   * @param {string} label The label to show above the checkbox.
   * @returns {CheckboxComponent}
   */
  setLabel(label) {
    this.placeholder = label;
    return this;
  }

  /**
   * Sets the default value of the checkbox.
   * @param {boolean} defaultValue The default value.
   * @returns {CheckboxComponent}
   */
  setDefaultValue(defaultValue) {
    this.options.forEach(o => (o.default = false));
    const option = this.options.find(o => o.value === String(defaultValue));
    if (option) {
      option.default = true;
    }
    return this;
  }
}

module.exports = CheckboxComponent;
