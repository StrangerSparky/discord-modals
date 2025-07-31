// Test script for enhanced modal components
const { SelectMenuComponent, CheckboxComponent, SwitchComponent } = require('./index.js');

console.log('🧪 Testing Enhanced Modal Components...\n');

// Test Select Menu
console.log('📋 Testing SelectMenuComponent:');
const selectMenu = new SelectMenuComponent()
  .setCustomId('test-select')
  .setPlaceholder('Choose colors')
  .addOptions(
    { label: 'Red', value: 'red', emoji: '❤️' },
    { label: 'Blue', value: 'blue', emoji: '💙' },
    { label: 'Green', value: 'green', emoji: '💚' }
  );

try {
  const result1 = selectMenu.validateAndParseInput('1,3');
  console.log('✅ Input "1,3" → Result:', result1);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test Checkbox
console.log('\n☑️ Testing CheckboxComponent:');
const checkbox = new CheckboxComponent()
  .setCustomId('test-checkbox')
  .setLabel('Agree to terms?');

try {
  const result2 = checkbox.validateAndParseInput('yes');
  console.log('✅ Input "yes" → Result:', result2);
  
  const result3 = checkbox.validateAndParseInput('no');
  console.log('✅ Input "no" → Result:', result3);
} catch (error) {
  console.log('❌ Error:', error.message);
}

// Test Switch
console.log('\n🔘 Testing SwitchComponent:');
const switchComp = new SwitchComponent()
  .setCustomId('test-switch')
  .setLabel('Enable notifications?');

try {
  const result4 = switchComp.validateAndParseInput('on');
  console.log('✅ Input "on" → Result:', result4);
  
  const result5 = switchComp.validateAndParseInput('off');
  console.log('✅ Input "off" → Result:', result5);
} catch (error) {
  console.log('❌ Error:', error.message);
}

console.log('\n🎉 Enhanced components test completed!');
