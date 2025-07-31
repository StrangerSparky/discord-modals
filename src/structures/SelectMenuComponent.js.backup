'use strict';

const { ComponentType } = require('discord.js');
const BaseMessageComponent = require('./BaseMessageComponent');
const Util = require('../util/Util');
const { RangeError } = require('./errors');

/**
 * Represents a Select Menu Component of a Modal.
 * @extends {BaseMessageComponent}
 */
class SelectMenuComponent extends BaseMessageComponent {
  constructor(data = {}) {
    super({ type: ComponentType.StringSelect });

    this.setup(data);
  }

  setup(data) {
    this.customId = data.custom_id ?? data.customId ?? null;
    this.placeholder = data.placeholder ?? null;
    this.minValues = data.min_values ?? data.minValues ?? null;
    this.maxValues = data.max_values ?? data.maxValues ?? null;
    this.options = this.constructor.normalizeOptions(data.options ?? []);
    this.disabled = data.disabled ?? false;
  }

  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'SELECT_MENU_CUSTOM_ID');
    return this;
  }

  setDisabled(disabled = true) {
    this.disabled = disabled;
    return this;
  }

  setMaxValues(maxValues) {
    this.maxValues = maxValues;
    return this;
  }

  setMinValues(minValues) {
    this.minValues = minValues;
    return this;
  }

  setPlaceholder(placeholder) {
    this.placeholder = Util.verifyString(placeholder, RangeError, 'SELECT_MENU_PLACEHOLDER');
    return this;
  }

  addOptions(...options) {
    this.options.push(...this.constructor.normalizeOptions(options));
    return this;
  }

  setOptions(...options) {
    this.spliceOptions(0, this.options.length, options);
    return this;
  }

  spliceOptions(index, deleteCount, ...options) {
    this.options.splice(index, deleteCount, ...this.constructor.normalizeOptions(...options));
    return this;
  }

  toJSON() {
    return {
      type: ComponentType.StringSelect,
      custom_id: this.customId,
      placeholder: this.placeholder,
      min_values: this.minValues,
      max_values: this.maxValues,
      options: this.options,
      disabled: this.disabled,
    };
  }

  static normalizeOption(option) {
    let { label, value, description, emoji } = option;

    label = Util.verifyString(label, RangeError, 'SELECT_OPTION_LABEL');
    value = Util.verifyString(value, RangeError, 'SELECT_OPTION_VALUE');
    emoji = emoji ? Util.resolvePartialEmoji(emoji) : null;
    description = description ? Util.verifyString(description, RangeError, 'SELECT_OPTION_DESCRIPTION', true) : null;

    return {
      label,
      value,
      description,
      emoji,
      default: option.default ?? false,
    };
  }

  static normalizeOptions(...options) {
    return options.flat(Infinity).map(option => this.normalizeOption(option));
  }
}

module.exports = SelectMenuComponent;
