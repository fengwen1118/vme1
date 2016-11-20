package com.vme.common.test;

import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.junit.Test;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SolrTest {
	private static Logger log = Logger.getLogger(SolrTest.class);
	String urlString = "http://192.168.253.178:8080/solr/product";
	SolrClient solr = new HttpSolrClient(urlString);
	@Test
	public void addIndex() throws SolrServerException, IOException{
       //如果是id 相同，它会直接更新

		//第一种添加方式...
		SolrInputDocument document=new SolrInputDocument();
		document.addField("id", "1001");
		document.addField("name", "丰雨桐");
		document.addField("title", "很有文艺范的一个女孩名字");
		solr.add(document);

       //第二种添加方式...
	/*	List<Product> list=new ArrayList<Product>();
		Product product=null;
		for(int i=1;i<=25;i++){
			product=new Product();
			product.setId(i);
			product.setTitle("1553功能测试板卡"+i);
			product.setName("产品"+i);
			list.add(product);
		}
		//solr.addBean(product);
		solr.addBeans(list);*/

		solr.commit();
	}
	@Test
	public void Del() throws SolrServerException, IOException{
		solr.deleteById("1001");
		solr.commit();
	}


	@Test
	public void testFind() throws SolrServerException,IOException{

		SolrQuery solrParams=new SolrQuery();
		solrParams.setQuery("title:1553");
		//分页
		solrParams.setStart(10);
		solrParams.setRows(10);
		//开启高亮...
		solrParams.setHighlight(true);
		//高亮显示的格式...
		solrParams.setHighlightSimplePre("<font color='red'>");
		solrParams.setHighlightSimplePost("</font>");
		//需要字段进行高亮...
		solrParams.setParam("hl.fl", "title");
		QueryResponse queryResponse=solr.query(solrParams);

		//返回所有的结果...
		SolrDocumentList documentList=queryResponse.getResults();
		Map<String, Map<String, List<String>>> maplist=queryResponse.getHighlighting();

		//返回高亮之后的结果..
		for(SolrDocument solrDocument:documentList){
			Object id=solrDocument.get("id");
			Map<String, List<String>>  fieldMap=maplist.get(id);
			List<String> stringlist=fieldMap.get("title");
			System.out.println(stringlist);
		}

	}


}
