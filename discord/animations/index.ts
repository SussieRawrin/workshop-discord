import { animateCode } from './animate';
import { newImage } from './capture';

/**
 * will make an image given @options { code, color }
 * @param { code, color } options for the image
 * @gives a path to the new image
*/
export function newPreviewImage({ code, color }: { code: string, color: string }): Promise<string> {
  /* Assign the image path */
  const path = `void/${ code.toUpperCase() }.png`;

  return newImage(animateCode({ code, color }), path);
}

/*
  base64 encoding did not work, discord can just upload it though :/
    // encoding: 'base64',
    // ('data:image/jpeg;base64,' + image64)
    // type: 'jpeg',
    // quality: 14,
*/
