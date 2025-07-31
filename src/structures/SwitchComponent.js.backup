'use strict';

const SelectMenuComponent = require('./SelectMenuComponent');

/**
 * Represents a Switch Component of a Modal.
 * @extends {SelectMenuComponent}
 */
class SwitchComponent extends SelectMenuComponent {
  /**
   * Represents a Switch Component of a Modal.
   * @param {Object} data
   * @example
   * new SwitchComponent()
   *  .setCustomId('switch-customid')
   *  .setLabel('Enable notifications?')
   *  .setDefaultValue(true)
   */
  constructor(data = {}) {
    const options = [
      {
        label: 'On',
        value: 'true',
        emoji: '🟢',
      },
      {
        label: 'Off',
        value: 'false',
        emoji: '🔴',
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
   * Sets the label of the switch.
   * @param {string} label The label to show above the switch.
   * @returns {SwitchComponent}
   */
  setLabel(label) {
    this.placeholder = label;
    return this;
  }

  /**
   * Sets the default value of the switch.
   * @param {boolean} defaultValue The default value.
   * @returns {SwitchComponent}
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

module.exports = SwitchComponent;
