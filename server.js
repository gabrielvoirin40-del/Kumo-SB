const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://gabrielvoirin40-del.github.io'
}));

app.use(express.json());

app.post('/connect-bot', async (req, res) => {
    const { token } = req.body;
    
    try {
        // Vérifier le token via l'API Discord
        const response = await fetch('https://discord.com/api/v10/users/@me', {
            headers: {
                'Authorization': token
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            
            res.json({ 
                success: true, 
                botName: userData.username,
                botId: userData.id
            });
        } else {
            res.json({ 
                success: false, 
                message: 'Token invalide'
            });
        }
        
    } catch (error) {
        console.error('Erreur:', error.message);
        res.json({ 
            success: false, 
            message: 'Erreur de connexion'
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
