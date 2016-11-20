package com.vme.common.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

/**
 * Created by fengwen on 16/9/28.
 */
public class StringEncrypt {

    /**
     * 对字符串加密,加密算法使用MD5,SHA-1,SHA-256,默认使用SHA-256
     *
     * @param strSrc  要加密的字符串
     * @param encName 加密类型
     * @return
     */
    public static String Encrypt(String strSrc, String encName) {
        MessageDigest md = null;
        String strDes = null;

        byte[] bt = strSrc.getBytes();
        try {
            if (encName == null || encName.equals("")) {
                encName = "SHA-256";
            }
            md = MessageDigest.getInstance(encName);
            md.update(bt);
            strDes = bytes2Hex(md.digest()); // to HexString
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
        return strDes;
    }

    private static String bytes2Hex(byte[] bts) {
        String des = "";
        String tmp = null;
        for (int i = 0; i < bts.length; i++) {
            tmp = (Integer.toHexString(bts[i] & 0xFF));
            if (tmp.length() == 1) {
                des += "0";
            }
            des += tmp;
        }
        return des;
    }

    public static String getSecureRamdonForSHA256() {
        return getSecureRamdon(32);
    }

    /**
     * 获取指定长度的安全随机数
     * @param stringLength
     * @return
     */
    public static String getSecureRamdon(int stringLength) {
        StringBuffer result = new StringBuffer();
        byte[] bytes = new byte[stringLength];

        Random ranGen = new SecureRandom();
        ranGen.nextBytes(bytes);
        for (int i = 0; i < bytes.length; i++) {
            String hex = Integer.toHexString(0xff & bytes[i]);
            if (hex.length() == 1)
                result.append('0');
            result.append(hex);
        }

        return result.toString();
    }

    /**
     * 慢速比对两个字符串
     * @param a
     * @param b
     * @return
     */
    public static boolean slowEquals(byte[] a, byte[] b) {
        int diff = a.length ^ b.length;
        for(int i = 0; i < a.length && i < b.length; i++) {
            diff |= a[i] ^ b[i];
        }
        return 0 == diff;
    }


    public static void main(String[] args) {
        System.out.println("getSecureRamdon:" + Encrypt("aa", null));
        System.out.println("getSecureRamdon:" + getSecureRamdonForSHA256());
    }

}
