package com.vme.common.utils;

/**
 * Created by fengwen on 16/9/28.
 */
public class UUID {
	
	public static String uuid(){
		java.util.UUID uuid = java.util.UUID.randomUUID();
		return uuid.toString().replaceAll("-", "");
	}
	
	public static void main(String[] args) {
		System.out.println(UUID.uuid());
	}
}