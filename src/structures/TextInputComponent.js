'use strict';

const { TextInputStyle, ComponentType } = require('discord.js');
const Util = require('../util/Util');
const BaseMessageComponent = require('./BaseMessageComponent');
const { RangeError } = require('./errors');

/**
 * Represents a Text Input Component of a Modal.
 * @extends BaseMessageComponent
 */
class TextInputComponent extends BaseMessageComponent {
  constructor(data = {}) {
    super({ type: ComponentType.TextInput });

    this.setup(data);
  }

  setup(data) {
    this.customId = data.custom_id ?? data.customId ?? null;
    this.label = data.label ?? null;
    this.maxLength = data.max_length ?? data.maxLength ?? null;
    this.minLength = data.min_length ?? data.minLength ?? null;
    this.placeholder = data.placeholder ?? null;
    this.required = data.required ?? false;
    this.style = data.style ? TextInputComponent.resolveStyle(data.style) : null;
    this.value = data.value ?? null;
  }

  setCustomId(customId) {
    this.customId = Util.verifyString(customId, RangeError, 'TEXT_INPUT_CUSTOM_ID');
    return this;
  }

  setLabel(label) {
    this.label = Util.verifyString(label, RangeError, 'TEXT_INPUT_LABEL');
    return this;
  }

  setRequired(required = true) {
    this.required = required;
    return this;
  }

  setMaxLength(maxLength) {
    this.maxLength = maxLength;
    return this;
  }

  setMinLength(minLength) {
    this.minLength = minLength;
    return this;
  }

  setPlaceholder(placeholder) {
    this.placeholder = Util.verifyString(placeholder, RangeError, 'TEXT_INPUT_PLACEHOLDER');
    return this;
  }

  setStyle(style) {
    this.style = TextInputComponent.resolveStyle(style);
    return this;
  }

  setDefaultValue(value) {
    this.value = Util.verifyString(value, RangeError, 'TEXT_INPUT_VALUE');
    return this;
  }

  toJSON() {
    return {
      type: ComponentType.TextInput,
      custom_id: this.customId,
      label: this.label,
      style: this.style,
      min_length: this.minLength,
      max_length: this.maxLength,
      required: this.required,
      placeholder: this.placeholder,
      value: this.value,
    };
  }

  static resolveStyle(style) {
    if (typeof style === 'string') {
      style = style.toUpperCase();
      return TextInputStyle[style] ?? style;
    }
    return style;
  }
}

module.exports = TextInputComponent;
