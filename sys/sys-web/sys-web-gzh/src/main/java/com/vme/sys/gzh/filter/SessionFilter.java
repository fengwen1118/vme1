package com.vme.sys.gzh.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;

/**
 * Created by fengwen on 2016/11/3.
 */
public class SessionFilter implements Filter {
    /* 可以通过的url */
    private static final String[] INERENT_ESCAPE_URIS = { "login.html",
            "login.do", "/Cmd/Job_", "synData.do","cmd/monitor","/order/queryOrderList.do" };
    /* 可以访问的文件后缀*/
    private static final String[] INERENT_DONT_LEFT = { ".do",".css", ".js", ".jpg",".ipa",".apk", ".png",".gif",".eot",".woff2",".woff",".ttf",".svg" };

    private static final String FILTERED_REQUEST = "@@session_context_filtered_request";

    /* session中用户信息*/
    public static String SESSION_USER = "sessionUser";

    @Override
    public void init(FilterConfig filterConfig) throws ServletException { }

    @Override
    public void destroy() { }

    /**
     * 查看url是否是合法url
     *
     * @param URL
     * @return
     */
    private boolean ifURlLogin(String URL) {
        for (String uri : INERENT_DONT_LEFT) {
            if (URL.indexOf(".") != -1) {
                if (URL.substring(URL.lastIndexOf(".")).equalsIgnoreCase(uri)) {
                    return true;
                }
            }
        }
        for (String uri : INERENT_ESCAPE_URIS) {
            if (URL != null && URL.indexOf(uri) >= 0) {
                return true;
            }
        }
        return false;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (request != null && request.getAttribute(FILTERED_REQUEST) != null) {
            chain.doFilter(request, response);
        } else {
            request.setAttribute(FILTERED_REQUEST, Boolean.TRUE);
            HttpServletRequest httpServletRequest = (HttpServletRequest) request;
            HttpServletResponse httpServletResponse = (HttpServletResponse) response;
            HttpSession session = httpServletRequest.getSession();
            //获取登录用户信息
            Object user =  session.getAttribute(SESSION_USER);
            //不存在用户信息，或者为非法请求的时候，跳出登录
            if (user == null && !ifURlLogin(httpServletRequest.getRequestURI())) {
                String uri = httpServletRequest.getRequestURI();
                String ctx = httpServletRequest.getContextPath();
                int ctxLength = ctx.length();
                uri = uri.substring(ctxLength);
                if (isAjaxRequest(httpServletRequest)) {
                    httpServletResponse.setHeader("redirect", ctx + "/login.html");
                    httpServletResponse.setContentType("text/html");
                    httpServletResponse.setCharacterEncoding("utf-8");
                    httpServletResponse.setHeader("title", "session is out!");
                    httpServletResponse.setHeader("msg", "login out!");
                    Writer writer = response.getWriter();
                    ((PrintWriter) writer).print("timeout");
                    writer.flush();
                    writer.close();
                } else {
                    httpServletResponse.sendRedirect(ctx + "/login.html");
                    return;
                }
            }
            chain.doFilter(request, response);
        }
    }

    /**
     * 判断是否是ajax请求
     * @param request
     * @return
     */
    private boolean isAjaxRequest(HttpServletRequest request) {
        String requestType = request.getHeader("X-Requested-With"); // 获取ajax请求标题头
        if (requestType == null || requestType.equals(""))
            return false;
        else
            return true;
    }
}
