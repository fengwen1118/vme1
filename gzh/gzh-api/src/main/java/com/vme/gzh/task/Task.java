package com.vme.gzh.task;

import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Date;

/**
 * Created by fengwen on 2016/10/7.
 */
@Component
public class Task {
    private static org.slf4j.Logger log = LoggerFactory.getLogger(Task.class);
    //@Scheduled(cron = "0 0 1 * * ?") //每1分钟跑一次
    @Scheduled(cron="0/5 * *  * * ? ")   //每5秒执行一次
    public void countTask() {
        log.info("。。。定时任务开始 。。。");
        long time1= new Date().getTime();
        int sub=0;
        for (int i=0;i<1000;i++) {
           sub= sub + i;
        }
        long time2= new Date().getTime();
        long time = time2-time1;
        log.info("。。。定时任务完成 。。。用时 "+time+"ms sub =  "+sub );
    }
}
