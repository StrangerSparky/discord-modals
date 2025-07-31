'use strict';

module.exports = {
  Modal: require('./src/structures/Modal'),
  TextInputComponent: require('./src/structures/TextInputComponent'),
  
  // Enhanced simulated components
  SelectMenuComponent: require('./src/structures/SelectMenuComponent'),
  CheckboxComponent: require('./src/structures/CheckboxComponent'),
  SwitchComponent: require('./src/structures/SwitchComponent'),
  
  // Utilities
  ModalActionRow: require('./src/structures/ModalActionRow'),
  showModal: require('./src/structures/ShowModal'),
  SnowflakeUtil: require('./src/util/SnowflakeUtil'),
  
  // Enhanced utilities
  ModalFieldParser: require('./src/util/ModalFieldParser'),
};
