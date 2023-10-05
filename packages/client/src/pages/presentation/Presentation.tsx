import PageFrame from '@/components/PageFrame/PageFrame'
import classes from './styles.module.less'
import pc1 from '../../../public/pc1.jpg'
import pc2 from '../../../public/pc2.jpg'
import pc3 from '../../../public/pc3.jpg'
import logo from '../../../public/logo.png'
import classNames from 'classnames'
const cx = classNames.bind(classes)

const Presentation: React.FC = () => {
  return (
    <PageFrame pageType="default">
      <div className={classes.presentation}>
        <img src={logo} className={classes.presentation__logo} />
        <div
          className={cx(
            classes.presentation__item,
            classes.presentation__item_first
          )}>
          <p className={classes.presentation__text}>
            <span
              className={cx(
                classes.presentation__text,
                classes.presentation__text_main
              )}>
              Те́трис
            </span>{' '}
            (производное от «тетрамино» и «теннис») — компьютерная игра,
            первоначально изобретённая и разработанная советским программистом
            Алексеем Пажитновым. Игра была выпущена 6 июня 1984 года — в это
            время Пажитнов работал в Вычислительном центре Академии наук СССР.
            <br />
            <br />
            «Тетрис» представляет собой головоломку, построенную на
            использовании геометрических фигур «тетрамино» — разновидности
            полимино, состоящих из четырёх квадратов.
          </p>
          <img src={pc1} className={classes.presentation__img} />
        </div>
        <div
          className={cx(
            classes.presentation__item,
            classes.presentation__item_second
          )}>
          <p className={classes.presentation__text}>
            Первоначальная версия игры была написана языке Паскаль для
            компьютера «Электроника-60». Коммерческая версия игры была выпущена
            американской компанией Spectrum HoloByte в 1987 году.
            <br />
            <br />В последующие годы «Тетрис» был портирован на великое
            множество устройств, включая всевозможные компьютеры и игровые
            консоли, а также графические калькуляторы, мобильные телефоны,
            медиаплееры, карманные персональные компьютеры и — в качестве
            «пасхального яйца» — устройства, вовсе не предназначенные для
            воспроизведения медиаконтента, такие, как паяльник
          </p>
          <img src={pc2} className={classes.presentation__img} />
        </div>
        <div
          className={cx(
            classes.presentation__item,
            classes.presentation__item_third
          )}>
          <p className={classes.presentation__text}>
            <p className={classes.presentation__title}>Правила</p>
            Случайные фигурки тетрамино падают сверху в прямоугольный стакан
            шириной 10 и высотой 20 клеток. В полёте игрок может поворачивать
            фигурку на 90° и двигать её по горизонтали. Также можно «сбрасывать»
            фигурку, то есть ускорять её падение, когда уже решено, куда фигурка
            должна упасть. Фигурка летит до тех пор, пока не наткнётся на другую
            фигурку либо на дно стакана. Если при этом заполнился горизонтальный
            ряд из 10 клеток, он пропадает и всё, что выше него, опускается на
            одну клетку.
            <br />
            <br />
            Дополнительно показывается фигурка, которая будет следовать после
            текущей — это подсказка, которая позволяет игроку планировать
            действия. Темп игры постепенно ускоряется.
            <br />
            <br />
            Игра заканчивается, когда новая фигурка не может поместиться в
            стакан. Игрок получает очки за каждый заполненный ряд, поэтому его
            задача — заполнять ряды, не заполняя сам стакан (по вертикали) как
            можно дольше, чтобы таким образом получить как можно больше очков.
          </p>
          <img src={pc3} className={classes.presentation__img} />
        </div>
      </div>
    </PageFrame>
  )
}

export default Presentation
