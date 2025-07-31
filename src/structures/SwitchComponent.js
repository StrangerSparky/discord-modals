'use strict';

const BaseMessageComponent = require('./BaseMessageComponent');
const Util = require('../util/Util');

/**
 * Represents a Switch Component of a Modal.
 * @extends {BaseMessageComponent}
 */
class SwitchComponent extends BaseMessageComponent {
	/**
   * Represents a Switch Component of a Modal.
   * @example
   * new SwitchComponent()
   * .setCustomId('switch-customid')
   * .setLabel('Enable notifications?')
   * .setDefaultValue(true);
   */
	constructor(data = {}) {
		super({ type: 'SWITCH' });

		this.setup(data);
	}

	setup(data) {
		/**
		 * The Custom Id of the Switch Component
		 * @type {String}
		 */
		this.customId = data.custom_id ?? data.customId ?? null;

		/**
		 * The Label of the Switch Component.
		 * @type {String}
		 */
		this.label = data.label ?? null;

		/**
		 * The default value of the Switch Component.
		 * @type {boolean}
		 */
		this.defaultValue = data.default_value ?? data.defaultValue ?? false;

		/**
		 * If the Switch Component is disabled.
		 * @type {boolean}
		 */
		this.disabled = data.disabled ?? false;

		/**
		 * If the Switch Component is required.
		 * @type {boolean}
		 */
		this.required = data.required ?? false;
	}

	/**
	 * Sets the Custom Id of a Switch Component.
	 * @param {String} customId The Custom Id of a Switch Component.
	 * @returns {SwitchComponent} A Switch Component.
	 */
	setCustomId(customId) {
		this.customId = Util.verifyString(customId, RangeError, 'SWITCH_CUSTOM_ID');
		return this;
	}

	/**
	 * Sets the Label of a Switch Component.
	 * @param {String} label The Label of a Switch Component.
	 * @returns {SwitchComponent} A Switch Component.
	 */
	setLabel(label) {
		this.label = Util.verifyString(label, RangeError, 'SWITCH_LABEL');
		return this;
	}

	/**
	 * Sets the default value of a Switch Component.
	 * @param {boolean} defaultValue The default value of a Switch Component.
	 * @returns {SwitchComponent} A Switch Component.
	 */
	setDefaultValue(defaultValue) {
		this.defaultValue = Boolean(defaultValue);
		return this;
	}

	/**
	 * Sets a Boolean if a Switch Component will be disabled.
	 * @param {boolean} [disabled=true] If the Switch Component will be disabled.
	 * @returns {SwitchComponent} A Switch Component.
	 */
	setDisabled(disabled = true) {
		this.disabled = disabled;
		return this;
	}

	/**
	 * Sets a Boolean if a Switch Component will be required.
	 * @param {boolean} [required=true] If the Switch Component will be required.
	 * @returns {SwitchComponent} A Switch Component.
	 */
	setRequired(required = true) {
		this.required = required;
		return this;
	}

	/**
	 * Transforms the Switch Component to a plain object.
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

module.exports = SwitchComponent;