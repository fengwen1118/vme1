package com.vme.common.rocketmq;
/**
 * 使用消费者必须实现该类
 *
 * Created by fengwen on 16/09/29.
 *
 */
public interface IConsumer {
	
	/**
	 * 实现步骤：
	 * 1、调用PushConsumerUtil 获取消费者对象
	 * 2、监听消息队列
	 * 3、.start(),启动监听
	 */
	public void messageListener();
	
}
