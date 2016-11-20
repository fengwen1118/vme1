package com.vme.common.rocketmq;
/**
 * 查询接口
 * Created by fengwen on 16/09/29.
 *
 */
public interface IQueryRedis {
	
	/**
	 * 调用消费者后，需要执行的代码，返回值自定义
	 * @return
	 */
	public <T> T apply();
}
