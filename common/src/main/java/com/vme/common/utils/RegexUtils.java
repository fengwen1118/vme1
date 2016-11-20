package com.vme.common.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by fengwen on 16/9/28.
 */
public class RegexUtils {
    /**
     * 判断账号是否为手机号,根据是否带国家号做判断
     * @param account
     * @return
     */
    public static boolean isPhone(String account) {
        boolean result = false;

        if (0 == account.indexOf("+")) {
            result = true;
        }

        return result;
    }

    /**
     * 判断账号是否为邮箱
     * @param account
     * @return
     */
    public static boolean isEmail(String account) {
        return  RegexUtils.isMatch("[\\w!#$%&'*+/=?^_`{|}~-]+(?:\\.[\\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\\w](?:[\\w-]*[\\w])?\\.)+[\\w](?:[\\w-]*[\\w])?", account);
    }

    /**
     * 判断字符串是否为纯数字
     * @param content
     * @return
     */
    public static boolean isNumeric(String content) {
        return isMatch("^[0-9]*$", content);
    }

    /**
     * 判断是否匹配
     * @param regex
     * @param content
     * @return
     */
    public static boolean isMatch(String regex, String content) {
        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(content);
        return m.matches();
    }

    /**
     * 获取第一个匹配项的括号内容
     * @param regex
     * @param content
     * @return
     */
    public static String getGroup1(String regex, String content) {
        String result = null;

        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(content);
        if (m.find()) {
            result = m.group(1);
        }

        return result;
    }

    /**
     * 查找第一个匹配的元素
     * @param regex
     * @param content
     * @return
     */
    public static String findFirst(String regex, String content) {
        String result = null;

        Pattern p = Pattern.compile(regex);
        Matcher m = p.matcher(content);

        if (m.find()) {
            result = m.group(0);
        }

        return result;
    }

}
