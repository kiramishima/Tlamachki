var cv = require('opencv');
var path = require('path');

if (cv.ImageSimilarity === undefined) {
  console.log('TODO: Please port Features2d.cc to OpenCV 3')
  process.exit(0);
}


cv.readImage(path.join(__dirname, "./files/mona_lisa2.jpg"), function(err, car1) {
  if (err) throw err;
  console.log(car1)
  cv.readImage(path.join(__dirname, "./files/mona_lisa3.jpg"), function(err, car2) {
    if (err) throw err;

    cv.ImageSimilarity(car1, car2, function (err, dissimilarity) {
      if (err) throw err;

      console.log('Dissimilarity: ', dissimilarity);
    });

  });

});