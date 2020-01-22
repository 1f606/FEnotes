### flexbox

记录flexbox的兼容性写法：

```css
1. display: flex
  display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
  display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
  display: -ms-flexbox;      /* TWEENER - IE 10 */
  display: -webkit-flex;     /* NEW - Chrome */
  display: flex;             /* NEW, Spec - Opera 12.1, Firefox 20+ */

2. flex: 1;
-webkit-box-flex: 1;      /* OLD - iOS 6-, Safari 3.1-6 */
  -moz-box-flex: 1;         /* OLD - Firefox 19- */
  width: 20%;               /* For old syntax, otherwise collapses. */
  -webkit-flex: 1;          /* Chrome */
  -ms-flex: 1;              /* IE 10 */
  flex: 1;                  /* NEW, Spec - Opera 12.1, Firefox 20+ */

3. order: 2;
```



1. IE 11 requires a unit to be added to the third argument, the flex-basis property [see MSFT documentation](https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/dev-guides/hh673531%28v%3dvs.85%29#setting-the-flexibility-of-a-child-element)
2. In IE10 and IE11, containers with `display: flex` and `flex-direction: column` will not properly calculate their flexed childrens' sizes if the container has `min-height` but no explicit `height` property.
3. IE 11 does not vertically align items correctly when `min-height` is used [see bug](https://connect.microsoft.com/IE/feedback/details/816293/ie11-flexbox-with-min-height-not-vertically-aligning-with-align-items-center)
4. In IE10 the default value for `flex` is `0 0 auto` rather than `0 1 auto` as defined in the latest spec.
   
   

## The bugs and their workarounds

1. [Minimum content sizing of flex items not honored](https://github.com/philipwalton/flexbugs#flexbug-1)
2. [Column flex items set to `align-items: center` overflow their container](https://github.com/philipwalton/flexbugs#flexbug-2)
3. [`min-height` on a flex container won't apply to its flex items](https://github.com/philipwalton/flexbugs#flexbug-3)
4. [`flex` shorthand declarations with unitless `flex-basis` values are ignored](https://github.com/philipwalton/flexbugs#flexbug-4)
5. [Column flex items don't always preserve intrinsic aspect ratios](https://github.com/philipwalton/flexbugs#flexbug-5)
6. [The default `flex` value has changed](https://github.com/philipwalton/flexbugs#flexbug-6)
7. [`flex-basis` doesn't account for `box-sizing: border-box`](https://github.com/philipwalton/flexbugs#flexbug-7)
8. [`flex-basis` doesn't support `calc()`](https://github.com/philipwalton/flexbugs#flexbug-8)
9. [Some HTML elements can't be flex containers](https://github.com/philipwalton/flexbugs#flexbug-9)
10. [`align-items: baseline` doesn't work with nested flex containers](https://github.com/philipwalton/flexbugs#flexbug-10)
11. [Min and max size declarations are ignored when wrapping flex items](https://github.com/philipwalton/flexbugs#flexbug-11)
12. [Inline elements are not treated as flex-items](https://github.com/philipwalton/flexbugs#flexbug-12)
13. [Importance is ignored on flex-basis when using flex shorthand](https://github.com/philipwalton/flexbugs#flexbug-13)
14. [Shrink-to-fit containers with `flex-flow: column wrap` do not contain their items](https://github.com/philipwalton/flexbugs#flexbug-14)
15. [Column flex items ignore `margin: auto` on the cross axis](https://github.com/philipwalton/flexbugs#flexbug-15)
16. [`flex-basis` cannot be animated](https://github.com/philipwalton/flexbugs#flexbug-16)
17. [Flex items are not correctly justified when `max-width` is used](https://github.com/philipwalton/flexbugs#flexbug-17)

### [](https://github.com/philipwalton/flexbugs#flexbug-1)Flexbug #1

*Minimum content sizing of flex items not honored*

| Demos                                                                                                                                                                                                                                                                  | Browsers affected                                                   | Tracking bugs                                                                                                                                                                                                                                              |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [1.1.a](https://codepen.io/philipwalton/pen/MYbrrr) – *bug*<br>[1.1.b](https://codepen.io/philipwalton/pen/ByQJOQ) – *workaround*<br>[1.2.a](https://codepen.io/philipwalton/pen/ByQJqQ) – *bug*<br>[1.2.b](https://codepen.io/philipwalton/pen/wBopYg) – *workaround* | Chrome (fixed in 72)<br>Opera (fixed in 60)<br>Safari (fixed in 10) | [Chrome #426898 (fixed)](https://code.google.com/p/chromium/issues/detail?id=426898)<br>[Chrome #596743 (fixed)](https://bugs.chromium.org/p/chromium/issues/detail?id=596743)<br>[Safari #146020 (fixed)](https://bugs.webkit.org/show_bug.cgi?id=146020) |

When flex items are too big to fit inside their container, those items are instructed (by the flex layout algorithm) to shrink, proportionally, according to their `flex-shrink` property. But contrary to what most browsers allow, they're *not* supposed to shrink indefinitely. They must always be at least as big as their minimum height or width properties declare, and if no minimum height or width properties are set, their minimum size should be the default minimum size of their content.

According to the [current flexbox specification](http://www.w3.org/TR/css-flexbox/#flex-common):

> By default, flex items won’t shrink below their minimum content size (the length of the longest word or fixed-size element). To change this, set the min-width or min-height property.

#### [](https://github.com/philipwalton/flexbugs#workaround)Workaround

The flexbox spec defines an initial `flex-shrink` value of `1` but says items should not shrink below their default minimum content size. You can usually get this same behavior by setting a `flex-shrink` value of `0` (instead of the default `1`) and a `flex-basis` value of `auto`. That will cause the flex item to be at least as big as its width or height (if declared) or its default content size.

### [](https://github.com/philipwalton/flexbugs#flexbug-2)Flexbug #2

*Column flex items set to `align-items: center` overflow their container*

| Demos                                                                                                                             | Browsers affected                       |
|:--------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |
| [2.1.a](https://codepen.io/philipwalton/pen/xbRpMe) – *bug*<br>[2.1.b](https://codepen.io/philipwalton/pen/ogYpVv) – *workaround* | Internet Explorer 10-11 (fixed in Edge) |

When using `align-items: center` on a flex container in the column direction, the contents of flex item, if too big, will overflow their container in IE 10-11.

#### [](https://github.com/philipwalton/flexbugs#workaround-1)Workaround

Most of the time, this can be fixed by simply setting `max-width: 100%` on the flex item. If the flex item has a padding or border set, you'll also need to make sure to use `box-sizing: border-box` to account for that space. If the flex item has a margin, using `box-sizing` alone will not work, so you may need to use a container element with padding instead.

### [](https://github.com/philipwalton/flexbugs#flexbug-3)Flexbug #3

*`min-height` on a flex container won't apply to its flex items*

| Demos                                                                                                                                                                                                                                                                  | Browsers affected                       | Tracking bugs                                                                                                                                              |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [3.1.a](https://codepen.io/philipwalton/pen/RNoZJP) – *bug*<br>[3.1.b](https://codepen.io/philipwalton/pen/KwNvLo) – *workaround*<br>[3.2.a](https://codepen.io/philipwalton/pen/VYmbmj) – *bug*<br>[3.2.b](https://codepen.io/philipwalton/pen/JdvdJE) – *workaround* | Internet Explorer 10-11 (fixed in Edge) | [IE #802625](https://connect.microsoft.com/IE/feedback/details/802625/min-height-and-flexbox-flex-direction-column-dont-work-together-in-ie-10-11-preview) |

In order for flex items to size and position themselves, they need to know how big their containers are. For example, if a flex item is supposed to be vertically centered, it needs to know how tall its parent is. The same is true when flex items are told to grow to fill the remaining empty space.

In IE 10-11, `min-height` declarations on flex containers work to size the containers themselves, but their flex item children do not seem to know the size of their parents. They act as if no height has been set at all.

#### [](https://github.com/philipwalton/flexbugs#workaround-2)Workaround

By far the most common element to apply `min-height` to is the body element, and usually you're setting it to `100%` (or `100vh`). Since the body element will never have any content below it, and since having a vertical scroll bar appear when there's a lot of content on the page is usually the desired behavior, substituting `height` for `min-height` will almost always work as shown in demo [3.1.b](https://codepen.io/philipwalton/pen/KwNvLo).

For cases where `min-height` is required, the workaround is to add a wrapper element around the flex container that is itself a flex container in the column direction. For some reason nested flex containers are not affected by this bug. Demo [3.2.a](https://codepen.io/philipwalton/pen/VYmbmj) shows a visual design where `min-height` is required, and demo [3.2.b](https://codepen.io/philipwalton/pen/JdvdJE) shows how this bug can be avoided with a wrapper element.

### [](https://github.com/philipwalton/flexbugs#flexbug-4)Flexbug #4

*`flex` shorthand declarations with unitless `flex-basis` values are ignored*

| Demos                                                                                                                             | Browsers affected                       |
|:--------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |
| [4.1.a](https://codepen.io/philipwalton/pen/OPbQgO) – *bug*<br>[4.1.b](https://codepen.io/philipwalton/pen/ByQYZJ) – *workaround* | Internet Explorer 10-11 (fixed in Edge) |

Prior to the release of IE 10, the [flexbox spec at the time](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flexibility) stated that a flexbox item's preferred size required a unit when using the `flex` shorthand:

> If the <preferred-size> is ‘0’, it must be specified with a unit (like ‘0px’) to avoid ambiguity; unitless zero will either be interpreted as as one of the flexibilities, or is a syntax error.

This is no longer true in the spec, but IE 10-11 still treat it as true. If you use the declaration `flex: 1 0 0` in one of these browsers, it will be an error and the entire rule (including all the flexibility properties) will be ignored.

#### [](https://github.com/philipwalton/flexbugs#workaround-3)Workaround

When using the `flex` shorthand, always include a unit in the `flex-basis` portion. For example: `1 0 0%`.

**Important:** using a `flex` value of something like `1 0 0px` can still be a problem because many CSS minifiers will convert `0px` to `0`. To avoid this, make sure to use `0%` instead of `0px` since most minifiers won't touch percentage values for other reasons.

### [](https://github.com/philipwalton/flexbugs#flexbug-5)Flexbug #5

*Column flex items don't always preserve intrinsic aspect ratios*

| Demos                                                                                                                             | Browsers affected                       |
|:--------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |
| [5.1.a](https://codepen.io/philipwalton/pen/LEbQON) – *bug*<br>[5.1.b](https://codepen.io/philipwalton/pen/wBoyry) – *workaround* | Internet Explorer 10-11 (fixed in Edge) |

The [March 2014 spec](http://www.w3.org/TR/2014/WD-css-flexbox-1-20140325/#min-size-auto) has the following to say about how size determinations are made for flex items:

> On a flex item whose overflow is not visible, this [auto] keyword specifies as the minimum size the smaller of: (a) the min-content size, or (b) the computed width/height, if that value is definite.

Demo [5.1.a](https://codepen.io/philipwalton/pen/LEbQON) contains an image whose height is 200 pixels and whose width is 500 pixels. Its container, however, is only 300 pixels wide, so after the image is scaled to fit into that space, its computed height should only be 120 pixels. The text quoted above does not make it clear as to whether the flex item's min-content size should be based the image's actual height or scaled height.

The [most recent spec](http://dev.w3.org/csswg/css-flexbox/#min-size-auto) has resolved this ambiguity in favor of using sizes that will preserve an element's intrinsic aspect ratio.

#### [](https://github.com/philipwalton/flexbugs#workaround-4)Workaround

You can avoid this problem by adding a container element to house the element with the intrinsic aspect ratio. Since doing this causes the element with the intrinsic aspect ratio to no longer be a flex item, it will be sized normally.

### [](https://github.com/philipwalton/flexbugs#flexbug-6)Flexbug #6

*The default `flex` value has changed*

| Demos                                                                                                                                                                                                                                                                  | Browsers affected                  |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:---------------------------------- |
| [6.1.a](https://codepen.io/philipwalton/pen/myOYqW) – *bug*<br>[6.1.b](https://codepen.io/philipwalton/pen/azBrLo) – *workaround*<br>[6.2.a](https://codepen.io/philipwalton/pen/zvvQdB) – *bug*<br>[6.2.b](https://codepen.io/philipwalton/pen/LppoOj) – *workaround* | Internet Explorer 10 (fixed in 11) |

When IE 10 was being developed, the [March 2012 spec](http://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flexibility) said the initial value for the `flex` property was `none`, which translates to `0 0 auto`. The [most recent spec](http://www.w3.org/TR/css3-flexbox/#flex-property) sets the initial `flex` value to the initial values of the individual flexibility properties, which corresponds to `initial` or `0 1 auto`. Notice that this means IE 10 uses a different initial `flex-shrink` value (technically it was called `neg-flex` in the spec at the time) from every other browser. Other browsers (including IE 11) use an initial value of `1` rather than `0`.

This bug can manifest itself in two ways: when not setting any flex values or when using one of the `flex` shorthands. In both cases, flex items in IE 10 will behave differently from all other browsers. The following table illustrates the difference:

| Declaration           | What it should mean | What it means in IE 10 |
|:--------------------- |:------------------- |:---------------------- |
| (no flex declaration) | `flex: 0 1 auto`    | `flex: 0 0 auto`       |
| `flex: 1`             | `flex: 1 1 0%`      | `flex: 1 0 0px`        |
| `flex: auto`          | `flex: 1 1 auto`    | `flex: 1 0 auto`       |
| `flex: initial`       | `flex: 0 1 auto`    | `flex: 0 0 auto`       |

#### [](https://github.com/philipwalton/flexbugs#workaround-5)Workaround

If you have to support IE 10, the best solution is to *always* set an explicit `flex-shrink` value on all of your flex items, or to always use the longhand form (rather than the shorthand) in `flex` declarations to avoid the gotchas shown in the table above. Demo [6.1.a](https://codepen.io/philipwalton/pen/myOYqW) shows how not setting any flexibility properties causes an error, and demo [6.2.a](https://codepen.io/philipwalton/pen/zvvQdB) shows how using `flex: 1` can have the same problem.

### [](https://github.com/philipwalton/flexbugs#flexbug-7)Flexbug #7

*`flex-basis` doesn't account for `box-sizing: border-box`*

| Demos                                                                                                                                                                                                   | Browsers affected                       |
|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |
| [7.1.a](https://codepen.io/philipwalton/pen/JoWjyb) – *bug*<br>[7.1.b](https://codepen.io/philipwalton/pen/XJMWem) – *workaround*<br>[7.1.c](https://codepen.io/philipwalton/pen/ZYLdqb) – *workaround* | Internet Explorer 10-11 (fixed in Edge) |

An explicit `flex-basis` value (i.e., any value other than `auto`) is supposed to act just like `width` or `height`. It determines the initial size of a flex item and then the other flexibility properties allow it to grow or shrink accordingly.

IE 10-11 always assume a content box model when using `flex-basis` to determine a flex item's size, even if that item is set to `box-sizing: border-box`. Demo [7.1.a](https://codepen.io/philipwalton/pen/JoWjyb) shows that an item with a `flex-basis` value of `100%` will overflow its container by the amount of its border plus its padding.

#### [](https://github.com/philipwalton/flexbugs#workaround-6)Workaround

There are two ways to work around this bug. The first requires no additional markup, but the second is slightly more flexible:

1. Instead of setting an explicit `flex-basis` value, use `auto`, and then set an explicit width or height. Demo [7.1.b](https://codepen.io/philipwalton/pen/XJMWem) shows this.
2. Use a wrapper element that contains no border or padding so it works with the content box model. Demo [7.1.c](https://codepen.io/philipwalton/pen/ZYLdqb) show this.

### [](https://github.com/philipwalton/flexbugs#flexbug-8)Flexbug #8

*`flex-basis` doesn't support `calc()`*

| Demos                                                                                                                             | Browsers affected                       |
|:--------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |
| [8.1.a](https://codepen.io/philipwalton/pen/ogBrye) – *bug*<br>[8.1.b](https://codepen.io/philipwalton/pen/bNgPKz) – *workaround* | Internet Explorer 10-11 (fixed in Edge) |
| [8.2.a](https://codepen.io/philipwalton/pen/VYJgJo) – *bug*<br>[8.2.b](https://codepen.io/philipwalton/pen/pvXGmW) – *workaround* | Internet Explorer 10 (fixed in 11)      |

IE 10-11 ignore `calc()` functions used in `flex` shorthand declarations. Demo [8.1.a](https://codepen.io/philipwalton/pen/ogBrye) shows `flex: 0 0 calc(100%/3)` not working in IE.

In IE 10, `calc()` functions don't even work in longhand `flex-basis` declarations (though this does work in IE 11). Demo [8.2.a](https://codepen.io/philipwalton/pen/VYJgJo) shows `flex-basis: calc(100%/3)` not working in IE 10.

#### [](https://github.com/philipwalton/flexbugs#workaround-7)Workaround

Since this bug only affects the `flex` shorthand declaration in IE 11, an easy workaround (if you only need to support IE 11) is to always specify each flexibility property individually. Demo [8.1.b](https://codepen.io/philipwalton/pen/bNgPKz) offers an example of this.

If you need to support IE 10 as well, then you'll need to fall back to setting `width` or `height` (depending on the container's `flex-direction` property). You can do this by setting a `flex-basis` value of `auto`, which will instruct the browser to use the element's [main size](http://dev.w3.org/csswg/css-flexbox/#box-model) property (i.e., its `width` or `height`). Demo [8.2.b](https://codepen.io/philipwalton/pen/pvXGmW) offers an example of this.

### [](https://github.com/philipwalton/flexbugs#flexbug-9)Flexbug #9

*Some HTML elements can't be flex containers*

| Demos                                                                                                                                                                                                                                                                                                                                  | Browsers affected                                                        | Tracking bugs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:------------------------------------------------------------------------ |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [9.1.a](https://codepen.io/philipwalton/pen/ByZgpW) – *bug*<br>[9.1.b](https://codepen.io/philipwalton/pen/mywZpr) – *workaround*<br>[9.2.a](https://codepen.io/philipwalton/pen/wKBqdY) – *bug*<br>[9.2.b](https://codepen.io/philipwalton/pen/EVaRaX) – *workaround*<br>[9.3.a](https://codepen.io/paulirish/pen/OBJXWq) – *bug*<br> | Chrome<br>Edge<br>Firefox (fixed in 63)<br>Opera<br>Safari (fixed in 11) | [Chrome #375693](https://code.google.com/p/chromium/issues/detail?id=375693)<br>[Chrome #700029](https://code.google.com/p/chromium/issues/detail?id=700029)<br>[Edge #4511145](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/4511145/)<br>[Firefox #984869 (fixed)](https://bugzilla.mozilla.org/show_bug.cgi?id=984869)<br>[Firefox #1230207 (fixed)](https://bugzilla.mozilla.org/show_bug.cgi?id=1230207)<br>[Firefox #1397768 (fixed)](https://bugzilla.mozilla.org/show_bug.cgi?id=1397768)<br>[Safari #169082 (fixed)](https://bugs.webkit.org/show_bug.cgi?id=169082)<br>[Safari #169700 (fixed)](https://bugs.webkit.org/show_bug.cgi?id=169700)<br>[Safari #190065](https://bugs.webkit.org/show_bug.cgi?id=190065) |

Certain HTML elements, like `<summary>`, `<fieldset>` and `<button>`, do not work as flex containers. The browser's default rendering of those element's UI conflicts with the `display: flex` declaration.

Demo [9.1.a](https://codepen.io/philipwalton/pen/ByZgpW) shows how `<button>` elements didn't work in Firefox, and demo [9.2.a](https://codepen.io/philipwalton/pen/wKBqdY) shows that `<fieldset>` elements don't work in most browsers. Demo [9.3.a](https://codepen.io/paulirish/pen/OBJXWq) shows that `<summary>` elements dont work in Safari.

#### [](https://github.com/philipwalton/flexbugs#workaround-8)Workaround

The simple solution to this problem is to use a wrapper element that can be a flex container (like a `<div>`) directly inside of the element that can't. Demos [9.1.b](https://codepen.io/philipwalton/pen/mywZpr) and [9.2.b](https://codepen.io/philipwalton/pen/EVaRaX) show workaround for the `<button>` and `<fieldset>` elements, respectively.

### [](https://github.com/philipwalton/flexbugs#flexbug-10)Flexbug #10

*`align-items: baseline` doesn't work with nested flex containers*

| Demos                                                                                                                               | Browsers affected     | Tracking bugs                                                                    |
|:----------------------------------------------------------------------------------------------------------------------------------- |:--------------------- |:-------------------------------------------------------------------------------- |
| [10.1.a](https://codepen.io/philipwalton/pen/vOOejZ) – *bug*<br>[10.1.b](https://codepen.io/philipwalton/pen/MwwEVd) – *workaround* | Firefox (fixed in 52) | [Firefox #1146442 (fixed)](https://bugzilla.mozilla.org/show_bug.cgi?id=1146442) |

In Firefox, nested flex containers don't contribute to the baseline that other flex items should align themselves to. Demo [10.1.a](https://codepen.io/philipwalton/pen/vOOejZ) shows the line on the left incorrectly aligning itself to the second line of text on the right. It should be aligned to the first line of text, which is the inner flex container.

#### [](https://github.com/philipwalton/flexbugs#workaround-9)Workaround

This bug only affects nested containers set to `display: flex`. If you set the nested container to `display: inline-flex` it works as expected. Note that when using `inline-flex` you will probably also need to set the width to `100%`.

### [](https://github.com/philipwalton/flexbugs#flexbug-11)Flexbug #11

*Min and max size declarations are ignored when wrapping flex items*

| Demos                                                                                                               | Browsers affected      | Tracking bugs                                                    |
|:------------------------------------------------------------------------------------------------------------------- |:---------------------- |:---------------------------------------------------------------- |
| [11.1.a](https://codepen.io/anon/pen/BNrGwN) – *bug*<br>[11.1.b](https://codepen.io/anon/pen/RPMqjz) – *workaround* | Safari (fixed in 10.1) | [Safari #136041](https://bugs.webkit.org/show_bug.cgi?id=136041) |

Safari uses min/max width/height declarations for actually rendering the size of flex items, but it ignores those values when calculating how many items should be on a single line of a multi-line flex container. Instead, it simply uses the item's `flex-basis` value, or its width if the flex basis is set to `auto`.

This is problematic when using the `flex: 1` shorthand because that sets the flex basis to `0%`, and an infinite number of flex items could fit on a single line if the browser thinks their widths are all zero. Demo [11.1.a](https://codepen.io/philipwalton/pen/BNrGwN) show an example of this happening.

This is also problematic when creating fluid layouts where you want your flex items to be no bigger than X but no smaller than Y. Since Safari ignores those values when determining how many items fit on a line, that strategy won't work.

#### [](https://github.com/philipwalton/flexbugs#workaround-10)Workaround

The only way to avoid this issue is to make sure to set the flex basis to a value that is always going to be between (inclusively) the min and max size declarations. If using either a min or a max size declaration, set the flex basis to whatever that value is, if you're using both a min *and* a max size declaration, set the flex basis to a value that is somewhere in that range. This sometimes requires using percentage values or media queries to cover all possible scenarios. Demo [11.1.b](https://codepen.io/philipwalton/pen/RPMqjz) shows an example of setting the flex basis to the same value as the min width to workaround this bug in Safari.

### [](https://github.com/philipwalton/flexbugs#flexbug-12)Flexbug #12

*Inline elements are not treated as flex-items*

| Demos                                                                                                                               | Browsers affected                       |
|:----------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |
| [12.1.a](https://codepen.io/philipwalton/pen/qdMgdg) – *bug*<br>[12.1.b](https://codepen.io/philipwalton/pen/NqLoNp) – *workaround* | Internet Explorer 10-11 (fixed in Edge) |

Inline elements, including `::before` and `::after` pseudo-elements, are not treated as flex items in IE 10. IE 11 fixed this bug with regular inline element, but it still affects the `::before` and `::after` pseudo-elements.

#### [](https://github.com/philipwalton/flexbugs#workaround-11)Workaround

This issue can be avoided by adding a non-inline display value to the items, e.g. `block`, `inline-block`, `flex`, etc. Demo [12.1.b](https://codepen.io/philipwalton/pen/NqLoNp) shows an example of this working in IE 10-11.

### [](https://github.com/philipwalton/flexbugs#flexbug-13)Flexbug #13

*Importance is ignored on flex-basis when using flex shorthand*

| Demos                                                                                                                               | Browsers affected                  |
|:----------------------------------------------------------------------------------------------------------------------------------- |:---------------------------------- |
| [13.1.a](https://codepen.io/philipwalton/pen/ZbRoYw) – *bug*<br>[13.1.b](https://codepen.io/philipwalton/pen/rOKvNb) – *workaround* | Internet Explorer 10 (fixed in 11) |

When applying `!important` to a `flex` shorthand declaration, IE 10 applies `!important` to the `flex-grow` and `flex-shrink` parts but not to the `flex-basis` part. Demo [13.1.a](https://codepen.io/philipwalton/pen/ZbRoYw) shows an example of a declaration with `!important` not overriding another declaration in IE 10.

#### [](https://github.com/philipwalton/flexbugs#workaround-12)Workaround

If you need the `flex-basis` part of your `flex` declaration to be `!important` and you have to support IE 10, make sure to include a `flex-basis` declaration separately. Demo [13.1.b](https://codepen.io/philipwalton/pen/rOKvNb) shows an example of this working in IE 10.

### [](https://github.com/philipwalton/flexbugs#flexbug-14)Flexbug #14

*Shrink-to-fit containers with `flex-flow: column wrap` do not contain their items*

| Demos                                                                                                                                                                                                      | Browsers affected                        | Tracking Bugs                                                                                                                                                                                                                |
|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:---------------------------------------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [14.1.a](https://codepen.io/philipwalton/pen/vWbdZW) – *bug*<br>[14.1.b](https://codepen.io/philipwalton/pen/RjvQgx) – *workaround*<br>[14.1.c](https://codepen.io/philipwalton/pen/MOxQBg) – *workaround* | Chrome<br>Firefox<br>Safari<br>Opera<br> | [Chrome #507397](https://bugs.chromium.org/p/chromium/issues/detail?id=507397)<br>[Firefox #995020](https://bugzilla.mozilla.org/show_bug.cgi?id=995020)<br>[Safari #157648](https://bugs.webkit.org/show_bug.cgi?id=157648) |

If you float a flex container, use `inline-flex`, or absolutely position it, the size of the container becomes determined by its content (a.k.a shrink-to-fit).

When using `flex-flow: column wrap`, some browsers do not properly size the container based on its content, and there is unwanted overflow. Demo [14.1.a](https://codepen.io/philipwalton/pen/vWbdZW) shows an example of this.

#### [](https://github.com/philipwalton/flexbugs#workaround-13)Workaround

If your container has a fixed height (usually the case when you enable wrapping), you avoid this bug by using `flex-flow: row wrap` (note `row` instead of `column`) and fake the column behavior by updating the container's [writing mode](https://developer.mozilla.org/en-US/docs/Web/CSS/writing-mode) (and reseting it on the items). Demo [14.1.b](https://codepen.io/philipwalton/pen/RjvQgx) shows an example of this working in all modern browsers.

**Note:** To use this workaround in Safari 10 you may need to set explicit dimensions on the flex items. Demo [14.1.c](https://codepen.io/philipwalton/pen/MOxQBg) shows an example of how this can be needed in Safari 10.

### [](https://github.com/philipwalton/flexbugs#flexbug-15)Flexbug #15

*Column flex items ignore `margin: auto` on the cross axis*

| Demos                                                                                                                               | Browsers affected                       | Tracking Bugs                                                                                  |
|:----------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------- |:---------------------------------------------------------------------------------------------- |
| [15.1.a](https://codepen.io/philipwalton/pen/RjdvWK) – *bug*<br>[15.1.b](https://codepen.io/philipwalton/pen/BmbMPP) – *workaround* | Internet Explorer 10-11 (fixed in Edge) | [IE #14593426](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/14593426/) |

`margin: auto` can be used to fill all the available space between flex items (and is useful for centering), but in IE 10-11 this doesn't work in the cross axis for flex items within a column container.

Instead of filling the available space, items render according to their `align-self` property, which defaults to `stretch`. Demo [15.1.a](https://codepen.io/philipwalton/pen/RjdvWK) shows an example of this.

#### [](https://github.com/philipwalton/flexbugs#workaround-14)Workaround

If you're using `margin: auto` to center items, you can achieve the same effect by setting `align-self: center` on each item with `margin: auto` (or `align-items: center` on the container). Demo [15.1.b](https://codepen.io/philipwalton/pen/BmbMPP) shows this working in IE 10-11.

### [](https://github.com/philipwalton/flexbugs#flexbug-16)Flexbug #16

*`flex-basis` cannot be animated*

| Demos                                                                                                                               | Browsers affected                 | Tracking Bugs                                                    |
|:----------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------- |:---------------------------------------------------------------- |
| [16.1.a](https://codepen.io/philipwalton/pen/yPrRax) – *bug*<br>[16.1.b](https://codepen.io/philipwalton/pen/MORPjP) – *workaround* | Internet Explorer 10-11<br>Safari | [Safari #180435](https://bugs.webkit.org/show_bug.cgi?id=180435) |

In some browsers, CSS animations involving the `flex-basis` property are ignored. Demo [16.1.a](https://codepen.io/philipwalton/pen/yPrRax) shows an example of this.

#### [](https://github.com/philipwalton/flexbugs#workaround-15)Workaround

Since the `flex-basis` property is effectively just a substitute for the container's size property along the main axis (`width` for rows and `height` for columns), you can achieve the effect of animating `flex-basis` by using a `flex-basis` value of `auto` and instead animating either the `width` or `height` instead. Demo [16.1.b](https://codepen.io/philipwalton/pen/MORPjP) shows how you can achieve the same effect from demo [16.1.a](https://codepen.io/philipwalton/pen/yPrRax) by animating `width` instead of `flex-basis`.

### [](https://github.com/philipwalton/flexbugs#flexbug-17)Flexbug #17

*Flex items are not correctly justified when `max-width` is used*

| Demos                                                                                                                               | Browsers affected    |
|:----------------------------------------------------------------------------------------------------------------------------------- |:-------------------- |
| [17.1.a](https://codepen.io/philipwalton/pen/vWMbgK) – *bug*<br>[17.1.b](https://codepen.io/philipwalton/pen/OOGdmj) – *workaround* | Internet Explorer 11 |

In IE 11 the free space between or around flex items (as per their container's `justify-content` property) is not correctly calculated if a max-size property is used (`max-width` in the row direction, `max-height` in the column direction). Demo [17.1.a](https://codepen.io/philipwalton/pen/vWMbgK) shows an example of this.

#### [](https://github.com/philipwalton/flexbugs#workaround-16)Workaround

In most cases where a max-size property is used on a flex item, the desired result is to have that item's initial size start at the value of the `flex-basis` property and grow to no larger than its max-size value.

In such cases, the same effect can be achieved by initially specifying the desired max-size as the item's `flex-basis` and then letting it shrink by setting the min-size property (`min-width` in the row direction, `min-height` in the column direction) to whatever `flex-basis` was previously set to.

In other words, the following two declarations will both render an item with a final size between `0%` and `25%` depending on the available free space:

```css
.using-a-grow-strategy {  flex: 1 0 0%;  max-width: 25%;}

.using-a-shrink-strategy {  flex: 0 1 25%;  min-width: 0%;}
```

Demo [17.1.b](https://codepen.io/philipwalton/pen/OOGdmj) shows this working in IE 11.



出处：

[https://github.com/philipwalton/flexbugs](https://github.com/philipwalton/flexbugs)
