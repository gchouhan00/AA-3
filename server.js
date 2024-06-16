/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name:GITIKA CHOUHAN Student ID: 169815214 Date: 15 JUNE 2024*
* Published URL: ___________________________________________________________
*
********************************************************************************/
const express = require('express');
const legoData = require("./modules/legoSets");
const app = express();
const HTTP_PORT = 8080;
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/home.html'));
    
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
    
});

app.get('/404', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/404.html'));
    
});

app.get("/lego/sets/", (req, res) => {
    const theme = req.query.theme; 
    if (theme) {
        legoData.initialize().then(() => {
            legoData.getSetsByTheme(theme).then((sets)=> {
                res.send(sets); 
            }).catch((error) => {
                res.status(500).send(`Error: ${error.message}`);
            });
        }).catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
    } else {
        legoData.initialize().then(() => {
            legoData.getAllSets().then((sets)=> {
                res.send(sets); 
            }).catch((error) => {
                res.status(500).send(`Error: ${error.message}`);
            });
        }).catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
    }
});

app.get('/lego/sets/num-demo/:setNum', (req, res) => {
    const setNum = req.params.setNum;
    console.log("Received setNum:", setNum);
   
   legoData.getSetByNum(setNum)
   .then(numSet => {
    res.json(numSet);
   })
   .catch(error => {
    res.status(500).send(`Error: ${error.message}`);
   });
});


// app.get('/lego/sets/theme-demo/:theme', (req, res) => {
//     const theme = req.params.theme;
//     console.log("Received theme:", theme);

//     legoData.getSetByTheme(theme)
//     .then(themeSets => {
//         res.json(themeSets);
//     })
//     .catch(error => {
//         res.status(500).send(`Error: ${error.message}`);
//     });
// })











app.listen(HTTP_PORT, () => console.log(`The server is listening on: ${HTTP_PORT}`));
