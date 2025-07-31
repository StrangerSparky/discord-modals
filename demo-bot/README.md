# Discord Modals Demo Bot

This is a simple bot that demonstrates the features of the `discord-modals` library.

## 🚀 Setup

1.  **Install Dependencies:**
    ```sh
    npm install
    ```

2.  **Set Environment Variables:**
    Create a `.env` file in this directory and add the following variables:
    ```
    DISCORD_TOKEN=your_bot_token
    DISCORD_CLIENT_ID=your_bot_client_id
    DISCORD_GUILD_ID=your_test_server_id
    ```

3.  **Register Commands:**
    Run the following command to register the `/demo` slash command with your test server:
    ```sh
    node deploy-commands.js
    ```

4.  **Run the Bot:**
    ```sh
    npm start
    ```

## 🤖 Usage

Once the bot is running, you can use the `/demo` command in your test server to see the modal in action.
