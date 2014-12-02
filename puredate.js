/* puredate.js
 *
 * The most 'pure' date without time information. No timezone hell.
 * 2014-12-02
 *
 * By Sergio M C Figueiredo
 *
 * http://sergio.figueiredo.nom.br
 *
 */

var PureDate = PureDate
    || (function(arg1, arg2, arg3) {
    "use strict";

    /* based on "Factory constructor pattern"
     *  see more at http://javascript.info/tutorial/factory-constructor-pattern
     */
    var lastDaysArray = [31,28,31,30,31,30,31,31,30,31,30,31];

    var JANUARY=1,
        FEBRUARY=2,
        MARCH=3,
        APRIL=4,
        MAY=5,
        JUNE=6,
        JULY=7,
        AUGUST=8,
        SEPTEMBER=9,
        OCTOBER=10,
        NOVEMBER=11,
        DECEMBER=12;

    var pureDate = {
        /* public constants */
        /**/
    };

    /**
     * Retorns the number of days since March 01, 0000.
     *
     * Credits: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html
     */
    pureDate.g=function (y, m, d) {
        m = (m + 9) % 12;
        y = y - (~~(m/10)); // (~~(a/b)) forces integer division at a/b
        return 365*y + (~~(y/4)) - (~~(y/100)) + (~~(y/400)) + (~~((m*306 + 5)/10)) + ( d - 1 );
    }

    /* properties */
    var day, month, year, gDate;

    if (arg1 && arg2 && arg3) {
        // year, month and day
        year=+arg1;month=+arg2;day=+arg3; // 'unary +' to convert string to integer if needed
        gDate = pureDate.g(year, month, day);
    } else if (arg1) {
        // gdate
        gDate = +arg1;

        /* Credits: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html */
        var y = ~~(((10000*gDate) + 14780)/3652425);
        var ddd = gDate - (365*y + (~~(y/4)) - (~~(y/100)) + (~~(y/400)));
        if (ddd < 0) {
         y = y - 1;
         ddd = gDate - (365*y + (~~(y/4)) - (~~(y/100)) + (~~(y/400)));
        }
        var mi = ~~((100*ddd + 52)/3060);
        var mm = (mi + 2)%12 + 1;
        y = y + (~~((mi + 2)/12));
        var dd = ddd - (~~((mi*306 + 5)/10)) + 1;

        year=y;
        month=mm;
        day=dd;
    } else {
        // today
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth()+1; //January is 0!
        var year = today.getFullYear();
        gDate = pureDate.g(year, month, day);
    }

    // public read-only properties:
    Object.defineProperties(pureDate, {
        /* public read-only properties */
        'day':{value:day,writable:false},
        'month':{value:month,writable:false},
        'year':{value:year,writable:false},
        'gdate':{value:gDate,writable:false},
        /* public constants */
        'JANUARY':{value:JANUARY,writable:false},
        'FEBRUARY':{value:FEBRUARY,writable:false},
        'MARCH':{value:MARCH,writable:false},
        'APRIL':{value:APRIL,writable:false},
        'MAY':{value:MAY,writable:false},
        'JUNE':{value:JUNE,writable:false},
        'JULY':{value:JULY,writable:false},
        'AUGUST':{value:AUGUST,writable:false},
        'SEPTEMBER':{value:SEPTEMBER,writable:false},
        'OCTOBER':{value:OCTOBER,writable:false},
        'NOVEMBER':{value:NOVEMBER,writable:false},
        'DECEMBER':{value:DECEMBER,writable:false}
    });
    // public methods
    pureDate.addDays=function (numDays) {
        return PureDate(this.gDate+numDays);
    }
    /**
     * Create a new PureDate adding months to this.
     *
     * @param numMonths to add. Can be negative to subtract months.
     * @return new PureDate
     */
    pureDate.addMonths=function(numMonths) {

        var gM = (this.year*12)+this.month+numMonths;
        var newYear = ~~(gM/12);
        var newMonth = (gM%12);

        var gD=this.g(newYear, newMonth, this.day);

        var newPureDate = PureDate(gD);
        if (newPureDate.month!=newMonth) {
            newPureDate=newPureDate.addDays(-newPureDate.day);
        }
        return newPureDate;
    }
    /**
     *
     * @return true if is leap year.
     */
    pureDate.isLeapYear=function() {
        return (this.year%400==0) || (this.year%4==0 && this.year%100!=0);
    }
    pureDate.getFirstDayOfMonth=function() {
        return PureDate(this.year, this.month, 1);
    }
    pureDate.getFirstDayOfYear=function() {
        return PureDate(this.year, JANUARY, 1);
    }
    pureDate.getLastDayOfMonth=function() {
        var lastDayOfMonth = lastDaysArray[this.month-1];
        if (this.month===FEBRUARY && this.isLeapYear()) {
            lastDayOfMonth = 29;
        }
        return PureDate(this.year, this.month, lastDayOfMonth);
    }
    pureDate.getLastDayOfYear=function() {
        return PureDate(this.year, DECEMBER, 31);
    }
    return pureDate;
});


// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module !== null) {
  module.exports = PureDate;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd != null)) {
  define([], function() {
    return PureDate;
  });
}
