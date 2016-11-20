package com.vme.common.utils;


import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.FastDateFormat;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by fengwen on 16/9/28.
 */
public class DateUtils {

	/**
	 * Number of milliseconds in a standard second.
	 */
	public static final long MILLIS_PER_SECOND = 1000;
	
	/**
	 * Number of milliseconds in a standard minute.
	 */
	public static final long MILLIS_PER_MINUTE = 60 * MILLIS_PER_SECOND;
	
	/**
	 * Number of milliseconds in a standard hour.
	 */
	public static final long MILLIS_PER_HOUR = 60 * MILLIS_PER_MINUTE;
	
	/**
	 * Number of milliseconds in a standard day.
	 */
	public static final long MILLIS_PER_DAY = 24 * MILLIS_PER_HOUR;

	/**
	 * ISO8601 formatter for date without time zone. The format used is
	 * <tt>yyyy-MM-dd</tt>.
	 */
	public static final FastDateFormat DATE_FORMAT = FastDateFormat
			.getInstance("yyyy-MM-dd");

	/**
	 * ISO8601 formatter for date-time without time zone. The format used is
	 * <tt>yyyy-MM-dd HH:mm:ss</tt>.
	 */
	public static final FastDateFormat DATETIME_FORMAT = FastDateFormat
			.getInstance("yyyy-MM-dd HH:mm:ss");

	/**
	 * Compact ISO8601 date format yyyyMMdd
	 */
	public static final String COMPACT_DATE_FORMAT_PATTERN = "yyyyMMdd";

	/**
	 * ISO8601 date format: yyyy-MM-dd
	 */
	public static final String DATE_FORMAT_PATTERN = "yyyy-MM-dd";

	/**
	 * ISO8601 date-time format: yyyy-MM-dd HH:mm:ss
	 */
	public static String DATETIME_FORMAT_PATTERN = "yyyy-MM-dd HH:mm:ss";
	
	public static String DATETIME_SHORT_FORMAT = "yyyy-MM-dd HH:mm";
    
	public static String DATETIME_SHORT_FORMAT_PATTERN = "yyyyMMddHHmm";
	
	public static String DATEMINUTE_FORMAT_PATTERN = "HHmm";
	
	public static final String SQLDATEFMT = "yyyy-MM-dd HH24:MI:ss";
	public static final String SQLDATEFMTSHORT = "HH24:MI:ss";

	/************************************************************************/
	/*function:rstrfmttojul 将年月日字符串按指定格式转换为准儒略历数 
	/* 准儒略历数(距离1899.12.31的天数)       */
	/*description:fmt(YYYY-MM-DD等格式)                                        */
	/*可以任意颠倒次序，可以大写或小写，可以没有分隔符。分隔符可以是汉字 */
	/************************************************************************/
	public static int rstrfmttojul(String dateStr,String pattern){
	    Date date=DateUtils.parse(dateStr, pattern);
	    Calendar startCalendar=Calendar.getInstance();
	    startCalendar.set(1899, 12, 31);
	    return DateUtils.daysBetween(startCalendar.getTime(), date);
	}
   public static int rstrfmttojul(Date date){
        Calendar startCalendar=Calendar.getInstance();
        startCalendar.set(1899, 12, 31);
        return DateUtils.daysBetween(startCalendar.getTime(), date);
    }
	/**
	 * 将日期字符串转换为标准日期格式yyyy-MM-dd
	 * 
	 * @param str 日期字符串
	 * @return 
	 */
	public static Date parse(String str) {
		return parse(str, DATE_FORMAT_PATTERN);
	}
	/**
	 * 比较日期字符串与系统日期顺序
	 * @author Rongxin.Li
	 * @param str 日期字符串
	 * @return <0、   日期在系统日期之前
	 *         >0、   日期在系统日期之后
	 *         =0、   日期与系统日期相同
	 */
	public static int compare(String str) {
		Date date  = parse(str,COMPACT_DATE_FORMAT_PATTERN);
		Date date2 = parse(getCurrentDateAsString());
		return date.compareTo(date2);
	}
	/**
	 * 将日期字符串转换为指定的日期格式
	 * 
	 * @param str 日期字符串
	 * @param pattern 日期格式
	 * @return
	 */
	public static Date parse(String str, String pattern) {
		if (StringUtils.isBlank(str)) {
			return null;
		}
		DateFormat parser = new SimpleDateFormat(pattern);
		try {
			return parser.parse(str);
		} catch (ParseException e) {
			throw new IllegalArgumentException("Can't parse " + str + " using "
					+ pattern);
		}
	}

