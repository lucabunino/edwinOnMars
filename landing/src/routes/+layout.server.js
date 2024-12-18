// +layout.server.js

export const load = async () => {
  const colorPairs = [
    ['#FFFBC1', '#BA5826', '/drawings/1.webp', '/drawings/1-mobile.webp',
     '/img/chair.webp', 'max-width: 45vw; max-height: 70vh; bottom: var(--gutter); right: 10vw',
     '/img/chair-mobile.webp','max-width: 90vw; max-height: calc(30vh + 20vw); top: 47%; left: 50%; transform: translate(-50%, -50%)'],
    ['#10069F', '#FFFBC1', '/drawings/2.webp', '/drawings/2-mobile.webp',
     '/img/table.webp', 'max-width: 45vw; max-height: 70vh; bottom: 5vh; right: 10vw',
     '/img/table.webp','max-width: 75vw; max-height: calc(27vh + 20vw); top: 44%; left: 50%; transform: translate(-50%, -50%)'],
    ['#FFFBC1', '#10069F', '/drawings/3.webp', '/drawings/3-mobile.webp',
     '/img/armchair.webp', 'max-width: 50vw; max-height: 75vh; bottom: var(--gutter); right: 10vw',
     '/img/armchair.webp', 'max-width: 90vw; max-height: calc(29vh + 20vw); top: 45%; left: 50%; transform: translate(-50%, -50%)'],
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