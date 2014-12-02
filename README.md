puredate.js
===========

Now is very easy manipulate date without time in javascript.

puredate.js serves to manipulate simple dates in javascript. This is very useful when you don't need worry about
time and timezone. The PureDate object is ideal to manipulate birthdays and other dates that are recorded in documents.

Syntax
------

```js
PureDate(in int year, in int month, in int day)
   or
PureDate(in int gDate)
   or
PureDate()
```

Examples
--------

### Today date

```js
var today = PureDate();
```

### adding a month

```js
var today = PureDate();
var nextMonth = today.addMonth(1);
```

Note: today instance is not modified. The PureDate object are immutable.


  [1]: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html

