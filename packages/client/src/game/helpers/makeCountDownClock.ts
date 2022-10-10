const MILLISECONDS_LIMIT = 60 * 1000;

// изменяет линию таймера в зависимости от пройденного времени и отрисовывает кол-во оставшихся секунд
const changeCountDown = (params: {
  dateStartMs: number;
  ctx: CanvasRenderingContext2D;
  mapWidth: number;
  mapHeight: number;
  onTimeOut: () => void;
}) => {
  setTimeout(() => {
    const { dateStartMs, ctx, mapWidth, mapHeight, onTimeOut } = params;

    const dateNow = new Date();
    const dateNowMs = dateNow.getTime();

    const remainingMs = Math.ceil(MILLISECONDS_LIMIT - (dateNowMs - dateStartMs));
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    const remainingSecondsStr =
      remainingSeconds >= 10 ? remainingSeconds.toString() : '0' + remainingSeconds.toString();

    ctx.clearRect(0, 0, mapWidth, mapHeight);

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.font = `bold ${mapHeight * 0.8}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillText(remainingSecondsStr, mapWidth / 2, mapHeight * 0.8);

    const gradientBack = ctx.createLinearGradient(0, 0, mapWidth, 0);
    gradientBack.addColorStop(0, 'rgba(241,18,27,0.2)');
    gradientBack.addColorStop(0.5, 'rgba(251, 252,53, 0.2)');
    gradientBack.addColorStop(1, 'rgba(42,127,16,0.2)');

    ctx.fillStyle = gradientBack;
    ctx.fillRect(0, 0, mapWidth, 10);

    const gradient = ctx.createLinearGradient(0, 0, mapWidth, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'green');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, ((mapWidth / (MILLISECONDS_LIMIT / 1000)) * remainingMs) / 1000, 10);

    if (remainingMs <= 0) {
      onTimeOut();
    } else {
      changeCountDown(params);
    }
  }, 50);
};

// создает рисунок с линией таймера и кол-вом оставшихся секунд
export const makeCountDownClock = (mapWidth: number, mapHeight: number, onTimeOut: () => void) => {
  const canvas = document.createElement('canvas');
  canvas.width = mapWidth;
  canvas.height = mapHeight;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const dateStart = new Date();
  const dateStartMs = dateStart.getTime();

  changeCountDown({
    dateStartMs,
    ctx,
    mapWidth,
    mapHeight,
    onTimeOut: onTimeOut,
  });

  return canvas;
};
