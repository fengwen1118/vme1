package com.vme.common.rocketmq;

import com.alibaba.rocketmq.client.exception.MQClientException;
import com.alibaba.rocketmq.client.producer.DefaultMQProducer;
import com.alibaba.rocketmq.client.producer.SendResult;
import com.alibaba.rocketmq.common.message.Message;
import com.vme.common.utils.SerializationUtils;

import java.util.HashMap;

/**
 * Created by fengwen on 16/09/29.
 */
public class ProducerTest {

    public static void main(String[] args) throws MQClientException, InterruptedException {

        DefaultMQProducer producer = new DefaultMQProducer("QuickStartProducer");
        producer.setNamesrvAddr("192.168.253.178:9876");
        producer.setInstanceName("QuickStartProducer");
        producer.start();

        for (int i = 0; i < 20; i++) {
            try {
                Message msg=new Message();
                msg.setTopic("carnation");
                msg.setTags("employee");
                HashMap hashMap=new HashMap();
                hashMap.put("name","xutao"+i);
                msg.setBody(SerializationUtils.kryoSerialize(hashMap));
                msg.setKeys("carnation:employee:"+i);
                SendResult sendResult = producer.send(msg);
                System.out.println(sendResult);
            }
            catch (Exception e) {
                e.printStackTrace();
                Thread.sleep(1000);
            }
        }

        producer.shutdown();
    }


}
