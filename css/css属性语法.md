1、一些字符串在一起表示这些字符串必须按照给定顺序出现，例如 help me，必须先help后me

2、竖线。如果属性值候选项由一个竖线分隔(X|Y)，那么必须出现其中之一。

3、双竖线。表示至少出现X或Y，或者两者都出现（必须按照顺序）

4、中括号。中括号用于分组

5、中括号或单词后可以有以下修饰符之一：

- 星号。表示前面的值或分组重复0或多次

- 加号表示可以重复1或多次

- 问号表示是可选的

- 大括号内的一堆书表示，至少出现M次，最多N次。{M,N}



例子：

give || me || liberty

至少出现三者之一，而且可以任何按照任何顺序使用（？）



[I | am]? the || walrus

可以使用单词I或am，但不能两者都使用，而且是否使用其中之一也是可选的。此外，必须跟有the或walrus，或者两者都有，顺序不限。



koo+ ka-choo

koo可以有一个或多个实例（即出现一次或多次），其后必须跟有ka-choo



I really{1,4}? [love | hate] [Microsoft | Netscape | Opera | safari]

可以解释为 I love Netscape. I really love Microsoft及类似的表达式



[[Alpha || Baker || Crazy]，]{2,3} and Delphi

一种可能的结果是：Alpha, Cray, and Delph1

这里有逗号，因为逗号放在了嵌套分组中
