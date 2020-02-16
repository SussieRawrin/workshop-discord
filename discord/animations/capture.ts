
import { launch } from 'puppeteer';

/**
 * will make an image given @options { code, color }
 * @param { code, color } options for the image
 * @gives a path to the new image
*/
export async function newImage(html5: string, path: string): Promise<string> {
  /* Display HTML in a new browser window */
  const browser = await launch();
  const page = await browser.newPage();
  await page.setContent(html5);
  const div = await page.$('div');
  if (!div) throw new Error();

  /* Take a picture of the window */
  await div.screenshot({
    path,
    omitBackground: true,
    type: 'png',
  });

  /* Exit browser and give path to the new image */
  await browser.close();
  return path;
}
