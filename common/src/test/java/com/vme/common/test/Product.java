package com.vme.common.test;

import org.apache.solr.client.solrj.beans.Field;

/**
 * Created by fengwen on 2016/11/20.
 */
public class Product {

    @Field(value="id")
    private int id;
    @Field(value="name")
    private String name;
    @Field(value="title")
    private String title;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
