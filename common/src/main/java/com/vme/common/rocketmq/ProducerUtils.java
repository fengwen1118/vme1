package com.vme.common.rocketmq;


import com.alibaba.rocketmq.client.producer.DefaultMQProducer;
import com.alibaba.rocketmq.client.producer.SendResult;
import com.alibaba.rocketmq.client.producer.SendStatus;
import com.alibaba.rocketmq.common.message.Message;
import com.vme.common.utils.SerializationUtils;
import com.vme.common.utils.LocalUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 * 生产者 方法封装
 * Created by fengwen on 16/09/29.
 *
 */
@Component
public class ProducerUtils{
	
	private static Logger log = LoggerFactory.getLogger(ProducerUtils.class);
	
	private static DefaultMQProducer defaultMQProducer;
	
	@Value("${rocketMq.producerGroup}")
	private String producerGroup;
	
	@Value("${rocketMq.instanceName}")
	private String instanceName;
	
	@Value("${rocketMq.namesrvAddr}")
	private String namesrvAddr;
	
	@Value("${rocketMq.defaultTopicQueueNums}")
	private String defaultTopicQueueNums;

	@Value("${rocketMq.sendMsgTimeout}")
	private String sendMsgTimeout;

	@Value("${rocketMq.compressMsgBodyOverHowmuch}")
	private String compressMsgBodyOverHowmuch;

	@Value("${rocketMq.retryAnotherBrokerWhenNotStoreOK}")
	private String retryAnotherBrokerWhenNotStoreOK;

	@Value("${rocketMq.maxMessageSize}")
	private String maxMessageSize;
	
	@PostConstruct
	public void initProducer(){
		log.info("初始化Producer开始");
		defaultMQProducer = new DefaultMQProducer();
		defaultMQProducer.setProducerGroup(this.producerGroup);
		defaultMQProducer.setInstanceName(this.instanceName);
		defaultMQProducer.setNamesrvAddr(this.namesrvAddr);
		defaultMQProducer.setDefaultTopicQueueNums(Integer.parseInt(this.defaultTopicQueueNums));
		defaultMQProducer.setSendMsgTimeout(Integer.parseInt(this.sendMsgTimeout));
		defaultMQProducer.setCompressMsgBodyOverHowmuch(Integer.parseInt(this.compressMsgBodyOverHowmuch));
		defaultMQProducer.setRetryAnotherBrokerWhenNotStoreOK(Boolean.parseBoolean(this.retryAnotherBrokerWhenNotStoreOK));
		defaultMQProducer.setMaxMessageSize(Integer.parseInt(this.maxMessageSize));
		defaultMQProducer.setClientIP(LocalUtil.getIP());
		try {
			defaultMQProducer.start();
		} catch (Exception e) {
			e.printStackTrace();
		}
		log.info("初始化Producer完毕");
	}
	
	/**
	 * 发送消息
	 * @param topic
	 * 			线下环境不需要申请，线上环境需要申请后才能使用，需要保证系统唯一
	 * @param tags
	 * 			类似于 Gmail 为每封邮件设置的标签，方便服务器过滤使用。目前只支持每个消息设置一个 tag，所以也可以类比为 Notify 的 MessageType 概念
	 * @param body
	 * 			传递的数据
	 * @param key
	 * 			选填，代表这条消息的业务关键词，服务器会根据 keys 创建哈希索引，设置后，
	 *			可以在 Console 系统根据 Topic、Keys 来查询消息，由于是哈希索引，请尽可能
	 *			保证 key 唯一，例如订单号，商品 Id 等
	 * @param flag
	 * 			选填，完全由应用来设置，RocketMQ 不做干预
	 * @param level
	 * 			选填，消息延时级别，0 表示不延时，大于 0 会延时特定的时间才会被消费
	 * @param waitStoreMsgOK
	 * 			选填，表示消息是否在服务器落盘后才返回应答
	 * @return
	 * @throws Exception
	 */
	public static SendResult send(String topic, String tags, Object body, String key, int flag, int level, boolean waitStoreMsgOK) throws Exception{
		if(StringUtils.isBlank(topic)){
			 throw new Exception("topic不可以为空"); 
		}
		if(StringUtils.isBlank(tags)){
			 throw new Exception("tags不可以为空"); 
		}
		if(body == null){
			 throw new Exception("body不可以为空"); 
		}
		SendResult sendResult = defaultMQProducer.send(setMessage(topic, tags, body, key, flag, level, waitStoreMsgOK));
		//log.info("总线消息发送，topic：" + topic + "，tags：" + tags + "，状态：" + sendResult.getSendStatus());
		return sendResult;
	}
	
