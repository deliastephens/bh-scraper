const index = require('./index');

const PRIME_PAGE = 'https://www.bhphotovideo.com/c/product/1317562-REG/sony_sel85f18_fe_85mm_f_1_8_lens.html';
const PRIME_NAME = 'FE 85mm f/1.8 Lens';

const VAR_PAGE = 'https://www.bhphotovideo.com/c/product/1222774-REG/sony_sel2470gm_fe_24_70mm_f_2_8_gm.html';
const VAR_NAME = 'FE 24-70mm f/2.8 GM Lens';

test(
  `verifies that url is returning the focal length of prime lens as single element array`,
  () => {
  expect(index.scrapeSite(PRIME_PAGE)).toBe([85]);
});

test(
  `verifies that url is returning the focal length of variable lens as array w two elements`,
  () => {
  expect(index.scrapeSite(VAR_PAGE)).toBe([24, 70]);
});
