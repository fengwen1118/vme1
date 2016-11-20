package com.vme.common.persistence;

import org.apache.ibatis.reflection.factory.DefaultObjectFactory;

public class MyObjectFactory extends DefaultObjectFactory {
    @Override
    public <T> boolean isCollection(Class<T> type) {
        return super.isCollection(type)|| (Page.class.isAssignableFrom(type));
    }

/*
    @Override
    public <T> T create(Class<T> type) {
        return super.create(type);
    }
*/
}
