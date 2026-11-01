var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session'); 
var CryptoJS = require("crypto-js");
var officegen = require('officegen');
const fs = require('fs-extra');
var async = require ('async');

var Proposal = require('./models/proposal');

var settings = require("./settings");

var webDir = path.join(settings.baseDir, settings.webDir);

//connect to db
mongoose.connect(settings.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //console.log('Connected to MongoDb');
});

// init app
var app = express();

app.use(express.static(webDir));   

//Pretify JSON
app.set('json spaces', 40);

//app.use(express.static(__dirname + '/dist'));   

//body parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(expressSession({
        secret: 'securedsession',
        resave: false,
        saveUninitialized: false
}));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './dist/assets/images/proposals/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
       // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        cb(null, file.originalname);
    }
});

var storagePdf = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './dist/assets/docs/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
       // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
        cb(null, file.originalname);
    }
});


var upload = multer({ //multer settings
                storage: storage
            }).single('file');

var uploadPDf = multer({ //multer settings
    storage: storagePdf
}).single('file');


/** API path that will upload the files */
app.post('/upload', function(req, res) {
   
    
    upload(req, res, function(err){
        console.log(req.file);
        console.log("req:", req);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
        // var dir = JSON.parse(req.body.data).directory;
        // var filename = req.file.filename;
        /* var dir = "/images/proposals";
     

        fs.move('./dist/assets/' + req.file.filename, './dist/assets/' + dir + '/' + req.file.filename, { overwrite: true }, err => {
            if (err) return console.error(err)
            res.json({error_code:0,err_desc:null});
          })*/
         
    });
});

/** API path that will upload the files */
app.post('/upload-files', function(req, res) {
    uploadPDf(req, res, function(err){
        console.log(req.file);
        console.log("req:", req);
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});

function removeEmojis (line) {
    console.log(line)
    if(line) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
       
        return line.replace(regex, '');
        
    } else 
    { 
      
        return line;
    }
    
}


app.get('/import', function(req, res) {

    var docx = officegen ( {
        type: 'docx',
        orientation: 'portrait',
        pageMargins: { top: 1000, left: 1000, bottom: 1000, right: 1000 }
        // The theme support is NOT working yet...
        // themeXml: themeXml
    } );

    Proposal.find(function(err, proposals) {
        if (err) console.log(err);
        docx.on ( 'error', function ( err ) {
            console.log ( err );
        });
        
        docx.setDocSubject ( "Pressupostos Participatius de La Bisbal del Penedès 2026");
        docx.setDocKeywords ( 'propostes, La Bisbal del Penedès 2026' );
        docx.setDescription ( "Pressupostos Participatius de La Bisbal del Penedès 2026" );
        var pObj = docx.createP ();

        pObj.addText ( "Pressupostos Participatius de La Bisbal del Penedès 2026", { bold: true, font_size: 18 }  );

            var index = 1;
           // console.log("generate table");
            proposals.forEach(function(proposal) {
               
                if(proposal.howEntity === undefined) {
                    proposal.howEntity = "";  
                }

                proposal.title = removeEmojis(proposal.title);
                proposal.object = removeEmojis(proposal.object);
                proposal.description = removeEmojis(proposal.description);
                proposal.location = removeEmojis(proposal.location);

                var pObj = docx.createP (); 
                var table = [
                    [ {
                      val: 'PROPOSTA ' + index.toString(),
                      opts: {
                        cellColWidth: 4261,
                        b: true,                        
                        align: 'left'                       
                      }
                    }, {
                      val: '',
                      opts: {
                        align: 'center',
                        cellColWidth: 4261,
                        b: true                        
                        
                      }
                    }],
                    ['Qui la fa?', proposal.author.name],
                    ['Com la fa?', proposal.how + ' ' + proposal.howEntity ],
                    ['DNI', proposal.author.dni],                
                    ['Telèfon', proposal.author.phone],
                    ['e-mail', proposal.author.email],
                    ['Títol', proposal.title],
                    ['Necessitat', proposal.object],
                    ['Descripció', proposal.description],
                    ['Ubicació', proposal.location],
                    ['Categoria (€)', ''],
                    ['Descartada (motiu)', '']
                    
                  ]
            

        /*    var tableStyle = {
                tableColWidth: 4261,
                tableSize: 24,
                tableColor: "ada",
                tableAlign: "left",
                tableFontFamily: "Arial"
            } */

            var tableStyle = {
                tableColWidth: 4261,
                tableSize: 24,
                tableColor: "ada",
                tableAlign: "left",
                tableFontFamily: "Arial",
                borders: true
              }

            pObj = docx.createTable (table, tableStyle);
            index ++;
            });

            

            var out = fs.createWriteStream ( 'tmp/out.docx' );

            out.on ( 'error', function ( err ) {
                console.log ( err );
            });

            async.parallel ([
                function ( done ) {
                    out.on ( 'close', function () {
                       // console.log ( 'Finish to create a DOCX file.' );

                        done ( null );
                        docx.generate ( out );
                         res.download('tmp/out.docx'); 
                        
                        
                    });
                    docx.generate ( out );
                   
                    
                    
                }

            ], function ( err ) {
                if ( err ) {
                    console.log ( 'error: ' + err );
                } // Endif.
            }); 

    })
            
})  

//set routes
var microsite = require('./routes/microsite.js');
var queries = require('./routes/queries.js');
var queryInfo = require('./routes/info.js');
var census = require('./routes/census.js');
var pages = require('./routes/pages.js');
var proposals = require('./routes/proposals.js');
var users = require('./routes/users.js');


app.use('/microsite', microsite);
app.use('/census', census);
app.use('/queries', queries);
app.use('/query-info', queryInfo);
app.use('/census', census);
app.use('/pages', pages);
app.use('/proposals', proposals);
app.use('/users', users);


//start the server
app.listen(settings.port, function(){
    console.log('Server running at ' + settings.port);
})


app.get('*', function(req, res) {
        res.sendFile(path.join(webDir, 'index.html')); // load the single view file (angular will handle the page changes on the front-end)
});

