package com.vme.common.persistence;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by fengwen on 2016/11/6.
 */
public class PageForTotal implements Serializable {

    private static final long serialVersionUID = 1L;
    private int pageNo;
    private int pageSize;
    private List rows;
    private int begin;
    private int end;
    private int length;
    private int count;
    private int current;
    private int total;
    private int totalPage;

    public PageForTotal() {
        pageNo = 1;
        pageSize = -1;
        rows = new ArrayList();
    }

    public PageForTotal(int begin, int length) {
        pageNo = 1;
        pageSize = -1;
        rows = new ArrayList();
        this.begin = begin;
        this.length = length;
        end = this.begin + this.length;
        current = (int) Math.floor(((double) this.begin * 1.0D) / (double) this.length) + 1;
    }

    public PageForTotal(int begin, int length, int count) {
        this(begin, length);
        this.count = count;
    }


    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getBegin() {
        return begin;
    }

    public int getEnd() {
        return end;
    }

    public void setEnd(int end) {
        this.end = end;
    }

    public void setBegin(int begin) {
        this.begin = begin;
        if (length != 0)
            current = (int) Math.floor(((double) this.begin * 1.0D) / (double) length) + 1;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
        if (begin != 0)
            current = (int) Math.floor(((double) begin * 1.0D) / (double) this.length) + 1;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
        total = (int) Math.floor(((double) this.count * 1.0D) / (double) length);
        if (this.count % length != 0)
            total++;
    }

    public int getCurrent() {
        return current;
    }

    public void setCurrent(int current) {
        this.current = current;
    }

    public int getTotal() {
        if (total == 0)
            return 1;
        else
            return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        if (pageSize > 0)
            this.pageSize = pageSize;
        else
            pageSize = 1;
        setLength(pageSize);
        begin = (pageNo - 1) * pageSize;
        end = begin + this.pageSize;
    }

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        if (pageNo > 0)
            this.pageNo = pageNo;
        else
            this.pageNo = 1;
        setCurrent(pageNo);
        if (pageSize > 0) {
            begin = (pageNo - 1) * pageSize;
            end = begin + pageSize;
        }
    }

    public List getRows() {
        return rows;
    }

    public void setRows(List rows) {
        this.rows = rows;
    }
}
