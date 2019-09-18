const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json({
    limit: '10mb'
}));

//JWT

app.post('/login',(req, res) => {
    var username = req.body.user;
    var password = req.body.pass;

    console.log(`${username} : ${password}`);

    if(!(username === "Juan" && password === "12345")){
        res.status(401).send({
            error: 'Usuario o contraseña no válidos'
        });
    }

    var tokenData = {
        username
    }

    var token = jwt.sign(tokenData, 'Secret Password', {
        expiresIn: 60*60*24
    });

    res.send({
        token
    });

});

app.get('/private', (req,res) => {
    let token = req.headers['authorization'];

    if(!token){
        res.status(401).send({
            error: 'Necesita un token ...!'
        });
    }else{
        console.log('Entró')
    }

    token = token.replace('Bearer ', '')
    jwt.verify(token, 'Secret Password', function(err, user) {
      if (err) {
        res.status(401).send({
          error: 'Token inválido'
        })
      } else {
        res.send({
          message: 'Fuck yeah!!!!'
        })
      }
});

});



app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});