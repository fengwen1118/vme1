package com.vme.gzh.test;

import com.vme.common.jedis.JedisClient;
import com.vme.gzh.service.ChatUserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * Created by fengwen on 2016/9/29.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath:applicationContext-servlet.xml")
public class GzhTest {
   private final static Logger logger = LoggerFactory.getLogger(GzhTest.class);
    @Autowired
    private ChatUserService chatUserService;

    @Autowired
    private JedisClient jedisClient;
    @Test
    public void testLogin() {
         boolean flag = chatUserService.login("fw","123");
         logger.info("FLAG="+flag);

    }
    @Test
    public void testRedis() {

       /* String redisAddress = "192.168.253.178";
        int redisPort = 6379;
        int redisTimeout = 2000;
        JedisPool pool = new JedisPool(new JedisPoolConfig(), redisAddress, redisPort, redisTimeout);
        Jedis jedis = pool.getResource();
        jedis.hset("nameGroup","name","fw");
        pool.returnResourceObject(jedis);

        jedisClient.set("name12","fw12345678");
        String name = jedisClient.get("name12");
        logger.info("name="+name);*/
    }
}
