package com.vme.gzh.service.impl;

import com.vme.gzh.dao.ChatUserMapper;
import com.vme.gzh.domain.ChatUser;
import com.vme.gzh.service.ChatUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by fengwen on 2016/8/28.
 */
@Service
public class ChatUserServiceImpl implements ChatUserService {
    @Autowired
    private ChatUserMapper chatUserMapper;

    @Override
    public boolean login(String username, String password) {
        boolean flag=false;
        Map map = new HashMap<>();
        map.put("username",username);
        map.put("password",password);
        ChatUser chatUser = chatUserMapper.login(map);
        if(chatUser!=null){
            flag = true;
        }
        return flag;
    }
}
