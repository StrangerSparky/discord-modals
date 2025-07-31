'use strict';

const { Modal } = require('./Modal');
const { showModal } = require('./ShowModal');

/**
 * ModalPagination - Bypass Discord's 5-component limit with paginated modals
 */
class ModalPagination {
  constructor(options = {}) {
    this.pages = [];
    this.currentPage = 0;
    this.baseCustomId = options.customId || 'paginated-modal';
    this.title = options.title || 'Multi-Step Form';
    this.data = new Map();
    this.onComplete = options.onComplete || null;
    this.onCancel = options.onCancel || null;
  }

  addPage(components, title = null) {
    if (components.length > 5) {
      throw new Error('Each page can have maximum 5 components');
    }
    
    this.pages.push({
      components,
      title: title || `${this.title} - Page ${this.pages.length + 1}`
    });
    return this;
  }

  addComponents(...components) {
    const allComponents = components.flat();
    
    for (let i = 0; i < allComponents.length; i += 5) {
      const pageComponents = allComponents.slice(i, i + 5);
      this.addPage(pageComponents);
    }
    return this;
  }

  async show(interaction) {
    if (this.pages.length === 0) {
      throw new Error('No pages added to modal pagination');
    }
    return this._showPage(interaction, 0);
  }

  async _showPage(interaction, pageIndex) {
    this.currentPage = pageIndex;
    const page = this.pages[pageIndex];
    
    if (!page) {
      throw new Error(`Page ${pageIndex} does not exist`);
    }

    const modal = new Modal()
      .setCustomId(`${this.baseCustomId}-page-${pageIndex}`)
      .setTitle(page.title)
      .addComponents(...page.components);

    if (this.pages.length > 1) {
      modal.setTitle(`${page.title} (${pageIndex + 1}/${this.pages.length})`);
    }

    await showModal(interaction, modal);

    const submitted = await interaction.awaitModalSubmit({
      time: 300000,
      filter: i => i.customId === `${this.baseCustomId}-page-${pageIndex}` && i.user.id === interaction.user.id,
    }).catch(() => null);

    if (!submitted) {
      if (this.onCancel) await this.onCancel(interaction, this.data);
      return null;
    }

    this._storePageData(submitted, pageIndex);

    if (pageIndex === this.pages.length - 1) {
      if (this.onComplete) {
        return await this.onComplete(submitted, this.data);
      }
      return { completed: true, data: this.data };
    } else {
      await submitted.reply({
        content: `✅ Page ${pageIndex + 1} completed! Showing next page...`,
        ephemeral: true
      });
      
      const followUp = await submitted.followUp({
        content: `Continue to page ${pageIndex + 2}/${this.pages.length}`,
        components: [{
          type: 1,
          components: [{
            type: 2,
            style: 1,
            label: `Continue to Page ${pageIndex + 2}`,
            custom_id: `continue-page-${pageIndex + 1}`
          }]
        }],
        ephemeral: true
      });

      const buttonInteraction = await followUp.awaitMessageComponent({
        time: 300000,
        filter: i => i.customId === `continue-page-${pageIndex + 1}` && i.user.id === interaction.user.id
      }).catch(() => null);

      if (buttonInteraction) {
        return this._showPage(buttonInteraction, pageIndex + 1);
      }
    }

    return { completed: false, data: this.data };
  }

  _storePageData(submitted, pageIndex) {
    const page = this.pages[pageIndex];
    
    page.components.forEach(component => {
      try {
        const value = submitted.fields.getTextInputValue(component.customId);
        
        if (component.validateAndParseInput) {
          try {
            const parsedValue = component.validateAndParseInput(value);
            this.data.set(component.customId, {
              raw: value,
              parsed: parsedValue,
              type: component.isSelectMenu ? 'select' : 
                    component.isCheckbox ? 'checkbox' : 
                    component.isSwitch ? 'switch' : 'text',
              page: pageIndex
            });
          } catch (error) {
            this.data.set(component.customId, {
              raw: value,
              parsed: null,
              error: error.message,
              type: 'invalid',
              page: pageIndex
            });
          }
        } else {
          this.data.set(component.customId, {
            raw: value,
            parsed: value,
            type: 'text',
            page: pageIndex
          });
        }
      } catch (error) {
        // Component not found in submission
      }
    });
  }

  getData() {
    return Object.fromEntries(this.data);
  }

  getComponentData(customId) {
    return this.data.get(customId);
  }

  getParsedData() {
    const result = {};
    for (const [key, value] of this.data) {
      result[key] = value.parsed;
    }
    return result;
  }
}

module.exports = ModalPagination;
