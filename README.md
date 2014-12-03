puredate.js
===========

Now is very easy manipulate date without time in javascript.

puredate.js serves to manipulate simple dates in javascript. This is very useful when you don't need worry about
time and timezone. The PureDate object is ideal to manipulate birthdays and other dates that are recorded in documents.

Instalation
-----------
There are 2 ways for instalation:

### For bower users:
```
  bower install puredate
```

### Downloading the script:

Download *'puredate.js'* file and enjoy.

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

require.js
----------

This javascript can be used with require.js. Their use is optional.


Description
-----------
This code uses [gdate algorithm][1] to convert day, month and year in a integer number thats is de day number since March, 1, year 0. You can read the gDate value and store it in a database. To restore this integer in a date is easy:
```js
var gdate = 750455; // TODO correct!
var date = PureDate(gdate);
```

Limitations
-----------
The simplicity of this code costs some limitations for their use.

This object only refers to a Gregorian Calendar, so this will work fine for any date since the adoption of Gregoria Calendar. Warning: each country has a diferent date of [adotion of this calendar][2]. The older countries adopt this calendar at Oct, 15, 1582 (Spain, Portugal, Italy, Polish).

That said, if you need to know _precisaly_ how many days have passed of arrival of the Portuguese fleet in Brazil ([April, 22, 1500 year][4]), you can not use this date, because the portugueses didn't use Gregorian Calendar at that time.

  [1]: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html "gdate algorithm (Concordia University/CA)"
  [2]: http://en.wikipedia.org/wiki/Adoption_of_the_Gregorian_calendar "Adoption of Gregoria Calendar (wikipedia)"
  [3]: http://en.wikipedia.org/wiki/ISO_8601 "ISO8601 (wikipedia)"
  [4]: http://en.wikipedia.org/wiki/Colonial_Brazil#Discovery_and_early_exploitation "Brazil Discovery"
