export async function getImage(src: string) {
  const image = new Image;

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = src;
  });

  return image;
}
