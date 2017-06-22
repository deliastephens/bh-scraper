const request = require('superagent');
const cheerio = require('cheerio');
var lengths = [];

const TEST_URL = 'https://www.bhphotovideo.com/c/product/1222774-REG/sony_sel2470gm_fe_24_70mm_f_2_8_gm.html'

findFocalLengths = function(name) {
  var lengths = [];

  // if the lens has dynamic focal length, make an array of min and max
  if(name.indexOf('-') !== -1){
    // gets the number before the hyphen (min focal length)
    lengths[0] = Number(/[0-9]+-/.exec(name)[0].replace('-', ''));
    // gets the number after the hyhen (max focal length)
    lengths[1] = Number(/[0-9]+mm/.exec(name)[0].replace('mm', ''));
  } else {
    // gets the only focal length
    lengths[0] = Number(/[0-9]+mm/.exec(name)[0].replace('mm', ''));
  }
  return(lengths);
}

loadHTML = function(url) {
  return new Promise(
    function (resolve, reject) {
      request.get(url).end((err, response) => {
        const html = cheerio.load(response.text);
        resolve(html);
      });
    }
  )
}

getLengths = function(html) {
  const name = html("*[itemprop='name']").text().trim();
  lengths = findFocalLengths(name);
  return Promise.resolve(lengths);
}

exports.scrapeSite = function(url) {
  loadHTML(url)
    .then(getLengths)
    .then(fulfilled => console.log(fulfilled))
    .catch(error => console.log(error.message));
}
