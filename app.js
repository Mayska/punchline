console.log("Démarrage => coucou");
var fs = require("fs"),
    vm = require('vm');
// Appel de config.js pour la configuration DEV ou PROD
vm.runInThisContext(fs.readFileSync(__dirname + "/config/config.js"))
// Init librairie
express = require('express'),
bodyParser = require('body-parser'),
session = require ('express-session'),
ejs = require('ejs'),
app = express();

// Déclaration dossier static
app.use('/', express.static(__dirname + '/app'));

// Ejs
app.set('views',__dirname + '/app/views');
app.engine('html', require('ejs').renderFile);


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(session({secret: 'monsecret'}));

console.log(__dirname + '/app');
console.log("Dossier static => Start");

// Routes
// Affichage de la PunshLine
app.get('/', function (req, res) {
    console.log("racine '/'");
    var MaPunshLine = punshLine();
    
    // gestion de la vue
    res.render('__layout.ejs',
        {       
            navbarre : false,
            partiel: "generateur",
            debut : MaPunshLine.debut, 
            fin : MaPunshLine.fin
    });
});

// j'affiche le formulaire d'identification
app.get('/login', function(req,res){
    console.log("GET => /login");
        res.render('__layout.ejs',{
            navbarre : false,
            partiel : "identification"
    });

    //req.session.password = req.body.password;
})

app.post('/login', function(req,res){
    console.log("POST => /login");
    
    if(req.body.email == "Email"){
        console.log("DANS MON IF");
        req.session.mail = req.body.email;
        res.redirect('/ajouter');
        /*
        res.render('__layout.ejs',
        {
            navbarre : true,
            partiel: "ajouter"
        });
        */
       res.redic
    }
    else{
        res.render('__layout.ejs',{
            navbarre : false,
            partiel : "identification"
        });
    }

    //req.session.password = req.body.password;
})

// ajouter une PunshLine après identification
app.get('/ajouter', function(req,res){
    console.log("GET => /ajouter");
    if(req.session.mail){
        res.end('/ajouter');
    }
    else{
        res.redirect('/');
    }
    /*
    console.log("GET => /ajouter");
    res.render('__layout.ejs',
    {
        navbarre : true,
        partiel: "ajouter"
    });
    */
})

// fonction génération de la PunshLine
function punshLine(){
    var maxDebutNb = obj.dedut.length,
        maxFinNb = obj.fin.length;
    var DNB = random(maxDebutNb),
        FNB = random(maxFinNb);
    var MonObj ={ debut : obj.dedut[DNB], fin : obj.fin[FNB]  }
    return MonObj;
}

function random(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

// Démarrage serveur
app.listen(3000);