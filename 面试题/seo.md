### SEO

1. 提交sitemap

2. changefreq：页面内容更新频率。
   
   lastmod：页面最后修改时间
   
   loc：页面永久链接地址
   
   priority：相对于其他页面的优先权
   
   url：相对于前4个标签的父标签
   
   urlset：相对于前5个标签的父标签

3. img的alt和title属性尽量都填

4. 减少http请求，提高网站的加载速度

5. 合理的设计title、description和keywords

6. ```html
   <title>标题：只强调重点即可，尽量把重要的关键词放在前面，关键词不要重复出现，尽量做到每个页面的,标题中不要设置相同的内容。</title>
   <meta name="keywords" content="面试题，笔试题，XX网">标签：关键词，列举出几个页面的重要关键字即可，切记过分堆砌。
   <meta name="description" content="meta标签的作用">标签：网页描述，需要高度概括网页内容，切记不能太长，过分堆砌关键词，每个页面也要有所不同。
   ```

7. noscript标签用来定义在脚本未被执行时的替代内容

8. 或者使用nginx代理

9. 更好的做法是首屏用ssr渲染
