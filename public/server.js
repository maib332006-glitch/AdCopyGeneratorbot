const express = require('express');
const { Bot, InlineKeyboard } = require('grammy');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;
const APP_URL = process.env.URL || `http://localhost:${PORT}`;

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

if (BOT_TOKEN) {
  const bot = new Bot(BOT_TOKEN);

  // Command handler: Send native Telegram WebApp button
  bot.command(['start', 'app'], async (ctx) => {
    const keyboard = new InlineKeyboard().webApp(
      '⚡ Open Ad Copy Generator',
      APP_URL
    );

    await ctx.reply(
      'Welcome! Click the button below to launch the Ad Copy Generator Mini App inside Telegram:',
      { reply_markup: keyboard }
    );
  });

  bot.start();
  console.log('Telegram Bot engine initialized.');
} else {
  console.log('BOT_TOKEN missing. Serve static app only.');
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
