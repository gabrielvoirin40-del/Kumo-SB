const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let bot = null;

app.post('/connect-bot', async (req, res) => {
    const { token } = req.body;
    
    try {
        bot = new Client({ 
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages
            ] 
        });
        
        await bot.login(token);
        
        res.json({ 
            success: true, 
            botName: bot.user.username,
            botId: bot.user.id
        });
        
    } catch (error) {
        res.json({ 
            success: false, 
            message: 'Token invalide' 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
