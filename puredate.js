"use strict";
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
    || (function () {
    "use strict";

        var lastDaysArray = [31,28,31,30,31,30,31,31,30,31,30,31];
        /**
         * Returns the number of days since March 01, 0000.
         *
         * Credits: http://alcor.concordia.ca/~gpkatch/gdate-algorithm.html
         */
        function g(y, m, d) {
            m = (m + 9) % 12;
            y = y - (~~(m/10)); // (~~(a/b)) forces integer division at a/b
            return 365*y + (~~(y/4)) - (~~(y/100)) + (~~(y/400)) + (~~((m*306 + 5)/10)) + ( d - 1 );
        }

        function PureDateInstance(year, month, day, gDate) {
            Object.defineProperties(this, {
                /* public read-only properties */
                'day':{value:day,writable:false},
                'month':{value:month,writable:false},
                'year':{value:year,writable:false},
                'gdate':{value:gDate,writable:false}
            });
        }

        var PureDateFromG = function (gDate) {
            gDate=+gDate; // unary + converts string to number, if needed
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

            return new PureDateInstance(y, mm, dd, gDate);
        }

        var PureDateFromYMD = function (year, month, day) {
            year=+year;month=+month;day=+day; // 'unary +' to convert string to integer if needed
            var gDate = g(year, month, day);
            return new PureDateInstance(year, month, day, gDate);
        }

        var Today = function () {
           var today = new Date();
           var day = today.getDate();
           var month = today.getMonth()+1; //January is 0!
           var year = today.getFullYear();

           return PureDateFromYMD(year, month, day);
       }


        PureDateInstance.prototype.addDays=function (numDays) {
            return PureDateFromG(this.gdate+numDays);
        }

        /**
         * Create a new PureDate adding months to this.
         *
         * @param numMonths to add. Can be negative to subtract months.
         * @return new PureDate
         */
        PureDateInstance.prototype.addMonths=function(numMonths) {
    
            var gM = (this.year*12)+this.month+numMonths;
            var newYear = ~~(gM/12);
            var newMonth = (gM%12);
    
            var newPureDate = PureDateFromYMD(newYear, newMonth, this.day);
            if (newPureDate.month!=newMonth) {
                newPureDate=newPureDate.addDays(-newPureDate.day);
            }
            return newPureDate;
        }
        /**
         *
         * @return true if is leap year.
         */
        PureDateInstance.prototype.isLeapYear=function() {
            return (this.year%400==0) || (this.year%4==0 && this.year%100!=0);
        }
        PureDateInstance.prototype.dayOfWeek = function() {
            /* Only works for Gregorian Calendar (after year 1800)
            returns 0 for Sunday, 6-Saturday */
            var sundayOfReference = 4; /* day=5/March/year=00 */
            return (this.gdate - sundayOfReference) % 7;
        }
        PureDateInstance.prototype.getFirstDayOfMonth=function() {
            return PureDateFromYMD(this.year, this.month, 1);
        }
        PureDateInstance.prototype.getFirstDayOfYear=function() {
            return PureDateFromYMD(this.year, PureDate.JANUARY, 1);
        }
        PureDateInstance.prototype.getLastDayOfMonth=function() {
            var lastDayOfMonth = lastDaysArray[this.month-1];
            if (this.month===PureDate.FEBRUARY && this.isLeapYear()) {
                lastDayOfMonth = 29;
            }
            return PureDateFromYMD(this.year, this.month, lastDayOfMonth);
        }
        PureDateInstance.prototype.getLastDayOfYear=function() {
            return PureDateFromYMD(this.year, PureDate.DECEMBER, 31);
        }
    

        // returns PureDate 'Builder' obj
        return {
           gdate: PureDateFromG,
           ymd: PureDateFromYMD,
           today: Today,
           JANUARY:1,
            FEBRUARY:2,
            MARCH:3,
            APRIL:4,
            MAY:5,
            JUNE:6,
            JULY:7,
            AUGUST:8,
            SEPTEMBER:9,
            OCTOBER:10,
            NOVEMBER:11,
            DECEMBER:12,
           SUNDAY:0,
            MONDAY:1,
            TUESDAY:2,
            WEDNESDAY:3,
            THURSDAY:4,
            FRIDAY:5,
            SATURDAY:6
        };
})();

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
