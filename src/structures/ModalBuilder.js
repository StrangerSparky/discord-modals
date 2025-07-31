'use strict';

const { Modal } = require('./Modal');
const ModalPagination = require('./ModalPagination');

/**
 * Advanced Modal Builder with unlimited components and conditional logic
 */
class ModalBuilder {
  constructor(options = {}) {
    this.customId = options.customId || 'advanced-modal';
    this.title = options.title || 'Advanced Form';
    this.components = [];
    this.conditions = new Map();
    this.validators = new Map();
    this.maxComponentsPerPage = options.maxComponentsPerPage || 5;
    this.autoPage = options.autoPage !== false;
  }

  addComponent(component, conditions = null) {
    this.components.push(component);
    
    if (conditions) {
      this.conditions.set(component.customId, conditions);
    }
    
    return this;
  }

  addComponents(...components) {
    components.flat().forEach(component => this.addComponent(component));
    return this;
  }

  addValidator(customId, validator) {
    this.validators.set(customId, validator);
    return this;
  }

  addCondition(componentId, condition) {
    this.conditions.set(componentId, condition);
    return this;
  }

  async show(interaction, userData = {}) {
    const visibleComponents = this._filterComponents(userData);

    if (visibleComponents.length === 0) {
      throw new Error('No components to display');
    }

    if (visibleComponents.length <= 5) {
      return this._showSingleModal(interaction, visibleComponents);
    }

    if (this.autoPage) {
      return this._showPaginatedModal(interaction, visibleComponents);
    }

    throw new Error('Too many components for a single modal. Enable autoPage or use fewer components.');
  }

  async _showSingleModal(interaction, components) {
    const modal = new Modal()
      .setCustomId(this.customId)
      .setTitle(this.title)
      .addComponents(...components);

    await showModal(interaction, modal);

    const submitted = await interaction.awaitModalSubmit({
      time: 300000,
      filter: i => i.customId === this.customId && i.user.id === interaction.user.id,
    }).catch(() => null);

    if (!submitted) return null;

    return this._processSubmission(submitted, components);
  }

  async _showPaginatedModal(interaction, components) {
    const pagination = new ModalPagination({
      customId: this.customId,
      title: this.title,
      onComplete: async (submitted, data) => {
        return this._processAllData(submitted, data);
      }
    });

    for (let i = 0; i < components.length; i += this.maxComponentsPerPage) {
      const pageComponents = components.slice(i, i + this.maxComponentsPerPage);
      pagination.addPage(pageComponents);
    }

    return pagination.show(interaction);
  }

  _filterComponents(userData) {
    return this.components.filter(component => {
      const condition = this.conditions.get(component.customId);
      if (!condition) return true;

      if (typeof condition === 'function') {
        return condition(userData);
      }

      if (condition.field && condition.value !== undefined) {
        const fieldValue = userData[condition.field];
        const operator = condition.operator || 'equals';

        switch (operator) {
          case 'equals': return fieldValue === condition.value;
          case 'not_equals': return fieldValue !== condition.value;
          case 'contains': return String(fieldValue).includes(condition.value);
          case 'greater_than': return Number(fieldValue) > Number(condition.value);
          case 'less_than': return Number(fieldValue) < Number(condition.value);
          default: return true;
        }
      }

      return true;
    });
  }

  _processSubmission(submitted, components) {
    const result = {
      success: true,
      data: {},
      errors: {},
      raw: {}
    };

    components.forEach(component => {
      try {
        const rawValue = submitted.fields.getTextInputValue(component.customId);
        result.raw[component.customId] = rawValue;

        const validator = this.validators.get(component.customId);
        if (validator) {
          const validationResult = validator(rawValue);
          if (validationResult !== true) {
            throw new Error(validationResult || 'Validation failed');
          }
        }

        if (component.validateAndParseInput) {
          result.data[component.customId] = component.validateAndParseInput(rawValue);
        } else {
          result.data[component.customId] = rawValue;
        }
      } catch (error) {
        result.success = false;
        result.errors[component.customId] = error.message;
        result.data[component.customId] = null;
      }
    });

    return result;
  }

  _processAllData(submitted, allData) {
    const result = {
      success: true,
      data: {},
      errors: {},
      raw: {},
      pages: {}
    };

    for (const [customId, componentData] of allData) {
      result.raw[customId] = componentData.raw;
      result.pages[customId] = componentData.page;

      if (componentData.error) {
        result.success = false;
        result.errors[customId] = componentData.error;
        result.data[customId] = null;
      } else {
        result.data[customId] = componentData.parsed;
      }
    }

    return result;
  }

  static createWizard(steps) {
    const wizard = new ModalBuilder({
      customId: 'wizard-modal',
      title: 'Setup Wizard',
      autoPage: true
    });

    steps.forEach((step, index) => {
      step.components.forEach(component => {
        component.stepIndex = index;
        component.stepTitle = step.title;
        wizard.addComponent(component, step.condition);
      });
    });

    return wizard;
  }

  static createSurvey(questions) {
    const survey = new ModalBuilder({
      customId: 'survey-modal',
      title: 'Survey',
      autoPage: true
    });

    questions.forEach(question => {
      survey.addComponent(question.component, question.condition);
      
      if (question.validator) {
        survey.addValidator(question.component.customId, question.validator);
      }
    });

    return survey;
  }
}

module.exports = ModalBuilder;
