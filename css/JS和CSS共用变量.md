# JS和CSS共用变量

```css
$subMenuHover:#001528;

$sideBarWidth: 210px;

// the :export directive is the magic sauce for webpack
// https://www.bluematador.com/blog/how-to-share-variables-between-js-and-sass

:export {
  subMenuHover: $subMenuHover;
}

```
