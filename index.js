const request = require('superagent');
const cheerio = require('cheerio');

function findFocalLength(name) {
  var lengths = [];
  if(name.indexOf('-') !== -1){
    lengths[0] = Number(/[0-9]+-/.exec(name)[0].replace('-', ''));
    lengths[1] = Number(/[0-9]+mm/.exec(name)[0].replace('mm', ''));
  } else {
    lengths[0] = Number(/[0-9]+mm/.exec(name)[0].replace('mm', ''));
  }
  return(lengths);
}

function scrapeSite(url){
  request.get(uri).end((err, response) => {
    const $ = cheerio.load(response.text);

    const name = $("*[itemprop='name']").text().trim();
    console.log(name);
    console.log(findFocalLength(name));
  });
}
