package com.vme.common.rocketmq;

import com.alibaba.rocketmq.client.consumer.DefaultMQPushConsumer;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyContext;
import com.alibaba.rocketmq.client.consumer.listener.ConsumeConcurrentlyStatus;
import com.alibaba.rocketmq.client.consumer.listener.MessageListenerConcurrently;
import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.common.message.MessageExt;
import com.vme.common.utils.SerializationUtils;


import java.util.HashMap;
import java.util.List;

/**
 * Created by fengwen on 16/09/29.
 */
public class ConsumerTest {
    public static void main(String[] args) throws InterruptedException, MQClientException {

        DefaultMQPushConsumer consumer = new DefaultMQPushConsumer("QuickStartConsumer");

        consumer.setNamesrvAddr("192.168.253.178:9876");
        consumer.setInstanceName("QuickStartConsumer");
        consumer.subscribe("carnation", "*");
        consumer.registerMessageListener(new MessageListenerConcurrently() {
            @Override
            public ConsumeConcurrentlyStatus consumeMessage(List<MessageExt> msgs,
                                                            ConsumeConcurrentlyContext context) {
                MessageExt messageExt=msgs.get(0);
                HashMap body=new HashMap();

                try {
                    body = (HashMap) SerializationUtils.kryoDeserialize(messageExt.getBody());
                } catch (Exception e) {
                    e.printStackTrace();
                }
                System.out.println(body.get("name"));
                return ConsumeConcurrentlyStatus.CONSUME_SUCCESS;
                }
            });

        consumer.start();

        System.out.println("Consumer Started.");
    }
}