	public static SendResult send(String topic, String tags, Object body, String key) throws Exception{
		return send(topic, tags, body, key, 0, 0, false);
	}
	
	public static SendResult send(String topic, String tags, Object body) throws Exception{
		return send(topic, tags, body, null, 0, 0, false);
	}
	
	/**
	 * 发送消息 oneWay
	 * @return
	 * @throws Exception
	 */
	public static void sendOneway(String topic, String tags, Object body, String key, int flag, int level, boolean waitStoreMsgOK) throws Exception{
		if(StringUtils.isBlank(topic)){
			 throw new Exception("topic不可以为空"); 
		}
		if(StringUtils.isBlank(tags)){
			 throw new Exception("tags不可以为空"); 
		}
		if(body == null){
			 throw new Exception("body不可以为空"); 
		}
        defaultMQProducer.sendOneway(setMessage(topic, tags, body, key, flag, level, waitStoreMsgOK));
	}
	
	public static void sendOneway(String topic, String tags, Object body, String key) throws Exception{
		sendOneway(topic, tags, body, key, 0, 0, false);
	}
	
	public static void sendOneway(String topic, String tags, Object body) throws Exception{
		sendOneway(topic, tags, body, null, 0, 0, false);
	}
	
	/**
	 * 设置消息
	 * @param topic
	 * @param tags
	 * @param body
	 * @param key
	 * @param flag
	 * @param level
	 * @param waitStoreMsgOK
	 * @return
	 * @throws Exception
	 */
	private static Message setMessage(String topic, String tags, Object body, String key, int flag, int level, boolean waitStoreMsgOK) throws Exception{
		Message msg=new Message();
        msg.setTopic(topic);
        msg.setTags(tags);
        msg.setBody(SerializationUtils.kryoSerialize(body));
        if(StringUtils.isNotBlank(key)){
        	 msg.setKeys(key);
        }
        msg.setFlag(flag);
        msg.setDelayTimeLevel(level);
        msg.setWaitStoreMsgOK(waitStoreMsgOK);
        return msg;
	}
	
	/**
	 * 有结果返回，向总线发送消息
	 * @param topic
	 * 			
	 * @param tags
	 * 			
	 * @param body
	 * 			总线消息内容
	 * @param key
	 * 			key
	 * @param i
	 * 			实现接口
	 * @param timeOut
	 * 			阻塞时间，单位 毫秒
	 * @param sleepTime
	 * 			每次执行i接口时间，单位 毫秒
	 * @return
	 * @throws Exception
	 */
	public static <T> T sendMsgForResult(String topic, String tags, Object body, String key, IQueryRedis i, Long timeOut, Long sleepTime) throws Exception{
		//1、发送消息
		SendResult sendResult = null;
		if(StringUtils.isBlank(key)){
			sendResult = send(topic, tags, body);
		}else{
			sendResult = send(topic, tags, body, key);
		}
		
		//2、根据时间进行操作
		if(sendResult.getSendStatus().equals(SendStatus.SEND_OK)){//发送成功
			T t = null;
			//阻塞主线程
			if(timeOut == null || timeOut == 0){
				timeOut = 1000L;//阻塞一秒
			}
			if(sleepTime == null || sleepTime == 0){
				sleepTime = 100L;
			}
			while(timeOut > 0){//之间未到
				t = i.apply();
				if(t != null){//查询到结果，跳出循环返回
					break;
				}
				Thread.sleep(sleepTime);//睡眠0.1
				timeOut = timeOut - sleepTime;
			}
			return t;
		}
		return null;
	}
	
	public static <T> T sendMsgForResult(String topic, String tags, Object body, IQueryRedis i, Long timeOut, Long sleepTime) throws Exception{
		return sendMsgForResult(topic, tags, body, null, i, timeOut, sleepTime);
	}
	
	public static <T> T sendMsgForResult(String topic, String tags, Object body, IQueryRedis i) throws Exception{
		return sendMsgForResult(topic, tags, body, i, null, null);
	}
	
	public static <T> T sendMsgForResult(String topic, String tags, Object body, String key, IQueryRedis i) throws Exception{
		return sendMsgForResult(topic, tags, body, key, i, null, null);
	}
	
	/**
	 * 容器关闭时候，释放生产者
	 */
	@PreDestroy
	public void destory(){
		defaultMQProducer.shutdown();
	}
}
