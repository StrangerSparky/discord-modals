# Live Test Bot

This directory contains a live Discord bot to test the functionality of the modal components in a real-world scenario.

## Running the Bot

1.  **Install Dependencies:**
    If you haven't already, install the necessary dependencies by running `npm install` in the root directory of the project.

2.  **Create a `.env` file:**
    In the root directory of the project, create a file named `.env`. This file will store your Discord bot token.

3.  **Add your bot token to the `.env` file:**
    Open the `.env` file and add the following line, replacing `YOUR_BOT_TOKEN` with your actual Discord bot token:
    ```
    DISCORD_TOKEN=YOUR_BOT_TOKEN
    ```

4.  **Run the bot:**
    Once your `.env` file is set up, you can run the bot using the following command in the root directory:
    ```bash
    node examples/live-bot-test.js
    ```

5.  **Test the modal:**
    Once the bot is running and logged in, you can invite it to a server and use the `/testmodal` slash command to open the test modal. When you submit the modal, the parsed data will be logged to the console where you are running the bot.
