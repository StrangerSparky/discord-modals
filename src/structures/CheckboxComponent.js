'use strict';

const BaseMessageComponent = require('./BaseMessageComponent');
const Util = require('../util/Util');

/**
 * Represents a Checkbox Component of a Modal.
 * @extends {BaseMessageComponent}
 */
class CheckboxComponent extends BaseMessageComponent {
	/**
   * Represents a Checkbox Component of a Modal.
   * @example
   * new CheckboxComponent()
   * .setCustomId('checkbox-customid')
   * .setLabel('Do you agree to the terms?')
   * .setDefaultValue(false);
   */
	constructor(data = {}) {
		super({ type: 'CHECKBOX' });

		this.setup(data);
	}

	setup(data) {
		/**
		 * The Custom Id of the Checkbox Component
		 * @type {String}
		 */
		this.customId = data.custom_id ?? data.customId ?? null;

		/**
		 * The Label of the Checkbox Component.
		 * @type {String}
		 */
		this.label = data.label ?? null;

		/**
		 * The default value of the Checkbox Component.
		 * @type {boolean}
		 */
		this.defaultValue = data.default_value ?? data.defaultValue ?? false;

		/**
		 * If the Checkbox Component is disabled.
		 * @type {boolean}
		 */
		this.disabled = data.disabled ?? false;

		/**
		 * If the Checkbox Component is required.
		 * @type {boolean}
		 */
		this.required = data.required ?? false;
	}

	/**
	 * Sets the Custom Id of a Checkbox Component.
	 * @param {String} customId The Custom Id of a Checkbox Component.
	 * @returns {CheckboxComponent} A Checkbox Component.
	 */
	setCustomId(customId) {
		this.customId = Util.verifyString(customId, RangeError, 'CHECKBOX_CUSTOM_ID');
		return this;
	}

	/**
	 * Sets the Label of a Checkbox Component.
	 * @param {String} label The Label of a Checkbox Component.
	 * @returns {CheckboxComponent} A Checkbox Component.
	 */
	setLabel(label) {
		this.label = Util.verifyString(label, RangeError, 'CHECKBOX_LABEL');
		return this;
	}

	/**
	 * Sets the default value of a Checkbox Component.
	 * @param {boolean} defaultValue The default value of a Checkbox Component.
	 * @returns {CheckboxComponent} A Checkbox Component.
	 */
	setDefaultValue(defaultValue) {
		this.defaultValue = Boolean(defaultValue);
		return this;
	}

	/**
	 * Sets a Boolean if a Checkbox Component will be disabled.
	 * @param {boolean} [disabled=true] If the Checkbox Component will be disabled.
	 * @returns {CheckboxComponent} A Checkbox Component.
	 */
	setDisabled(disabled = true) {
		this.disabled = disabled;
		return this;
	}

	/**
	 * Sets a Boolean if a Checkbox Component will be required.
	 * @param {boolean} [required=true] If the Checkbox Component will be required.
	 * @returns {CheckboxComponent} A Checkbox Component.
	 */
	setRequired(required = true) {
		this.required = required;
		return this;
	}

	/**
	 * Transforms the Checkbox Component to a plain object.
	 * @returns {Object} A plain object.
	 */
	toJSON() {
		return {
			type: this.type,
			custom_id: this.customId,
			label: this.label,
			default_value: this.defaultValue,
			disabled: this.disabled,
			required: this.required,
		};
	}

	/**
	 * Validates and parses the user's input.
	 * @param {string} input The user's input.
	 * @returns {boolean} The parsed input.
	 */
	validateAndParseInput(input) {
		const truthy = ['true', 'yes', 'y', 'on', 'enable', 'enabled', 'active', '1'];
		return truthy.includes(input.toLowerCase().trim());
	}
}

module.exports = CheckboxComponent;
