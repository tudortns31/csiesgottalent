const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database(' baza_de_date.db', (err) =>{
    if(err){
        console.error('Eroare la conectare la baza de date', err.message);
    }else{
        console.log('Conectat cu succes');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS mesaje (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nume TEXT,
    email TEXT,
    mesaj TEXT,
    data_crearii DATETIME DEFAULT CURRENT_TIMESTAMP
)`, (err) => {
    if (err) {
        console.error('Eroare la crearea tabelului:', err.message);
    } else {
        console.log('Tabelul "mesaje" este pregătit.');
    }
});

app.listen(PORT, () =>{
    console.log('Serverul ruleaza pe http://cyber-stars:${PORT}');
});
app.post('./trimite-formular', (req,res) =>{
    const{ nume, email, mesaj } = req.body;
    if (!nume || !email || !mesaj) {
        return res.status(400).json({ eroare: 'Toate câmpurile sunt obligatorii!' });
    }
    const query = 'INSERT INTO mesaje (nume, email, mesaj) VALUES (?, ?, ?)';
    db.run(query, [nume, email, mesaj], function(err) {
        if (err) {
            return res.status(500).json({ eroare: 'Eroare la salvarea în baza de date.' });
        }
        res.status(200).json({ 
            succes: true, 
            mesaj: 'Datele au fost salvate cu succes!', 
            id_inregistrare: this.lastID 
        });
    });
}); //hello siscotii :3