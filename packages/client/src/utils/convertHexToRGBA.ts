/** Принимает цвет в виде #000000 и прозрачность, и возвращает цвет в rgba
 * Example:
 * convertHexToRGBA('#000000', 0.5) => 'rgba(0,0,0,0.5)'
 * convertHexToRGBA('#123456', 50) => 'rgba(18,52,86,0.5)'
 * */
export const convertHexToRGBA = (hexCode: string, opacity = 1): string => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  if (opacity > 1 && opacity <= 100) {
    opacity = opacity / 100;
  }

  return `rgba(${r},${g},${b},${opacity})`;
};
