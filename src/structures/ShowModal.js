'use strict';

const { BaseInteraction } = require('discord.js');
const Modal = require('./Modal');
const { Error } = require('./errors');

/**
 * Shows a modal to the interaction user.
 * @param {BaseInteraction} interaction The interaction to show the modal to.
 * @param {Modal} modal The modal to show.
 * @returns {Promise<void>}
 */
async function showModal(interaction, modal) {
  if (!(interaction instanceof BaseInteraction)) throw new Error('INVALID_INTERACTION');
  if (!(modal instanceof Modal)) throw new Error('INVALID_MODAL');

  await interaction.showModal(modal.toJSON());
}

module.exports = showModal;