	/**
	 * 将日期转换为指定的字符串格式
	 * 
	 * @param date 日期
	 * @param pattern 字符串格式
	 * @return
	 */
	public static String format(Date date, String pattern) {
		if (date == null) {
			return null;
		}
		FastDateFormat df = FastDateFormat.getInstance(pattern);
		return df.format(date);
	}

	/**
	 * 将日期转换为指定的字符串格式
	 * 
	 * @param date 日期
	 * @param pattern 字符串格式
	 * @return
	 */
	public static String format(String date, String pattern) {
		if (date == null) {
			return null;
		}
		Date dateFormat = parse(date, pattern);
		FastDateFormat df = FastDateFormat.getInstance(pattern);
		return df.format(dateFormat);
	}
	
	/**
	 * 将日期转换为标准的字符串格式yyyy-MM-dd
	 * 
	 * @param date 日期
	 * @return
	 */
	public static String format(Date date) {
		return date == null ? null : DATE_FORMAT.format(date);
	}

	/**
	 * 将当前日期转换为标准的字符串格式yyyy-MM-dd
	 * 
	 * @return
	 */
	public static String getCurrentDateAsString() {
		return DATE_FORMAT.format(new Date());
	}

	/**
	 * 将当前日期转换为指定的字符串格式
	 * 
	 * @param pattern 字符串格式
	 * @return
	 */
	public static String getCurrentDateAsString(String pattern) {
		FastDateFormat formatter = FastDateFormat.getInstance(pattern);
		return formatter.format(new Date());
	}

	/**
	 * 将当前日期转换为标准的字符串格式yyyy-MM-dd HH:mm:ss
	 */
	public static String getCurrentDateTimeAsString() {
		return DATETIME_FORMAT.format(new Date());
	}
	
	// 将传来的日期格式转换成标准的字符串格式yyyy-MM-dd HH:mm:ss
	public static String getCirrentDateTimeAsSrc(Date date){
		return DATETIME_FORMAT.format(date);
	}
	/**
	 * 获得当月的最早一天，精确到秒
	 * 
	 * @return
	 */
	public static Date getStartDateTimeOfCurrentMonth() {
		return getStartDateTimeOfMonth(new Date());
	}

