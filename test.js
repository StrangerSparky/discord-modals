const { Modal, TextInputComponent, CheckboxComponent, SwitchComponent } = require('./index');

try {
  const modal = new Modal()
    .setCustomId('test-modal')
    .setTitle('Test Modal')
    .addComponents(
      new TextInputComponent()
        .setCustomId('text-input')
        .setLabel('Text Input')
        .setStyle('Paragraph'),
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

  if (json.components[0].components[0].style !== 2) {
    throw new Error('TextInputComponent style is not resolving to the correct integer value.');
  }

  console.log('Test passed!');
} catch (error) {
  console.error('Test failed:', error);
  process.exit(1);
}
