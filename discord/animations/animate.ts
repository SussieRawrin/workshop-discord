
import { readFileSync } from 'fs';

const font64 = readFileSync('discord/animations/fonts/big_noodle_titling_oblique.ttf').toString('base64');

/**
 * will make a html string given @options { code, color }
 * @param { code, color } options for the image
 * @gives a path to the new image
*/
export function animateCode({ code, color }: { code: string, color: string }) {
  return (`
<div>
  <span>
  ${ code }
  </span>
  </div>
  <style>
  @font-face {
    font-family: 'koverwatch';
    src: url(data:font/truetype;charset=utf-8;base64,${ font64 }) format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  
  html {
  }
  
  div {
    background-color: ${ color };
    font-family: koverwatch;
    text-align: center;
    font-weight: 500;
    letter-spacing: 0px;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.2' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E");
    background-repeat: repeat;
    color: rgb(255, 255, 255);
    width: 290px;
    font-size: 69px;
    border-radius: 9px;
  }
  </style>
`);
}
