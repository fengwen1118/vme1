package com.vme.common.utils;

/**
 * Created by fengwen on 16/9/28.
 */
public enum ErrorCodeEnum {
    //通用
	SUCCESS("0","ok"),
    APPLICATION_ERROR("20001", "应用程序错误!"),

    //请求
	PARAMETERFORMATERROR("10001","参数格式错误！"),
	PARAMETERMISSING("10002","参数值缺失！"),
	PARAMETERVALUEINVALID("10003","参数值无效！"),
    INTERFACE_CANCELLED("10004", "接口被取消!"),
    REQUEST_ILLEGAL("40004","请求非法"),

    //删除
    DELETE_NO_AUTHORITY("50001","无权限删除");



    private String resultCode;
    private String resultMsg;

    private ErrorCodeEnum() {
    }

    private ErrorCodeEnum(String resultCode, String resultMsg) {
        this.resultCode = resultCode;
        this.resultMsg = resultMsg;
    }

    public String getResultCode() {
        return resultCode;
    }

    public void setResultCode(String resultCode) {
        this.resultCode = resultCode;
    }


    public String getResultMsg() {
        return resultMsg;
    }

    public void setResultMsg(String resultMsg) {
        this.resultMsg = resultMsg;
    }

    public static String getValues(String resultCode){
        for(ErrorCodeEnum chronicEnum:ErrorCodeEnum.values()){
            if(chronicEnum.resultCode==resultCode){
                return chronicEnum.resultMsg;
            }
        }
        return null;
    }

    public static ErrorCodeEnum getEnumByCode(String resultCode){
        for(ErrorCodeEnum chronicEnum:ErrorCodeEnum.values()){
            if(chronicEnum.getResultCode().equals(resultCode)){
                return chronicEnum;
            }
        }
        return null;
    }

    public static ErrorCodeEnum getEnumByMsg(String resultMsg){
        for(ErrorCodeEnum chronicEnum:ErrorCodeEnum.values()){
            if(chronicEnum.getResultMsg().equals(resultMsg)){
                return chronicEnum;
            }
        }
        return null;
    }
    
}
