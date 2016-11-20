package com.vme.common.rocketmq;

import com.alibaba.rocketmq.client.consumer.DefaultMQPushConsumer;
import com.alibaba.rocketmq.common.consumer.ConsumeFromWhere;
import com.vme.common.utils.LocalUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.UUID;

/**
 * 推送消费者工具类
 * Created by fengwen on 16/09/29.
 *
 */
@Component
public class PushConsumerUtil {
	
	@Value("${rocketMq.namesrvAddr}")
	private String namesrvAddr;
	
	@Value("${rocketMq.consumeThreadMin}")
	private String consumeThreadMin;
	
	@Value("${rocketMq.consumeThreadMax}")
	private String consumeThreadMax;

	@Value("${rocketMq.consumeConcurrentlyMaxSpan}")
	private String consumeConcurrentlyMaxSpan;
	
	@Value("${rocketMq.pullThresholdForQueue}")
	private String pullThresholdForQueue;
	
	@Value("${rocketMq.pullInterval}")
	private String pullInterval;
	
	@Value("${rocketMq.consumeMessageBatchMaxSize}")
	private String consumeMessageBatchMaxSize;
	
	@Value("${rocketMq.pullBatchSize}")
	private String pullBatchSize;
	
	/**
	 * 
	 * @param c
	 * 			当前使用类
	 * @param topic
	 * 			当只监听一个topci时候使用
	 * @param tags
	 * 			监听的tags ,tags1 || tags2 || tag3
	 * @param subscribeInfo
	 * 			key->topic,vale->tags，tags1 || tags2 || tag3
	 * @param consumeThreadMin
	 * 			监听线程数据（最小）
	 * @param consumeThreadMax
	 * 			监听线程数据（最大）
	 * @param pullInterval
	 * 			拉消息间隔，由于是长轮询，所以为 0，但是如果应用为了流控，也可以设置大于 0 的值，单位毫秒
	 * @param consumeMessageBatchMaxSize
	 * 			批量消费，一次消费多少条消息
	 * @param pullBatchSize
	 * 			批量拉消息，一次最多拉多少条
	 * @param namesrvAddr
	 * 			监听服务器
	 * @return
	 * @throws Exception
	 */
	public DefaultMQPushConsumer getPushConsumer(Class c, String topic, String tags, Map<String, String> subscribeInfo,int consumeThreadMin, int consumeThreadMax, String pullInterval, String consumeMessageBatchMaxSize, String pullBatchSize,String namesrvAddr) throws Exception{
		DefaultMQPushConsumer consumer = new DefaultMQPushConsumer();
		//设置消费者组，消费者名称（统一使用类名进行处理）
		String className = c.getName().replace(".", "_");
		consumer.setConsumerGroup(className);
		consumer.setInstanceName(UUID.randomUUID().toString());
		if(StringUtils.isBlank(namesrvAddr)){
			consumer.setNamesrvAddr(this.namesrvAddr);
		}else{
			consumer.setNamesrvAddr(namesrvAddr);
		}
		if(consumeThreadMin == 0){
			consumer.setConsumeThreadMin(Integer.parseInt(this.consumeThreadMin));
		}else{
			consumer.setConsumeThreadMin(consumeThreadMin);
		}
		if(consumeThreadMax == 0){
			consumer.setConsumeThreadMax(Integer.parseInt(this.consumeThreadMax));
		}else{
			consumer.setConsumeThreadMax(consumeThreadMax);
		}
		consumer.setConsumeConcurrentlyMaxSpan(Integer.parseInt(this.consumeConcurrentlyMaxSpan));
		consumer.setPullThresholdForQueue(Integer.parseInt(this.pullThresholdForQueue));
		if(StringUtils.isBlank(pullInterval)){
			consumer.setPullInterval(Long.parseLong(this.pullInterval));
		}else{
			consumer.setPullInterval(Long.parseLong(pullInterval));
		}
		if(StringUtils.isBlank(consumeMessageBatchMaxSize)){
			consumer.setConsumeMessageBatchMaxSize(Integer.parseInt(this.consumeMessageBatchMaxSize));
		}else{
			consumer.setConsumeMessageBatchMaxSize(Integer.parseInt(consumeMessageBatchMaxSize));
		}
		if(StringUtils.isBlank(pullBatchSize)){
			consumer.setPullBatchSize(Integer.parseInt(this.pullBatchSize));
		}else{
			consumer.setPullBatchSize(Integer.parseInt(pullBatchSize));
		}
		/**
         * 设置Consumer第一次启动是从队列头部开始消费还是队列尾部开始消费<br>
         * 如果非第一次启动，那么按照上次消费的位置继续消费
         */
        consumer.setConsumeFromWhere(ConsumeFromWhere.CONSUME_FROM_FIRST_OFFSET);
        //订阅消息
        if(StringUtils.isNotBlank(topic)){
        	//topic不空的时候，默认监一个topic
        	if(StringUtils.isNotBlank(tags)){
        		consumer.subscribe(topic, tags);
        	}else{
        		consumer.subscribe(topic, "*");//不传入的时候，直接监听全部
        	}
        } else {
        	//监听多个topic
        	for(String subTopic : subscribeInfo.keySet()){
				String tagsList = subscribeInfo.get(topic);
				if(StringUtils.isBlank(tagsList)){//tags不存在的时候，订阅topic下全部的消息
					consumer.subscribe(subTopic, "*");
				}else{
					consumer.subscribe(subTopic, tagsList);
				}
			}
        }
        //设置客户端IP
        consumer.setClientIP(LocalUtil.getIP());
		return consumer;
	}
	
	public DefaultMQPushConsumer getPushConsumer(Class c, Map<String, String> subscribeInfo) throws Exception{
		return this.getPushConsumer(c, subscribeInfo, 0, 0);
	}
	
	public DefaultMQPushConsumer getPushConsumer(Class c, Map<String, String> subscribeInfo, int consumeThreadMin, int consumeThreadMax) throws Exception{
		return this.getPushConsumer(c,  null, null, subscribeInfo, consumeThreadMin, consumeThreadMax, null, null, null, null);
	}
	
	public DefaultMQPushConsumer getPushConsumer(Class c, String topic, String tags, int consumeThreadMin, int consumeThreadMax) throws Exception{
		if(StringUtils.isBlank(topic)){
			throw new Exception("topic不可为空");
		}
		return this.getPushConsumer(c,  topic, tags, null, consumeThreadMin, consumeThreadMax, null, null, null, null);
	}
	
	public DefaultMQPushConsumer getPushConsumer(Class c, String topic, String tags) throws Exception{
		if(StringUtils.isBlank(topic)){
			throw new Exception("topic不可为空");
		}
		return this.getPushConsumer(c,  topic, tags, 0, 0);
	}
	
	public DefaultMQPushConsumer getPushConsumer(Class c, String topic) throws Exception{
		if(StringUtils.isBlank(topic)){
			throw new Exception("topic不可为空");
		}
		return this.getPushConsumer(c,  topic, null);
	}
	
}
