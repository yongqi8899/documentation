# 7. scss Precompiler 

## 7.1 Abhängigkeitspakete herunterladen
```shell
npm install -D node-sass@4.14.1 --save-dev
npm install sass-loader@7.3.1 --save-dev
npm install style-loader --save-dev
```

## 7.2 scss in Komponenten verwenden
```vue
<style lang="scss" scoped>

</style>
```

## 7.3  reset
src/assets/global/css/reset.scss
```scss
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}


```

## 7.4  main style
src/assets/global/css/main.scss
```scss
@charset "utf-8";

:root {
  --themeColor: #e87a90;
  --text: #337267;
  --white:#fff;
  --orange:rgb(235, 143, 6);
  --blue:#3498db;
  --bgColor:#dcdcdc;
  --transparent:#ffff0000;
  --silber: #c0c0c0;
}
* {
  font-family: "Roboto", sans-serif;
  cursor: url("../../img/flesh.png"), auto;
  box-sizing: border-box;
}
h1,h2,i {
  color: var(--themeColor);
}
h1{
  font-size: 1.5rem;
}
.layout {
  // margin-top: 4rem;
  display: flex;
  flex-wrap: nowrap;
}

.left {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
 
  &.h2 {
    align-self: flex-start;
    margin-bottom: 5%;
  }
}

.recht {
  display: flex;
  width: 100%;
  padding: 2rem;
  align-items: center;
}
.pkBg{
  background-color: var(--themeColor);
  color: var(--white);
}

a{
  text-decoration: none;
}
// -----------button style-----------
@media only screen and (max-width: 768px) {
  .layout {
    flex-wrap: wrap;
  }
  .left {
    background-color: rgba(40, 101, 183, 0);
  }
  .recht {
    z-index: 10;
  }
}

```
## 7.5  src/main.js
```js
import './assets/global/css/reset.scss';
import './assets/global/css/main.scss';
```