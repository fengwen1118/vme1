package com.vme.sys.gzh.controller;

import com.vme.common.utils.SpringMVCUtils;
import com.vme.gzh.service.ChatUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by fengwen on 2016/9/28.
 */

    @Controller
    @Scope("prototype") //多例
    @RequestMapping("/user")
    public class UserController {
        private final static Logger logger = LoggerFactory.getLogger(UserController.class);

        @Autowired
        private ChatUserService chatUserService;

        @RequestMapping("/login")
        public void login(HttpServletRequest request, HttpServletResponse response, String userName, String passWord ){
            Map<String , Object> result = new HashMap<>();
            logger.info("login start! userName=" );
            //将当前用户的信息存入session中
            Map user =new HashMap<>();
            user.put("userName",userName);
            user.put("passWord",userName);
            boolean loginFlag = chatUserService.login(userName,passWord);
            if(loginFlag){
                result.put("success",true);
                //request.getSession().setAttribute("sessionUser", tlAgUser);
                request.getSession().setAttribute("sessionUser",user);
            }else{
                result.put("success",false);
            }
            SpringMVCUtils.renderJson(response, result);
        }


    }
