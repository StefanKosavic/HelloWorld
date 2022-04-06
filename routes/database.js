var loki = require('lokijs');

var db = new loki('db.json');

db.addCollection('top').insert([
    {language:'eng', text:"Hello World!"},
    {language:'fra', text:"Bonjour le monde"},
    {language:'ita', text:"Ciao mondo"},
    {language:'esp', text:"Hola Mundo"},
    {language:'deu', text:"Hallo Welt"},
    {language:'bos', text:"Zdravo svijete"},
    {language:'irl', text:"Dia duit ar domhan"},
    {language:'pol', text:"Witaj świecie"},
    {language:'slo', text:"Pozdravljen, svet"},
    {language:'swe', text:"Hej världen"}
]);

