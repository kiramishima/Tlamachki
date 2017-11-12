var cv = require('opencv');
var path = require('path');

if (cv.ImageSimilarity === undefined) {
  console.log('TODO: Please port Features2d.cc to OpenCV 3')
  process.exit(0);
}

const db = [
    {
        name: "Artesanos de Puebla",
        lat: 19.0434476,
        lng: -98.2630706,
        address: 'Calle 6 Nte 205, Centro, 72000 Puebla, Pue',
        tel: 2224878965,
        desc: 'Artesanias de barro pintadas a mano, piel, etc'
    },
    {
        name: "La Casa de las Artesanías de Oaxaca",
        lat: 17.0640541,
        lng: -96.7950401,
        address: 'Gral. Ignacio Zaragoza, Centro, Oaxaca, Oax',
        tel: 4878965,
        desc: 'Talleres de bordado, barro, piel, figurillas ,etc'
    }
];

module.exports = function (image) {
    return new Promise((resolve, reject) => {
    cv.readImage(path.join(__dirname, "./files/mona_lisa1.jpg"), function(err, car1) {
        if (err) {reject(err);}
        cv.readImage(path.join(__dirname, "./files/mona_lisa2.jpg"), function(err, car2) {
            if (err) {reject(err);}
          cv.readImage(path.join(__dirname, image), function(err, car3) {
            if (err) {reject(err);}
                cv.ImageSimilarity(car1, car2, function (err, dissimilarity) {
                    if (err) throw err;
                    // console.log('Dissimilarity: ', dissimilarity);
                    // console.log(db[Math.floor(Math.random() * db.length)]);
                    resolve(db[Math.floor(Math.random() * db.length)]);
                });
            });
        });

      });
    });
}