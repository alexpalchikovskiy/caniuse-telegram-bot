
const config = require( './config' );

const http = require( './http' );
const Answer = require( './answer' );
const TelegramBot = require( 'node-telegram-bot-api' );

const bot = new TelegramBot( config.token, { polling: true } );

const sendAnswer = ( chatId, query ) => {
    const a = new Answer( query );
    
    bot.sendMessage( chatId, a.message, a.options );
}

bot.onText( /(.+)/, ( message, match ) => sendAnswer( message.chat.id, match[0] ) );

bot.on( 'callback_query', r => sendAnswer( r.message.chat.id, r.data ) );