	/**
	 * 给定日期，获得给定日期当月的最早一天，精确到秒
	 * 
	 * @param date 给定日期
	 * @return
	 */
	public static Date getStartDateTimeOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}

	public static  boolean isDate(String dateStr,String pattern){
	    if(StringUtils.isEmpty(pattern)){
	        pattern=COMPACT_DATE_FORMAT_PATTERN;
	    }
	    Date date=parse(dateStr, pattern);
	    if(date != null ){
	        return true;
	    }
	    return false;
	}
	/**
	 * 获得当月的最晚一天，精确到秒
	 * 
	 * @return
	 */
	public static Date getEndDateTimeOfCurrentMonth() {
		return getEndDateTimeOfMonth(new Date());
	}

	/**
	 * 给定日期，获得给定日期当月的最晚一天，精确到秒
	 * 
	 * @param date 给定日期
	 * @return
	 */
	public static Date getEndDateTimeOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, cal
				.getActualMaximum(Calendar.DAY_OF_MONTH));
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}

	/**
	 * 获得当天的最早时间，精确到秒
	 * 
	 * @return
	 */
	public static Date getStartTimeOfCurrentDate() {
		return getStartTimeOfDate(new Date());
	}

	/**
	 * 给定日期，获得给定日期当天的最早时间，精确到秒
	 * 
	 * @param date 给定日期
	 * @return
	 */
	public static Date getStartTimeOfDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		return cal.getTime();
	}

	/**
	 * 获得当天的最晚时间，精确到秒
	 * 
	 * @return
	 */
	public static Date getEndTimeOfCurrentDate() {
		return getEndTimeOfDate(new Date());
	}

	/**
	 * 给定日期，获得给定日期当天的最晚时间，精确到秒
	 * 
	 * @param date 给定日期
	 * @return
	 */
	public static Date getEndTimeOfDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		return cal.getTime();
	}

	/**
	 * 给日期，添加小时
	 * 
	 * @param date 日期
	 * @param hours 添加小时数
	 * @return
	 */
	public static Date addHours(Date date, int hours) {
		return add(date, Calendar.HOUR_OF_DAY, hours);
	}

	/**
	 * 给日期，添加小时
	 * 
	 * @param date 日期
	 * @param hours 添加小时数
	 * @return
	 */
	public static String addHours(String date, int hours, String pattern) {
		Date dateFormat = parse(date, pattern);
		dateFormat = add(dateFormat, Calendar.HOUR_OF_DAY, hours);
		return format(dateFormat, pattern);
	}
	
	/**
	 * 给日期，添加分钟
	 * 
	 * @param date 日期
	 * @param minutes 添加的分钟数
	 * @return
	 */
	public static Date addMinutes(Date date, int minutes) {
		return add(date, Calendar.MINUTE, minutes);
	}

	/**
	 * 给日期，添加分钟
	 * 
	 * @param date 日期
	 * @param minutes 添加的分钟数
	 * @return
	 */
	public static String addMinutes(String date, int minutes, String pattern) {
		Date dateFormat = parse(date, pattern);
		dateFormat = add(dateFormat, Calendar.MINUTE, minutes);
		return format(dateFormat, pattern);
	}
	
	/**
	 * 给日期，添加天数
	 * 
	 * @param date 日期
	 * @param days 添加的天数
	 * @return
	 */
	public static Date addDays(Date date, int days) {
		return add(date, Calendar.DATE, days);
	}
	
	/**
	 * 给日期，添加天数
	 * 
	 * @param date 日期
	 * @param days 添加的天数
	 * @return
	 */
	public static String addDays(String date, int days, String pattern) {
		Date dateFormat = parse(date, pattern);
		dateFormat = add(dateFormat, Calendar.DATE, days);
		return format(dateFormat, pattern);
	}

	/**
	 * 给日期，添加月份
	 * 
	 * @param date 日期
	 * @param months 添加的月份数
	 * @return
	 */
	public static Date addMonths(Date date, int months) {
		return add(date, Calendar.MONTH, months);
	}

	/**
	 * 给日期，添加年数
	 * 
	 * @param date 日期
	 * @param years 添加的年数
	 * @return
	 */
	public static Date addYears(Date date, int years) {
		return add(date, Calendar.YEAR, years);
	}

	/**
	 * 给日期，添加时间
	 * 
	 * @param date 日期
	 * @param field 添加的时间单位(分钟,日,月,年)
	 * @param amount 添加的数量
	 * @return
	 */
	private static Date add(Date date, int field, int amount) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(field, amount);
		return cal.getTime();
	}

	/**
	 * 两段时间相差的天数
	 * 
	 * @param early 较早的一段时间
	 * @param late 较晚的一段时间
	 * @return
	 */
	public static final int daysBetween(Date early, Date late) {
		Calendar ecal = Calendar.getInstance();
		Calendar lcal = Calendar.getInstance();
		ecal.setTime(early);
		lcal.setTime(late);

		long etime = ecal.getTimeInMillis();
		long ltime = lcal.getTimeInMillis();
		
		return (int) ((ltime - etime) / MILLIS_PER_DAY);
	}
	
	/**
	 * 两段时间相差的天数
	 * 
	 * @param early 较早的一段时间(yyyyMMdd)
	 * @param late 较晚的一段时间(yyyyMMdd)
	 * @return
	 */
	public static final int daysBetween(String early, String late) {
		Calendar ecal = Calendar.getInstance();
		Calendar lcal = Calendar.getInstance();
		Date earlyDate = parse(early, COMPACT_DATE_FORMAT_PATTERN);
		Date lateDate = parse(late, COMPACT_DATE_FORMAT_PATTERN);
		ecal.setTime(earlyDate);
		lcal.setTime(lateDate);

		long etime = ecal.getTimeInMillis();
		long ltime = lcal.getTimeInMillis();

		return (int) ((ltime - etime) / MILLIS_PER_DAY);
	}
	
	/**
	 * 两段时间相差的分钟数
	 * 
	 * @param early 较早的一段时间(HHmm)
	 * @param late 较晚的一段时间(HHmm)
	 * @return
	 */
	public static final int minutesBetween(String early, String late) {
		Calendar ecal = Calendar.getInstance();
		Calendar lcal = Calendar.getInstance();
		Date earlyDate = parse(early, DATEMINUTE_FORMAT_PATTERN);
		Date lateDate = parse(late, DATEMINUTE_FORMAT_PATTERN);
		ecal.setTime(earlyDate);
		lcal.setTime(lateDate);

		long etime = ecal.getTimeInMillis();
		long ltime = lcal.getTimeInMillis();

		return (int) ((ltime - etime) / MILLIS_PER_MINUTE);
	}
	
	/**
	 * 两段时间相差的分钟数
	 * 
	 * @param early 较早的一段时间(HHmm)
	 * @param late 较晚的一段时间(HHmm)
	 * @return
	 */
	public static final int minutesBetween(String early, String late , String pattern) {
		Calendar ecal = Calendar.getInstance();
		Calendar lcal = Calendar.getInstance();
		Date earlyDate = parse(early, pattern);
		Date lateDate = parse(late, pattern);
		ecal.setTime(earlyDate);
		lcal.setTime(lateDate);

		long etime = ecal.getTimeInMillis();
		long ltime = lcal.getTimeInMillis();

		return (int) ((ltime - etime) / MILLIS_PER_MINUTE);
	}
	
	/**
	 * 指定日期是否在两个日期段之间
	 * 
	 * @param startDate 开始时间
	 * @param endDate 截止时间
	 * @param startTrainDate 指定日期
	 * @return
	 */
	public static final boolean isLimitDate(String startDate, String endDate,
			String startTrainDate) {
		if (startTrainDate.compareTo(startDate) >= 0
				&& startTrainDate.compareTo(endDate) <= 0) {
			return true;
		}
		return false;
	}
	
	/**
	 * 两个日期段之间是否交叉
	 * 
	 * @param startDate1 开始时间
	 * @param endDate1   截止时间
	 * @param startDate2 开始时间
	 * @param endDate2   截止时间
	 * @return
	 */
	public static final boolean isLimitDate(String startDate1, String endDate1,
			String startDate2, String endDate2) {
		if (startDate1.compareTo(endDate2) <= 0
				&& endDate1.compareTo(startDate2) >= 0) {
			return true;
		}
		return false;
	}
	
	
	public static long getMiniutes(Date date){
	    long  milliseconds=date.getTime();
	    return milliseconds/MILLIS_PER_MINUTE;
	}
	
	/**
	 * 获取当前系统时间   HHmm格式
	 * 
	 * @param 
	 * @return
	 */
	public static String getCurrentTimeAsString() {
		SimpleDateFormat sdf = new SimpleDateFormat("HHmm");
		return sdf.format(new Date());
	}
	
	/**
	 * 比较时间字符串与系统时间顺序
	 * @author Rongxin.Li
	 * @param str 日期字符串
	 * @return <0、   时间在系统时间之前
	 *         >0、   时间在系统时间之后
	 *         =0、   时间与系统时间相同
	 */
	public static int compareTime(String str) {
		int compareResult = 0;
		String currentTime = getCurrentTimeAsString();
		if(currentTime.equals(str)){
			return compareResult;
		}
		int time = Integer.parseInt(currentTime);
		int time2 = Integer.parseInt(str);
		compareResult = time>time2?-1:1;
		return compareResult;
	}
	
	public static void main(String[] args) {
	   System.out.println("今天："+getMiniutes(parse("2015-12-23")));
	   System.out.println("明天："+getMiniutes(parse("2015-12-24")));
	   System.out.println(compare("20151229"));   
	   System.out.println(daysBetween("20151229","20151228"));
	   System.out.println(getCurrentTimeAsString());
	   
	   System.out.println(compareTime("1409"));
	   System.out.println(minutesBetween("2340", "0010"));
	   System.out.println(format(add(new Date(), Calendar.DATE, -1),"yyyyMMdd"));
	   System.out.println(addHours("0012", 24, "HHmm"));
	}

}
