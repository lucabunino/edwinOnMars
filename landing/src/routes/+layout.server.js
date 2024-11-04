// +layout.server.js

export const load = async () => {
  const colorPairs = [
    ['#10069F', '#BA5826', '/drawings/1.svg', '/drawings/1-mobile.svg',
     '/img/chair.webp', 'max-width: 45vw; max-height: 70vh; bottom: var(--gutter); right: 10vw',
     '/img/chair-mobile.webp','max-width: 90vw; max-height: 50vh; top: 50%; left: 50%; transform: translate(-50%, -50%)'],
    ['#FFFBC1', '#43B02A', '/drawings/2.svg', '/drawings/2-mobile.svg',
     '/img/table.webp', 'max-width: 45vw; max-height: 70vh; bottom: 10vh; right: 10vw',
     '/img/table.webp','max-width: 90vw; max-height: 60vh; top: 50%; left: 50%; transform: translate(-50%, -50%)'],
    // ['#FFFBC1', '#10069F'],
    // ['#43B02A', '#FFFBC1'],
    // ['#FFFBC1', '#BA5826']
  ];

  // Randomly select a color pair
  const randomIndex = Math.floor(Math.random() * colorPairs.length);
  const [color1, color2, drawingDots, drawingDotsMobile, imgDesktop, imgStyleDesktop, imgMobile, imgStyleMobile] = colorPairs[randomIndex];

  // Return the selected colors and assets to the layout
  return {
    color1,
    color2,
    drawingDots,
    drawingDotsMobile,
    imgDesktop,
    imgStyleDesktop,
    imgMobile,
    imgStyleMobile
  };
};