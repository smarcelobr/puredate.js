puredate.js
===========

Now is very easy manipulate date without time in javascript.

puredate.js serves to manipulate simple dates in javascript. This is very useful when you don't need worry about
time and timezone. The PureDate object is ideal to manipulate birthdays and other dates that are recorded in documents.

Oficial webpage and examples: http://sergio.figueiredo.nom.br/puredate

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## CHANGELOG

Check [Releases](https://github.com/smarcelobr/puredate.js/releases)


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
var puredate = PureDate.ymd(in int year, in int month, in int day);
   or
var puredate = PureDate.gdate(in int gDate);
   or
var puredate = PureDate.today();
```

Method list:
```js
var today = PureDate.today();
var tomorrow = today.addDays(1); // add 1 day 
var nextMonth = today.addMonths(1); // add 1 month. 
var dow = today.dayOfWeek() // return 0 for Sunday , 1 for Monday, ... 6 for Saturday
var isLeapYear = today.isLeapYear() // true if this date is in a leap year.
var firstDayOfMonth = today.getFirstDayOfMonth() // returns day 1 of same month and year 
var firstDayofYear= today.getFirstDayOfYear() // returns day 1 and month 1(january) of same year
var lastDayOfMonth = today.getLastDayOfMonth() // returns the last day of month.
var lastDayOfYear = today.getLastDayOfYear() // returns the 31 of december of today's year.
// note: today variable value remains immutable after all methods execution.
```

Examples
--------

### Today date

```js
var today = PureDate.today();
```

### Specific Date

```js
var specDate = PureDate.ymd(2012,PureDate.JANUARY, 1);
```

### Reading properties

```js
var today = PureDate.today();
var year = today.year;
var month = today.month;
var day = today.day;

```

### adding a month

```js
var today = PureDate.today();
var nextMonth = today.addMonth(1);
```
Note: today instance is not modified. The PureDate object are immutable.

### day of week

```js
var today = PureDate.today();
if (today.dayofweek() === PureDate.SUNDAY){
   alert("good sunday");
}
```
Note: today instance is not modified. The PureDate object are immutable.

require.js
----------

This javascript can be used with require.js. Their use is optional.


Description
-----------
This code uses [gdate algorithm][1] to convert day, month and year in a integer number thats is de day number since March, 1, year 0. You can read the gDate value and store it in a database. To restore this integer in a date is easy:
```js
var gdate = 735935;   // Feb, 1, 2015
var date = PureDate(gdate);
```

Index of Months
----------------
- January is month 1;
- December is month 12;

Limitations
-----------
The simplicity of this code costs some limitations for their use.

This object only refers to a Gregorian Calendar, so this will work fine for any date since the adoption of Gregoria Calendar. Warning: each country has a diferent date of [adotion of this calendar][2]. The older countries adopt this calendar at Oct, 15, 1582 (Spain, Portugal, Italy, Polish).

That said, if you need to know _precisaly_ how many days have passed of arrival of the Portuguese fleet in Brazil ([April, 22, 1500 year][4]), you can not use this date, because the portugueses didn't use Gregorian Calendar at that time.

  [1]: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html "gdate algorithm (Concordia University/CA)"
  [2]: http://en.wikipedia.org/wiki/Adoption_of_the_Gregorian_calendar "Adoption of Gregoria Calendar (wikipedia)"
  [3]: http://en.wikipedia.org/wiki/ISO_8601 "ISO8601 (wikipedia)"
  [4]: http://en.wikipedia.org/wiki/Colonial_Brazil#Discovery_and_early_exploitation "Brazil Discovery"
