const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://gabrielvoirin40-del.github.io'
}));

app.use(express.json());

const express = require('express');
const cors = require('cors');
const { Client } = require('discord.js-selfbot-v13');

const app = express();

app.use(cors({
    origin: 'https://gabrielvoirin40-del.github.io'
}));

app.use(express.json());

let client = null;

app.post('/connect-bot', async (req, res) => {
    const { token } = req.body;
    
    if (client) {
        try { client.destroy(); } catch (e) {}
    }
    
    try {
        client = new Client({ checkUpdate: false });
        
        client.on('ready', () => {
            console.log(`✅ Connecté : ${client.user.tag}`);
        });
        
        await client.login(token);
        
        await new Promise((resolve) => {
            if (client.user) resolve();
            else client.once('ready', resolve);
        });
        
        res.json({ 
            success: true, 
            botName: client.user.username,
            botId: client.user.id
        });
        
    } catch (error) {
        console.error('❌ Erreur:', error.message);
        res.json({ 
            success: false, 
            message: 'Token invalide'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur sur le port ${PORT}`);
});
