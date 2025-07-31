'use strict';

const { ComponentType } = require('discord.js');
const BaseMessageComponent = require('./BaseMessageComponent');

/**
 * Represents a Modal Action Row, containing a Text Input or a Select Menu Component.
 */
class ModalActionRow {
  constructor(data = {}) {
    this.type = ComponentType.ActionRow;
    this.components = data.components?.map(c => BaseMessageComponent.create(c)) ?? [];
  }

  /**
   * Adds a Modal Component (Text Input or Select Menu).
   * @param {TextInputComponent|SelectMenuComponent} component
   * @returns {ModalActionRow}
   */
  addComponent(component) {
    this.components.push(component);
    return this;
  }

  toJSON() {
    return {
      type: ComponentType.ActionRow,
      components: this.components.map(c => c.toJSON()),
    };
  }
}

module.exports = ModalActionRow;
