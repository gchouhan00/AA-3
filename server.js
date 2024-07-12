/********************************************************************************
* WEB322 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name:GITIKA CHOUHAN Student ID: 169815214 Date: 16 JUNE 2024*
* Published URL:https://aa-3.vercel.app/
*
********************************************************************************/
const express = require('express');
const legoData = require("./modules/legoSets");
const app = express();
const HTTP_PORT = 8080;
const path = require('path');
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static("public"));
//app.use(express.static(path.join(__dirname, 'public')));
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '/views/home.html'));
    
// });

app.get('/', (req, res) => {
    
    //res.sendFile(path.join(__dirname, "/views/home.html"));
    res.render("home");

});
app.get('/about', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/about.html'));
    res.render("about");
});

app.get('/404', (req, res) => {
    //res.sendFile(path.join(__dirname, '/views/404.html'));
    res.render("404");
});

app.get("/lego/sets/", (req, res) => {
    const theme = req.query.theme; 
    if (theme) {
        legoData.initialize().then(() => {
            legoData.getSetsByTheme(theme).then((sets)=> {
                //res.send(sets);
                res.render("sets", {sets: sets}); 
            }).catch((error) => {
                res.status(404).send("404", {message: "No sets found for a matching theme"});
            });
        }).catch((error) => {
            res.status(500).send(`Error: ${error.message}`);
        });
    } else {
        legoData.initialize().then(() => {
            legoData.getAllSets().then((sets)=> {
                //res.send(sets); 
                res.render("sets", {sets: sets}); 
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
   .then(set => {
    //res.json(numSet);
    res.render("set", {set: set});
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




app.use((req, res) => {
    res.status(404).render("404", {message: "Page not found"});
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    if(err.status === 404){
        res.status(404).render("404", {message: "Page not found"});
    } else {
        res.status(500).render("500", {message: "Internal Server Error"});
    }
});






app.listen(HTTP_PORT, () => console.log(`The server is listening on: ${HTTP_PORT}`));
