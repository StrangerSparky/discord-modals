const { Modal, TextInputComponent, CheckboxComponent, SwitchComponent } = require('./index');

try {
  const modal = new Modal()
    .setCustomId('test-modal')
    .setTitle('Test Modal')
    .addComponents(
      new TextInputComponent()
        .setCustomId('text-input')
        .setLabel('Text Input'),
      new CheckboxComponent()
        .setCustomId('checkbox')
        .setLabel('Checkbox'),
      new SwitchComponent()
        .setCustomId('switch')
        .setLabel('Switch')
    );

  const json = modal.toJSON();

  if (!json.custom_id || !json.title || json.components.length !== 3) {
    throw new Error('Modal.toJSON() produced incorrect output.');
  }

  console.log('Test passed!');
} catch (error) {
  console.error('Test failed:', error);
  process.exit(1);
}
