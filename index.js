'use strict';

module.exports = {
  // Core Components
  Modal: require('./src/structures/Modal'),
  TextInputComponent: require('./src/structures/TextInputComponent'),
  
  // Enhanced Simulated Components
  SelectMenuComponent: require('./src/structures/SelectMenuComponent'),
  CheckboxComponent: require('./src/structures/CheckboxComponent'),
  SwitchComponent: require('./src/structures/SwitchComponent'),
  
  // Advanced Modal Systems (Beyond Discord Limits)
  ModalPagination: require('./src/structures/ModalPagination'),
  ModalBuilder: require('./src/structures/ModalBuilder'),
  
  // Utilities
  ModalActionRow: require('./src/structures/ModalActionRow'),
  showModal: require('./src/structures/ShowModal'),
  SnowflakeUtil: require('./src/util/SnowflakeUtil'),
  
  // Interaction handlers
  Interaction: require('./src/structures/Interaction'),
  ModalSubmitInteraction: require('./src/structures/ModalSubmitInteraction'),
  ModalSubmitField: require('./src/structures/ModalSubmitField'),
  ModalSubmitSelectMenu: require('./src/structures/ModalSubmitSelectMenu'),
};
