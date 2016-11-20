package com.vme.common.interceptor;


import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Properties;

/**
 * 数据库操作，拦截器，当执行增删改操作的时候，需要时时更新的
 *
 *
 */
@Intercepts({ @Signature(type = Executor.class, method = "update", args = { MappedStatement.class, Object.class }) })
public class MybatisInterceptor implements Interceptor {

	private Properties properties;

	private static Logger log = LoggerFactory.getLogger(MybatisInterceptor.class);

	/**
	 * 拦截操作 当admin系统增、删、改数据的时候，把sql放入总线 用于redis的实时同步
	 */
	@Override
	public Object intercept(Invocation invocation) throws Throwable {

		return invocation.proceed();
	}

	@Override
	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	@Override
	public void setProperties(Properties properties) {
		this.properties = properties;
	}
	

}