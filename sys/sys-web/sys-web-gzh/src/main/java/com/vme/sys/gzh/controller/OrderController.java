package com.vme.sys.gzh.controller;

import com.vme.common.persistence.PageForTotal;
import com.vme.common.utils.SpringMVCUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by fengwen on 2016/11/6.
 */
@Controller
@Scope("prototype") //多例
@RequestMapping("/order")
public class OrderController {
    private final static Logger logger = LoggerFactory.getLogger(OrderController.class);

    @RequestMapping("/queryOrderList")
    public void query(HttpServletRequest request, HttpServletResponse response ){

        List<Map<String, Object>> queryOrderList = null;
        int count = 0;
        int pageBegin = 1;
        int rows = 10;
        PageForTotal page = new PageForTotal(pageBegin,rows);
        page.setCount(count);
        page.setRows(queryOrderList);
        page.setTotalPage(page.getTotal());

        SpringMVCUtils.renderJson(response, page);
    }
}
