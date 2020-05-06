
const http = require("http");
const url = require("url");
const querystring = require("querystring");

const listaArtikla = [{
    "id": 1,
    "naziv": "Mleko",
    "cena": 100,
    "ImeKompanije": "MojaKravica"
},
{
    "id": 2,
    "naziv": "CocaCola",
    "cena": 100,
    "ImeKompanije": "CocaCola"
}
];



const server = http.createServer(function (req, res) {

    var urlObj = url.parse(req.url, true, false);
    if (req.method == "GET") {
        if (urlObj.pathname == "/") {
            res.writeHead(200);
            res.end(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <head>
                <body>
                    <form action="/svi-artikli" method="GET">
                    <label>Svi Artikali</label><br>
                    <label for="imeKompanije">Unesite Ime kompanije</label><br>
                    <input name="imeKompanije" type="text"><br>
                    <button type="submit">Submit</button><br>
                    </form><br>
                    <form action="/dodaj-artikal" method="POST">
                    <label>Dodaj Artikal</label><br>

                    <label for="id">Unesite ID</label><br>
                    <input name="id" type="text"><br>

                    <label for="naziv">Unesite Naziv</label><br>
                    <input name="naziv" type="text"><br>

                    <label for="cena">Unesite Cena</label><br>
                    <input name="cena" type="text"><br>

                    <label for="imeKompanije">Unesite Ime kompanije</label><br>
                    <input name="imeKompanije" type="text"><br>
                    <button type="submit">Submit</button><br>

                    </form><br>
                    
                    <form action="/obrisi-artikal" method="GET">
                    <label>Obrisi Artikal</label><br>
                    <label for="id">Unesite Ime kompanije</label><br>
                    <input name="id" type="text"><br>
                    <button type="submit">Submit</button><br>
                    </form><br>

                    <form action="/izmeni-artikal" method="POST">
                    <label>Izmeni Artikal</label><br>

                    <label for="id">Unesite ID</label><br>
                    <input name="id" type="text"><br>

                    <label for="naziv">Unesite Naziv</label><br>
                    <input name="naziv" type="text"><br>

                    <label for="cena">Unesite Cena</label><br>
                    <input name="cena" type="text"><br>

                    <label for="imeKompanije">Unesite Ime kompanije</label><br>
                    <input name="imeKompanije" type="text"><br>
                    <button type="submit">Submit</button><br>

                    </form><br>
                    
                </body>
            </html>`);
        }

        if (urlObj.pathname == "/svi-artikli") {

            var imeKompanije = urlObj.query.imeKompanije;
            res.writeHead(200);
            res.end(JSON.stringify(sviArtikli(imeKompanije)));
        }
        if (urlObj.pathname == "/obrisi-artikal") {

            var id = urlObj.query.id;
            res.writeHead(200);
            obrisiArtikal(parseInt(id));
            res.end("Obrisano");
        }
    }
    if (req.method == "POST") {
        if (urlObj.pathname == "/dodaj-artikal") {
            let body = "";
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                dodajArtikal(parseInt(querystring.parse(body).id), querystring.parse(body).naziv, parseInt(querystring.parse(body).cena), querystring.parse(body).imeKompanije);
                res.end("Artikal dodat");
            });

        }
        if (urlObj.pathname == "/izmeni-artikal") {
            let body = "";
            req.on('data', function (data) {
                body += data;
            });
            req.on('end', function () {
                izmeniArtiakal(parseInt(querystring.parse(body).id), querystring.parse(body).naziv, parseInt(querystring.parse(body).cena), querystring.parse(body).imeKompanije);
                res.end("Artikal izmenjen");
            });

        }
    }



});

var port = 80;
var host = "127.0.0.1";

server.listen(port, host);
console.log(`Server radi na ${host}:${port}`);



function dodajArtikal(id, naziv, cena, imeKompanije) {
    artikal = {
        "id": id,
        "naziv": naziv,
        "cena": cena,
        "ImeKompanije": imeKompanije
    };
    listaArtikla.push(artikal);

}
function sviArtikli(imeKompanije) {
    var lista = [];
    for (var a in listaArtikla) {
        if (listaArtikla[a].ImeKompanije == imeKompanije) {
            lista.push(listaArtikla[a]);
        }
    }
    if (lista.length == 0) {
        return listaArtikla;
    }
    else {
        return lista;
    }
}
function obrisiArtikal(id) {
    for (var a in listaArtikla) {
        if (listaArtikla[a].id == id) {
            listaArtikla.splice(a, 1);
        }
    }
}
function izmeniArtiakal(id, naziv, cena, imeKompanije) {
    for (var a in listaArtikla) {
        if (listaArtikla[a].id == id) {
            listaArtikla[a].naziv = naziv;
            listaArtikla[a].cena = cena;
            listaArtikla[a].ImeKompanije = imeKompanije;

        }
    }

}