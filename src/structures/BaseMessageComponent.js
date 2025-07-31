'use strict';

const { ComponentType } = require('discord.js');
const { TypeError } = require('./errors');

/**
 * Represents an interactive component of a Message.
 */
class BaseMessageComponent {
  constructor(data) {
    this.type = 'type' in data ? BaseMessageComponent.resolveType(data.type) : null;
  }

  static create(data) {
    let component;
    let { type } = data;

    if (typeof type === 'string') {
      type = ComponentType[type];
    }

    switch (type) {
      case ComponentType.TextInput: {
        const TextInputComponent = require('./TextInputComponent');
        component = data instanceof TextInputComponent ? data : new TextInputComponent(data);
        break;
      }
      case ComponentType.StringSelect: {
        const SelectMenuComponent = require('./SelectMenuComponent');
        component = data instanceof SelectMenuComponent ? data : new SelectMenuComponent(data);
        break;
      }
      default:
        throw new TypeError('INVALID_TYPE', 'data.type', 'valid MessageComponentType');
    }
    return component;
  }

  static resolveType(type) {
    if (typeof type === 'string') {
      return ComponentType[type] ?? type;
    }
    return type;
  }
}

module.exports = BaseMessageComponent;
