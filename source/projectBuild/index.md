---
title: SpringBoot项目Maven模板
date: 2022-11-23 16:59:22
---

> 主要就是为了避免我们日常生产过程中的出现一些不必要的重复性工作，下面是我经常用的 springboot 项目 Parent 模块的 POM 文件模板，后期可以在这个基础上进行修改

注意：

1. 这是以`SpringBoot` `2.3.12`为主的的模板
2. 其中包含了 `SpringCloud` 中常用的依赖，主要为**Alibaba**系列
   `SpringCloud-version`：`Hoxton.SR12`
   `Spring-Cloud-alibaba-version`：`2.2.8.RELEASE`
3. 在使用的时候 我们避过初始化的新项目的坐标和版本，然后用下面的文件直接覆盖掉除上述内容的内容即可。

# Maven 父文件

```xml
    <!-- 开箱即用的Parent的POM文件 下面的内容无脑直接覆盖就行 -->
	<!-- parent -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.12.RELEASE</version>
        <relativePath/>
    </parent>
    <packaging>pom</packaging>

	<!-- modules -->
    <modules>

    </modules>

    <properties>
        <java.version>1.8</java.version>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <project.reporting.outputEncoding>UTF-8</project.reporting.outputEncoding>
        <spring-boot.version>2.3.12.RELEASE</spring-boot.version>
        <spring-data-redis.version>2.6.2</spring-data-redis.version>
        <spring-cloud-version>Hoxton.SR12</spring-cloud-version>
        <spring-cloud-alibaba-version>2.2.8.RELEASE</spring-cloud-alibaba-version>
        <mybatis-plus-boot-starter.version>3.4.1</mybatis-plus-boot-starter.version>
        <mybatis-plus-generator.version>3.4.1</mybatis-plus-generator.version>
        <velocity-engine-core.version>2.2</velocity-engine-core.version>
        <druid-spring-boot-starter.version>1.2.8</druid-spring-boot-starter.version>
        <spring-cloud-starter-alibaba-nacos-discovery.version>2.2.8.RELEASE</spring-cloud-starter-alibaba-nacos-discovery.version>
        <sentinel-core.version>1.8.4</sentinel-core.version>
        <redisson.version>3.16.8</redisson.version>
        <!-- jjwt -->
        <jjwt.version>0.9.1</jjwt.version>
        <!-- JWT依赖 jose4j -->
        <jose4j.version>0.9.2</jose4j.version>
        <springfox-swagger2.version>2.9.2</springfox-swagger2.version>
        <springfox-swagger-ui.version>2.9.2</springfox-swagger-ui.version>
        <amqp-client.version>5.9.0</amqp-client.version>
        <!-- common-lang3 -->
        <commons-lang3.version>3.12.0</commons-lang3.version>
        <guava.version>31.1-jre</guava.version>
        <hutool-all.version>5.8.5</hutool-all.version>
        <fastjson2.version>2.0.12</fastjson2.version>
         <!-- 日期处理工具 -->
        <joda-time.version>2.10.6</joda-time.version>
          <!--Maven打war包插件-->
        <maven-war-plugin.version>3.3.2</maven-war-plugin.version>
    </properties>


    <dependencyManagement>
        <dependencies>
            <!-- JWT依赖 jjwt -->
            <dependency>
                <groupId>io.jsonwebtoken</groupId>
                <artifactId>jjwt</artifactId>
                <version>${jjwt.version}</version>
            </dependency>
            <!-- JWT依赖 jose4j -->
            <dependency>
                <groupId>org.bitbucket.b_c</groupId>
                <artifactId>jose4j</artifactId>
                <version>${jose4j.version}</version>
            </dependency>
            <!--commons-lang3-->
            <dependency>
                <groupId>org.apache.commons</groupId>
                <artifactId>commons-lang3</artifactId>
                <version>${commons-lang3.version}</version>
            </dependency>
            <!--guava-->
            <dependency>
                <groupId>com.google.guava</groupId>
                <artifactId>guava</artifactId>
                <version>${guava.version}</version>
            </dependency>
            <!--hutool-->
            <dependency>
                <groupId>cn.hutool</groupId>
                <artifactId>hutool-all</artifactId>
                <version>${hutool-all.version}</version>
            </dependency>
            <!--redisson-->
            <dependency>
                <groupId>org.redisson</groupId>
                <artifactId>redisson</artifactId>
                <version>${redisson.version}</version>
            </dependency>
            <!--amqp-->
            <dependency>
                <groupId>com.rabbitmq</groupId>
                <artifactId>amqp-client</artifactId>
                <version>${amqp-client.version}</version>
            </dependency>
            <!--alibaba-nacos-discovery-->
            <dependency>
                <groupId>com.alibaba.cloud</groupId>
                <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
                <version>${spring-cloud-starter-alibaba-nacos-discovery.version}</version>
            </dependency>
            <!--sentinel-->
            <dependency>
                <groupId>com.alibaba.csp</groupId>
                <artifactId>sentinel-core</artifactId>
                <version>${sentinel-core.version}</version>
            </dependency>
            <!--swagger2-->
            <dependency>
                <groupId>io.springfox</groupId>
                <artifactId>springfox-swagger2</artifactId>
                <version>${springfox-swagger2.version}</version>
            </dependency>
            <!--swagger-ui-->
            <dependency>
                <groupId>io.springfox</groupId>
                <artifactId>springfox-swagger-ui</artifactId>
                <version>${springfox-swagger-ui.version}</version>
            </dependency>
            <!--fastJson2-->
            <dependency>
                <groupId>com.alibaba.fastjson2</groupId>
                <artifactId>fastjson2</artifactId>
                <version>${fastjson2.version}</version>
            </dependency>
            <!--druid-spring-->
            <dependency>
                <groupId>com.alibaba</groupId>
                <artifactId>druid-spring-boot-starter</artifactId>
                <version>${druid-spring-boot-starter.version}</version>
            </dependency>
            <!--mybatis-plus-->
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-boot-starter</artifactId>
                <version>${mybatis-plus-boot-starter.version}</version>
            </dependency>
            <!--velocity-->
            <dependency>
                <groupId>org.apache.velocity</groupId>
                <artifactId>velocity-engine-core</artifactId>
                <version>${velocity-engine-core.version}</version>
            </dependency>
            <!--generator-->
            <dependency>
                <groupId>com.baomidou</groupId>
                <artifactId>mybatis-plus-generator</artifactId>
                <version>${mybatis-plus-generator.version}</version>
            </dependency>
            <!-- 日期处理工具 -->
            <dependency>
                <groupId>joda-time</groupId>
                <artifactId>joda-time</artifactId>
                <version>${joda-time.version}</version>
            </dependency>
            <!--spring-test-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-test</artifactId>
                <exclusions>
                    <exclusion>
                        <groupId>org.junit.vintage</groupId>
                        <artifactId>junit-vintage-engine</artifactId>
                    </exclusion>
                </exclusions>
                <version>${spring-boot.version}</version>
            </dependency>
            <!--spring-redis 不支持redis6 ,所以我们排除原来的自己手动引入新版本的-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-starter-data-redis</artifactId>
                <version>${spring-boot.version}</version>
                <exclusions>
                    <exclusion>
                        <artifactId>spring-data-redis</artifactId>
                        <groupId>org.springframework.data</groupId>
                    </exclusion>
                    <exclusion>
                        <artifactId>lettuce-core</artifactId>
                        <groupId>io.lettuce</groupId>
                    </exclusion>
                </exclusions>
            </dependency>
            <!--spring-data-redis-->
            <dependency>
                <groupId>org.springframework.data</groupId>
                <artifactId>spring-data-redis</artifactId>
                <version>${spring-data-redis.version}</version>
            </dependency>
            <!--spring-dependencies-->
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!--spring-cloud-dependencies-->
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud-version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
```

# 常用配置

```yaml
server:
  port: 8080

spring:
  application:
    name: xxxxxxxx
  datasource:
    druid:
      driver-class-name: com.mysql.jdbc.Driver
      # 加了编码方式，时区，批处理
      url: jdbc:mysql://localhost:3306/sgg?useUnicode=true&characterEncoding=UTF-8&serverTimezone=Asia/Shanghai&allowMultiQueries=true&rewriteBatchedStatements=true
      username: root
      password: root
  redis:
    # 集群
    cluster:
      # 最大重定向次数
      max-redirects: 5
      # 结点
      nodes:
        - ip:port
        - xxxx:xxxx
    # 单机
    host:
    port: 6379
    # 数据库地址0~15
    database: 6
    lettuce:
      pool:
        max-active: 10
        max-idle: 10
        min-idle: 1
        time-between-eviction-runs: 10s
  jackson:
    default-property-inclusion: non_null # JSON处理时忽略非空字段
# mybatis
mybatis-plus:
  type-aliases-package: com.heima.item.pojo
  configuration:
    map-underscore-to-camel-case: true
  global-config:
    db-config:
      update-strategy: not_null
      id-type: auto
# 日志级别
logging:
  level:
    com.heima: debug
  pattern:
    dateformat: HH:mm:ss:SSS
```

# 常用配置类

## Swagger

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

/**
 * @Auther: zhangzjj
 * @Date: 2022-11-12 0012 - 11 - 12 - 17:12
 * @Description: com.sgg.config
 * @version: 1.0
 */
@Configuration
@EnableSwagger2
public class SwaggerConfig {
    /**
     * 配置一个 Docker 的 Bean 实例
     * @return
     */
    @Bean
    public Docket productApi(Environment environment) {
        // 设置启动环境
        // 我们多个配置文件，开发的和测试的，我们要求在发布版本不能显示
        Profiles profile = Profiles.of("dev", "test");
        boolean profiles = environment.acceptsProfiles(profile);
        System.out.println(profiles);

        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo()) // 一般都要从写，自己重新定义一个
                // 允许启动，false 则不能在浏览器中浏览 UI
                .enable(profiles)
                // 配置一些扫描规则
                .select()
                //// 指定扫描的注解，没有该注解的不显示在我们的 UI 中
                ////withClassAnnotation 扫描类上的注解
                ////withMethodAnnotation 扫描方法上的注解
                // .apis(RequestHandlerSelectors.withClassAnnotation(RestController.class))
                //// 指定扫描的包，没有该注解的不显示在我们的 UI 中
                ////basePackage 指定要扫描的包
                ////any 扫描全部
                ////none 不扫描
                // .apis(RequestHandlerSelectors.basePackage("com.zjj"))
                //// 指定路径，正则
                // .paths(PathSelectors.ant("/test/**"))
                .build();
    }


    /**
     * 配置 Swagger 信息面板的 info
     * @return
     */
    private ApiInfo apiInfo() {
        // 作者信息
        Contact contact = new Contact("zjj", "https://www.baidu.com", "zxxx@qq.com");
        return new ApiInfo(
                "Swagger测试", // title
                "测试一下", // desc
                "1.0", // 版本
                "https://www.baidu.com",
                // 作者信息
                contact,
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSE-2.0",
                new ArrayList());
    /*  return new ApiInfoBuilder ().
                title ("goody9807 的 CSDN 博客").
                description ("swagger 的接入")
                .version ("1.0").build (); */
    }
}
```

## Mybatis-Plus

> 分页插件使用的必备配置，指定数据库类型

```java
import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MybatisConfig {
    /**
    * 分页插件使用的必备配置，指定数据库类型
    */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL));
        return interceptor;
    }
}
```

## 拦截器配置

> ​ 我们在开发过程中会遇到很多需要拦截请求的地方，这里就需要我们实现一个拦截器，然后将他加入到我们的配置中。
>
> ​ 首先我们需要定义一个拦截器。（实现 `HandlerInterceptor` 接口)[org.springframework.web.servlet.HandlerInterceptor]
>
> ​ 将拦截器加入到配置中即可。如下：

```java
import com.hmdp.interceptor.LoginInterceptor;
import com.hmdp.interceptor.RefreshTokenInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import javax.annotation.Resource;
import javax.annotation.Resources;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        // interceptor 是安装 order 升序的结果进行启动的，所以越小的越先启动，取值范围是从最小负整数到最大正整数
        registry.addInterceptor(new LoginInterceptor(stringRedisTemplate))
                .excludePathPatterns(
                        "/shop/**",
            			// *****
                        "/user/login"
                )
                .order(99)
        ;
        registry.addInterceptor(new RefreshTokenInterceptor(stringRedisTemplate))
                .addPathPatterns("/**")
                .order(0)
        ;
    }
}
```

### 示例：登录

> 我们加一点特殊性，要求每一个请求我们对应一个独立的用户
>
> 这里我们用 `ThreadLocal` 解决问题

工具类 `UserHolder`

```java
// 一般T——》User
public class UserHolder<T> {
    /**
    * ThreadLocal特性自己后续补充
    */
    private static final ThreadLocal<T> tl = new ThreadLocal<>();

    public static void saveUser(T user){
        tl.set(user);
    }

    public static T getUser(){
        return tl.get();
    }

    public static void removeUser(){
        tl.remove();
    }
}
```

\ \* 我们在登录的时候需要根据 token 去查询对象，拦截器就来了

```java
import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.util.StrUtil;
import com.hmdp.dto.UserDTO;
import com.hmdp.utils.RedisConstants;
import com.hmdp.utils.UserHolder;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.concurrent.TimeUnit;

// 主要就是做 token 的查找以及时间的刷新
public class RefreshTokenInterceptor implements HandlerInterceptor {
	/**
	* 这里使用 redisTemplate ，很明显是因为我们的缓存在Redis 中。
	* 但是没有写 @Autowrite ，是因为拦截器并不托管于SpringBean对象容器中，我们也不这样操作，
	* 我们在使用它的地方，也就只有配置的时候会创建他，所以在配置类中获取到 redisTemplate 传给他就行了 ，也不用Spring去托管
	*/
    private StringRedisTemplate stringRedisTemplate;

    public RefreshTokenInterceptor(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    /**
    * 事前方法
    * 1. 判断是否存在 token
    * 2. 判断 token 是否过期（token对应的对象是否还在缓存中）
    * 3. 将缓存对象的时间进行刷新，利用 USerHolder 创建 “单独的用户”。
    */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // 1 获取请求头中的token
        String token = request.getHeader("token");
        if (StrUtil.isBlank(token)) { // 没找到token直接放行
            return true;
        }
        // 2 获取用户
        String key = RedisConstants.LOGIN_USER_KEY + token;
        Map<Object, Object> entries = stringRedisTemplate.opsForHash()
                .entries(key);

        // 3 不存在,后面的操作就不做了，放行剩余的拦截器进行处理，或者直接拒绝请求，返回 false
        if (entries.isEmpty()) { // 没找到用户，直接放行
            return true; // false 也行，根据业务自己判断，true 要做用户信息补偿，至于地点，自定
        }
        // 4 存在，保存用户信息到ThreadLocal中
        UserDTO userDTO = BeanUtil.fillBeanWithMap(entries, new UserDTO(), false);
        UserHolder.saveUser(userDTO);

        // 5 刷新token有效期
        // TODO 关闭了token刷新，我们直接修改token为永久，便于我们开发，后期解开就行
        stringRedisTemplate.expire(key, RedisConstants.LOGIN_USER_TTL, TimeUnit.HOURS);

        // 6 放行
        return true;
    }

    /**
    * 事后方法
    * 到这里我们就要释放User用户了，因为从一开始这里就是我们的大门，谁进来了，我们给他发信息卡，出去了要回收，就是这个理
    */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // 释放资源
        UserHolder.removeUser();
    }
}
```

## 全局异常

```java
import com.hmdp.dto.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class WebExceptionAdvice {

    @ExceptionHandler(RuntimeException.class)
    public Result handleRuntimeException(RuntimeException e) {
        log.error(e.toString(), e);
        return Result.fail("服务器异常");
    }
}
```

# 常用工具类

## 返回值

### 返回值枚举类

```java
import lombok.Getter;

/**
 * 统一返回结果状态信息类
 */
@Getter
public enum ResultCodeEnum {

    SUCCESS(200,"成功"),
    FAIL(201, "失败"),
    PARAM_ERROR( 202, "参数不正确"),
    SERVICE_ERROR(203, "服务异常"),
    DATA_ERROR(204, "数据异常"),
    DATA_UPDATE_ERROR(205, "数据版本异常"),

    LOGIN_AUTH(208, "未登陆"),
    PERMISSION(209, "没有权限"),

    CODE_ERROR(210, "验证码错误"),
//    LOGIN_MOBLE_ERROR(211, "账号不正确"),
    LOGIN_DISABLED_ERROR(212, "改用户已被禁用"),
    REGISTER_MOBLE_ERROR(213, "手机号已被使用"),
    LOGIN_AURH(214, "需要登录"),
    LOGIN_ACL(215, "没有权限"),

    URL_ENCODE_ERROR( 216, "URL编码失败"),
    ILLEGAL_CALLBACK_REQUEST_ERROR( 217, "非法回调请求"),
    FETCH_ACCESSTOKEN_FAILD( 218, "获取accessToken失败"),
    FETCH_USERINFO_ERROR( 219, "获取用户信息失败"),
    //LOGIN_ERROR( 23005, "登录失败"),

    PAY_RUN(220, "支付中"),
    CANCEL_ORDER_FAIL(225, "取消订单失败"),
    CANCEL_ORDER_NO(225, "不能取消预约"),

    HOSCODE_EXIST(230, "医院编号已经存在"),
    NUMBER_NO(240, "可预约号不足"),
    TIME_NO(250, "当前时间不可以预约"),

    SIGN_ERROR(300, "签名错误"),
    HOSPITAL_OPEN(310, "医院未开通，暂时不能访问"),
    HOSPITAL_LOCK(320, "医院被锁定，暂时不能访问"),
    ;

    private Integer code;
    private String message;

    private ResultCodeEnum(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
```

### 返回值封装类

```java
import lombok.Data;

/**
 * 全局统一返回结果类
 */
@Data
// @ApiModel(value = "全局统一返回结果")
public class Result<T> {

    // @ApiModelProperty(value = "返回码")
    private Integer code;

    // @ApiModelProperty(value = "返回消息")
    private String message;

    // @ApiModelProperty(value = "返回数据")
    private T data;

    public Result(){}

    protected static <T> Result<T> build(T data) {
        Result<T> result = new Result<T>();
        if (data != null)
            result.setData(data);
        return result;
    }

    public static <T> Result<T> build(T body, ResultCodeEnum resultCodeEnum) {
        Result<T> result = build(body);
        result.setCode(resultCodeEnum.getCode());
        result.setMessage(resultCodeEnum.getMessage());
        return result;
    }

    public static <T> Result<T> build(Integer code, String message) {
        Result<T> result = build(null);
        result.setCode(code);
        result.setMessage(message);
        return result;
    }

    public static<T> Result<T> ok(){
        return Result.ok(null);
    }

    /**
     * 操作成功
     * @param data
     * @param <T>
     * @return
     */
    public static<T> Result<T> ok(T data){
        Result<T> result = build(data);
        return build(data, ResultCodeEnum.SUCCESS);
    }

    public static<T> Result<T> fail(){
        return Result.fail(null);
    }

    /**
     * 操作失败
     * @param data
     * @param <T>
     * @return
     */
    public static<T> Result<T> fail(T data){
        Result<T> result = build(data);
        return build(data, ResultCodeEnum.FAIL);
    }

    public Result<T> message(String msg){
        this.setMessage(msg);
        return this;
    }

    public Result<T> code(Integer code){
        this.setCode(code);
        return this;
    }

    public boolean isOk() {
        if(this.getCode().intValue() == ResultCodeEnum.SUCCESS.getCode().intValue()) {
            return true;
        }
        return false;
    }
}
```

## 正则

### 正则枚举类

```java
public class RegentEnum {

    /**
     * 身份证的正则表达式
     */
    public static final String ID_CARD = "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$";
    /**
     * 固定电话
     * 地区：中国
     */
    public static final String FIXED_TELEPHONE = "^\\d{3}(-)?\\d{8}|\\d{4}(-)?\\d{7}$";
    /**
     * 移动电话，手机
     * 地区：中国
     */
    public static final String MOBILE_PHONE =  "^1[3-9]\\d{9}$";
    /**
     * 邮箱
     */
    @Deprecated
    public static final String EMAIL = "^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\\\.)+[a-z]{2,}$";
    /**
     * QQ 邮箱
     */
    public static final String EMAIL_QQ = "^[1-9]\\d{4,10}@qq\\.com$";
    /**
     * GMail
     */
    public static final String EMAIL_GMAIL = "^[a-zA-Z0-9._%+-]+@gmail\\.com$";
    /**
     * 163邮箱
     */
    public static final String EMAIL_163 = "^[a-zA-Z0-9._%-]+@163\\.com$";
    /**
     * 126邮箱
     */
    public static final String EMAIL_126 = "^[a-zA-Z0-9._%-]+@126\\.com$";

}
```

### 正则工具类

```java
import lombok.extern.slf4j.Slf4j;

import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * 正则表达式
 */
@Slf4j
public class RegentUtil {
    /**
     * 所有的正则表达式的正则预编译储存
     */
    private static Map<String, Pattern> patternMap = new HashMap<>();
    private static volatile RegentUtil getInstance = null;

    /**
     * 初始化
     */
    private RegentUtil() {
        Class<?> cls = RegentEnum.class;

        Field[] fields = cls.getDeclaredFields();  // 获取类中所有声明的字段，包括静态和非静态字段
        for (Field field : fields) {
            if (Modifier.isStatic(field.getModifiers()) && String.class.isAssignableFrom(field.getType())) {  // 判断该字段是否为静态字段，并且类型为 String
                Pattern compile = null;
                String value = null;
                try {
                    // field.get() 获取这个类型的对象的属性值，但是静态变量与实例变量属性无关，所以field.get(null) 就是表明获取静态变量
                    value = String.valueOf(field.get(null));
                    compile = Pattern.compile(value);
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                    log.error(field.getName() + "解析失败");
                    continue;
                }
                // patternMap.put(field.getName(), compile);
                patternMap.put(value, compile);
            }
        }
    }

    /**
     * 获取RegentUtils对象
     * @return RegentUtils
     */
    public static RegentUtil getInstance() {
        if (null == getInstance) {
            synchronized (RegentUtil.class) {
                if (null == getInstance) {
                    getInstance = new RegentUtil();
                }
            }
        }
        return getInstance;
    }

    /**
     * 计算结果
     * @param regex 定义的正则表达式
     * @param dest  要匹配的字符串
     * @return 匹配结果
     */
    private boolean result(String regex, String dest) {
        Pattern pattern = patternMap.get(regex);
        log.info("pattern: {}", pattern);
        return pattern.matcher(dest).matches();
    }

    /**
     * 检查是否为身份证
     * @param dest 验证源
     * @return 验证结果
     */
    public boolean checkIDCard(String dest) {
        return result(RegentEnum.ID_CARD, dest);
    }

    /**
     * 验证是否中国的手机号
     * @param dest
     * @return
     */
    public boolean checkPhoneNum(String dest) {
        return checkMobilePhone(dest) || checkFixedTelephone(dest);
    }

    /**
     * 验证是否中国的 固定号码
     * @param dest
     * @return
     */
    public boolean checkFixedTelephone(String dest) {
        return result(RegentEnum.FIXED_TELEPHONE, dest) ;
    }

    /**
     * 验证是否中国的 移动手机号
     * @param dest
     * @return
     */
    public boolean checkMobilePhone(String dest) {
        return result(RegentEnum.MOBILE_PHONE, dest);
    }

    /**
     * 验证邮箱格式，仅限 QQ 、谷歌 、163 、126邮箱
     *
     * @param dest 验证源
     * @return 验证结果
     */
    public boolean checkEmail(String dest) {
        boolean res = result(RegentEnum.EMAIL_QQ, dest) ||
                result(RegentEnum.EMAIL_GMAIL, dest) ||
                result(RegentEnum.EMAIL_163, dest) ||
                result(RegentEnum.EMAIL_126, dest);
        if (!res) log.error("我们只能支持4种邮箱");
        return res;
    }

}
```

## Redis 工具类 (待补充！)

## JWT 封装类

```java
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.util.*;

/**
 * JWT工具类
 */
public class JwtUtil {

    //有效期为
    private static final Long JWT_TTL = 60 * 60 *1000L;// 60 * 60 *1000  一个小时
    //设置秘钥明文
    private static final String JWT_KEY = "asd98a4";

    private static String getUUID(){
        String uuid = UUID.randomUUID().toString().replaceAll("-", "");
        return uuid;
    }

    /**
     * 生成jtw
     * @param subject token中要存放的数据（json格式）
     * @return
     */
    public static String createJWT(String subject) {
        JwtBuilder builder = getJwtBuilder(
                subject,
                null,
                getUUID());// 设置过期时间
        return builder.compact();
    }

    /**
     * 生成jtw
     * @param subject token中要存放的数据（json格式）
     * @param ttlMillis token超时时间
     * @return
     */
    public static String createJWT(String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(
                subject,
                ttlMillis,
                getUUID());// 设置过期时间
        return builder.compact();
    }

    /**
     * 创建token
     * @param id
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(String id, String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(
                subject,
                ttlMillis,
                id);// 设置过期时间
        return builder.compact();
    }

    /**
     * 创建token
     * @param params
     * @param subject
     * @param ttlMillis
     * @return
     */
    public static String createJWT(Map<String,Object> params , String subject, Long ttlMillis) {
        JwtBuilder builder = getJwtBuilder(
                subject,
                ttlMillis,
                getUUID(),
                params);// 设置过期时间
        return builder.compact();
    }

    /**
     * Jwt生成策略
     * @param subject
     * @param ttlMillis
     * @param uuid
     * @return
     */
    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid) {
        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(Objects.isNull(ttlMillis)){
            ttlMillis=JwtUtil.JWT_TTL;
        }
        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);
        return Jwts.builder()
                .setId(uuid)              //唯一的ID
                .setSubject(subject)   // 主题  可以是JSON数据
                .setIssuer("sg")     // 签发者
                .setIssuedAt(now)      // 签发时间
                .setExpiration(expDate) //过期时间
                .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签名, 第二个参数为秘钥
        ;
    }

    /**
     * Jwt生成策略
     * @param subject
     * @param ttlMillis
     * @param uuid
     * @param params
     * @return
     */
    private static JwtBuilder getJwtBuilder(String subject, Long ttlMillis, String uuid ,Map<String,Object> params) {
        if (Objects.isNull(params)) getJwtBuilder(subject, ttlMillis, uuid);

        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256;
        SecretKey secretKey = generalKey();
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        if(Objects.isNull(ttlMillis)){
            ttlMillis=JwtUtil.JWT_TTL;
        }

        long expMillis = nowMillis + ttlMillis;
        Date expDate = new Date(expMillis);

        return Jwts.builder()
                .setId(uuid)              //唯一的ID
                .setSubject(subject)     // 主题  可以是JSON数据
                .setIssuer("sg")        // 签发者
                .setIssuedAt(now)      // 签发时间
                .setClaims(params)    //
                .setExpiration(expDate) //过期时间
                .signWith(signatureAlgorithm, secretKey) //使用HS256对称加密算法签名, 第二个参数为秘钥
        ;
    }

    /**
     * 生成加密后的秘钥 secretKey
     * @return
     */
    public static SecretKey generalKey() {
        byte[] encodedKey = Base64.getDecoder().decode(JwtUtil.JWT_KEY);
        SecretKey key = new SecretKeySpec(
                encodedKey,
                0,
                encodedKey.length,
                "AES");
        return key;
    }

    /**
     * 解析
     *
     * @param jwt
     * @return
     * @throws Exception
     */
    public static Claims parseJWT(String jwt) throws Exception {
        SecretKey secretKey = generalKey();
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(jwt)
                .getBody();
    }
    public static void main(String[] args) throws Exception {
        String token = "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJjYWM2ZDVhZi1mNjVlLTQ0MDAtYjcxMi0zYWEwOGIyOTIwYjQiLCJzdWIiOiJzZyIsImlzcyI6InNnIiwiaWF0IjoxNjM4MTA2NzEyLCJleHAiOjE2MzgxMTAzMTJ9.JVsSbkP94wuczb4QryQbAke3ysBDIL5ou8fWsbt_ebg";

        Map<String, Object> map = new HashMap<>();
        map.put("username", "zjj");
        map.put("sex", "1");
        token = JwtUtil.createJWT(map, "", 2000000L);

        Claims claims = parseJWT(token);
        System.out.println(claims);
    }
}
```

## MD5

```java
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public final class MD5 {

    public static String encrypt(String strSrc) {
        try {
            char hexChars[] = { '0', '1', '2', '3', '4', '5', '6', '7', '8',
                    '9', 'a', 'b', 'c', 'd', 'e', 'f' };
            byte[] bytes = strSrc.getBytes();
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(bytes);
            bytes = md.digest();
            int j = bytes.length;
            char[] chars = new char[j * 2];
            int k = 0;
            for (int i = 0; i < bytes.length; i++) {
                byte b = bytes[i];
                chars[k++] = hexChars[b >>> 4 & 0xf];
                chars[k++] = hexChars[b & 0xf];
            }
            return new String(chars);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new RuntimeException("MD5加密出错！！+" + e);
        }
    }
}
```

## BigDecimal 封装类

```java
package util;

import org.springframework.util.StringUtils;

import java.math.BigDecimal;

public class BigDecimalUtil {

    //默认运算精度
    private static final int DEFAULT_DIV_SCALE = 10;

    /**
     * 提供精确的加法运算。
     *
     * @param v1
     * @param v2
     * @return 两个参数的和
     */
    public static double add(double v1, double v2) {
        BigDecimal b1 = new BigDecimal(Double.toString(v1));
        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.add(b2).doubleValue();

    }

    /**
     * 提供精确的加法运算
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数数学加和，以字符串格式返回
     */
    public static double add(double v1, double v2, int scale) {
        return round(add(v1, v2), 2);
    }

    /**
     * 提供精确的加法运算
     *
     * @param v1
     * @param v2
     * @return 两个参数数学加和，以字符串格式返回
     */

    public static String add(String v1, String v2) {
        if (StringUtils.isEmpty(v1)) v1 = "0";
        if (StringUtils.isEmpty(v2)) v2 = "0";

        BigDecimal b1 = new BigDecimal(v1);

        BigDecimal b2 = new BigDecimal(v2);

        return b1.add(b2).toString();

    }

    /**
     * 提供精确的加法运算
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数数学加和，以字符串格式返回
     */

    public static String add(String v1, String v2, int scale) {
        if (StringUtils.isEmpty(v1)) v1 = "0";
        if (StringUtils.isEmpty(v2)) v2 = "0";
        return round(add(v1, v2), 2);

    }

    /**
     * 提供精确的减法运算。
     *
     * @param v1
     * @param v2
     * @return 两个参数的差
     */

    public static double subtract(double v1, double v2)

    {

        BigDecimal b1 = new BigDecimal(Double.toString(v1));

        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.subtract(b2).doubleValue();

    }

    /**
     * 提供精确的减法运算。
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数的差
     */

    public static double subtract(double v1, double v2, int scale)

    {
        return round(subtract(v1, v2), scale);

    }

    /**
     * 提供精确的减法运算
     *
     * @param v1
     * @param v2
     * @return 两个参数数学差，以字符串格式返回
     */

    public static String subtract(String v1, String v2) {
        if (StringUtils.isEmpty(v1)) v1 = "0";
        if (StringUtils.isEmpty(v2)) v2 = "0";

        BigDecimal b1 = new BigDecimal(v1);

        BigDecimal b2 = new BigDecimal(v2);

        return b1.subtract(b2).toString();

    }

    /**
     * 提供精确的减法运算
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数数学差，以字符串格式返回
     */

    public static String subtract(String v1, String v2, int scale)

    {
        return round(subtract(v1, v2), 2);

    }

    /**
     * 提供精确的乘法运算。
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数的积
     */

    public static double multiply(double v1, double v2, int scale)

    {
        return round(multiply(v1, v2), scale);

    }

    /**
     * 提供精确的乘法运算。
     *
     * @param v1
     * @param v2
     * @return 两个参数的积
     */

    public static double multiply(double v1, double v2) {

        BigDecimal b1 = new BigDecimal(Double.toString(v1));

        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.multiply(b2).doubleValue();

    }

    /**
     * 提供精确的乘法运算
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数的数学积，以字符串格式返回
     */

    public static String multiply(String v1, String v2, int scale)

    {
        return round(multiply(v1, v2), scale);

    }

    /**
     * 提供精确的乘法运算
     *
     * @param v1
     * @param v2
     * @return 两个参数的数学积，以字符串格式返回
     */

    public static String multiply(String v1, String v2) {
        if (StringUtils.isEmpty(v1)) v1 = "0";
        if (StringUtils.isEmpty(v2)) v2 = "0";

        BigDecimal b1 = new BigDecimal(v1);

        BigDecimal b2 = new BigDecimal(v2);

        return b1.multiply(b2).toString();

    }

    /**
     * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到
     * <p>
     * 小数点以后10位，以后的数字四舍五入,舍入模式采用ROUND_HALF_EVEN
     *
     * @param v1
     * @param v2
     * @return 两个参数的商
     */

    public static double divide(double v1, double v2)

    {

        return divide(v1, v2, DEFAULT_DIV_SCALE);

    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指
     * <p>
     * 定精度，以后的数字四舍五入。舍入模式采用ROUND_HALF_EVEN
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位。
     * @return 两个参数的商
     */

    public static double divide(double v1, double v2, int scale)

    {

        return divide(v1, v2, scale, BigDecimal.ROUND_HALF_EVEN);

    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指
     * <p>
     * 定精度，以后的数字四舍五入。舍入模式采用用户指定舍入模式
     *
     * @param v1
     * @param v2
     * @param scale      表示需要精确到小数点以后几位
     * @param round_mode 表示用户指定的舍入模式
     * @return 两个参数的商
     */

    public static double divide(double v1, double v2, int scale, int round_mode) {

        if (scale < 0)

        {

            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");

        }

        BigDecimal b1 = new BigDecimal(Double.toString(v1));

        BigDecimal b2 = new BigDecimal(Double.toString(v2));

        return b1.divide(b2, scale, round_mode).doubleValue();

    }

    /**
     * 提供（相对）精确的除法运算，当发生除不尽的情况时，精确到
     * <p>
     * 小数点以后10位，以后的数字四舍五入,舍入模式采用ROUND_HALF_EVEN
     *
     * @param v1
     * @param v2
     * @return 两个参数的商，以字符串格式返回
     */

    public static String divide(String v1, String v2) {
        if (StringUtils.isEmpty(v1)) v1 = "0";
        if (StringUtils.isEmpty(v2) || Double.parseDouble(v2) == 0) v2 = "1";

        return divide(v1, v2, DEFAULT_DIV_SCALE);

    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指
     * <p>
     * 定精度，以后的数字四舍五入。舍入模式采用ROUND_HALF_EVEN
     *
     * @param v1
     * @param v2
     * @param scale 表示需要精确到小数点以后几位
     * @return 两个参数的商，以字符串格式返回
     */

    public static String divide(String v1, String v2, int scale)

    {
        if (StringUtils.isEmpty(v2) || Double.parseDouble(v2) == 0) v2 = "1";
        return divide(v1, v2, scale, BigDecimal.ROUND_HALF_EVEN);

    }

    /**
     * 提供（相对）精确的除法运算。当发生除不尽的情况时，由scale参数指
     * <p>
     * 定精度，以后的数字四舍五入。舍入模式采用用户指定舍入模式
     *
     * @param v1
     * @param v2
     * @param scale      表示需要精确到小数点以后几位
     * @param round_mode 表示用户指定的舍入模式
     * @return 两个参数的商，以字符串格式返回
     */

    public static String divide(String v1, String v2, int scale, int round_mode)

    {

        if (scale < 0)

        {

            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");

        }

        BigDecimal b1 = new BigDecimal(v1);

        BigDecimal b2 = new BigDecimal(v2);

        return b1.divide(b2, scale, round_mode).toString();

    }

    /**
     * 提供精确的小数位四舍五入处理,舍入模式采用ROUND_HALF_EVEN
     *
     * @param v     需要四舍五入的数字
     * @param scale 小数点后保留几位
     * @return 四舍五入后的结果
     */

    public static double round(double v, int scale)

    {

        return round(v, scale, BigDecimal.ROUND_HALF_EVEN);

    }

    /**
     * 提供精确的小数位四舍五入处理
     *
     * @param v          需要四舍五入的数字
     * @param scale      小数点后保留几位
     * @param round_mode 指定的舍入模式
     * @return 四舍五入后的结果
     */

    public static double round(double v, int scale, int round_mode)

    {

        if (scale < 0)

        {

            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");

        }

        BigDecimal b = new BigDecimal(Double.toString(v));

        return b.setScale(scale, round_mode).doubleValue();

    }

    /**
     * 提供精确的小数位四舍五入处理,舍入模式采用ROUND_HALF_EVEN
     *
     * @param v     需要四舍五入的数字
     * @param scale 小数点后保留几位
     * @return 四舍五入后的结果，以字符串格式返回
     */

    public static String round(String v, int scale)

    {

        return round(v, scale, BigDecimal.ROUND_HALF_EVEN);

    }

    /**
     * 提供精确的小数位四舍五入处理
     *
     * @param v          需要四舍五入的数字
     * @param scale      小数点后保留几位
     * @param round_mode 指定的舍入模式
     * @return 四舍五入后的结果，以字符串格式返回
     */

    public static String round(String v, int scale, int round_mode)

    {

        if (scale < 0)

        {

            throw new IllegalArgumentException(
                    "The scale must be a positive integer or zero");

        }

        BigDecimal b = new BigDecimal(v);

        return b.setScale(scale, round_mode).toString();

    }
}
```

## HTTP 请求类

```java
package util;

import lombok.extern.slf4j.Slf4j;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 *
 */
@Slf4j
public final class HttpUtil {

	static final String POST = "POST";
	static final String GET = "GET";
	static final int CONN_TIMEOUT = 30000;// ms
	static final int READ_TIMEOUT = 30000;// ms

	/**
	 * post 方式发送http请求.
	 *
	 * @param strUrl
	 * @param reqData
	 * @return
	 */
	public static byte[] doPost(String strUrl, byte[] reqData) {
		return send(strUrl, POST, reqData);
	}

	/**
	 * get方式发送http请求.
	 *
	 * @param strUrl
	 * @return
	 */
	public static byte[] doGet(String strUrl) {
		return send(strUrl, GET, null);
	}

	/**
	 * @param strUrl
	 * @param reqmethod
	 * @param reqData
	 * @return
	 */
	public static byte[] send(String strUrl, String reqmethod, byte[] reqData) {
		try {
			URL url = new URL(strUrl);
			HttpURLConnection httpcon = (HttpURLConnection) url.openConnection();
			httpcon.setDoOutput(true);
			httpcon.setDoInput(true);
			httpcon.setUseCaches(false);
			httpcon.setInstanceFollowRedirects(true);
			httpcon.setConnectTimeout(CONN_TIMEOUT);
			httpcon.setReadTimeout(READ_TIMEOUT);
			httpcon.setRequestMethod(reqmethod);
			httpcon.connect();
			if (reqmethod.equalsIgnoreCase(POST)) {
				OutputStream os = httpcon.getOutputStream();
				os.write(reqData);
				os.flush();
				os.close();
			}
			BufferedReader in = new BufferedReader(new InputStreamReader(httpcon.getInputStream(),"utf-8"));
			String inputLine;
			StringBuilder bankXmlBuffer = new StringBuilder();
			while ((inputLine = in.readLine()) != null) {
			    bankXmlBuffer.append(inputLine);
			}
			in.close();
			httpcon.disconnect();
			return bankXmlBuffer.toString().getBytes();
		} catch (Exception ex) {
			log.error(ex.toString(), ex);
			return null;
		}
	}

	/**
	 * 从输入流中读取数据
	 *
	 * @param inStream
	 * @return
	 * @throws Exception
	 */
	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int len = 0;
		while ((len = inStream.read(buffer)) != -1) {
			outStream.write(buffer, 0, len);
		}
		byte[] data = outStream.toByteArray();// 网页的二进制数据
		outStream.close();
		inStream.close();
		return data;
	}
}

```

## HttpRequest 处理类

```java
package util;

import com.alibaba.fastjson2.JSONObject;
import lombok.extern.slf4j.Slf4j;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

@Slf4j
public class HttpRequestHelper {

    public static void main(String[] args) {
        Map<String, Object> paramMap = new HashMap<>();
        paramMap.put("d", "4");
        paramMap.put("b", "2");
        paramMap.put("c", "3");
        paramMap.put("a", "1");
        paramMap.put("timestamp", getTimestamp());
        log.info(getSign(paramMap, "111111111"));
    }

    /**
     *
     * @param paramMap
     * @return
     */
    public static Map<String, Object> switchMap(Map<String, String[]> paramMap) {
        Map<String, Object> resultMap = new HashMap<>();
        for (Map.Entry<String, String[]> param : paramMap.entrySet()) {
            resultMap.put(param.getKey(), param.getValue()[0]);
        }
        return resultMap;
    }

    /**
     * 请求数据获取签名
     * @param paramMap
     * @param signKey
     * @return
     */
    public static String getSign(Map<String, Object> paramMap, String signKey) {
        if(paramMap.containsKey("sign")) {
            paramMap.remove("sign");
        }
        TreeMap<String, Object> sorted = new TreeMap<>(paramMap);
        StringBuilder str = new StringBuilder();
        for (Map.Entry<String, Object> param : sorted.entrySet()) {
            str.append(param.getValue()).append("|");
        }
        str.append(signKey);
        log.info("加密前：" + str.toString());
        String md5Str = MD5.encrypt(str.toString());
        log.info("加密后：" + md5Str);
        return md5Str;
    }

    /**
     * 签名校验
     * @param paramMap
     * @param signKey
     * @return
     */
    public static boolean isSignEquals(Map<String, Object> paramMap, String signKey) {
        String sign = (String)paramMap.get("sign");
        String md5Str = getSign(paramMap, signKey);
        if(!sign.equals(md5Str)) {
            return false;
        }
        return true;
    }

    /**
     * 获取时间戳
     * @return
     */
    public static long getTimestamp() {
        return new Date().getTime();
    }

    /**
     * 封装同步请求
     * @param paramMap
     * @param url
     * @return
     */
    public static JSONObject sendRequest(Map<String, Object> paramMap, String url){
        String result = "";
        try {
            //封装post参数
            StringBuilder postdata = new StringBuilder();
            for (Map.Entry<String, Object> param : paramMap.entrySet()) {
                postdata.append(param.getKey()).append("=")
                        .append(param.getValue()).append("&");
            }
            log.info(String.format("--> 发送请求：post data %1s", postdata));
            byte[] reqData = postdata.toString().getBytes("utf-8");
            byte[] respdata = HttpUtil.doPost(url,reqData);
            result = new String(respdata);
            log.info(String.format("--> 应答结果：result data %1s", result));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return JSONObject.parseObject(result);
    }
}
```

## PageInfo 封装类

```java
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

public class PageInfo<T> implements Serializable {
    private static final long serialVersionUID = 1L;
    private int pageNum;
    private int pageSize;
    private int size;
    private int startRow;
    private int endRow;
    private long total;
    private int pages;
    private List<T> list;
    private int prePage;
    private int nextPage;
    private boolean isFirstPage;
    private boolean isLastPage;
    private boolean hasPreviousPage;
    private boolean hasNextPage;
    private int navigatePages;
    private int[] navigatepageNums;
    private int navigateFirstPage;
    private int navigateLastPage;

    public PageInfo() {
        this.isFirstPage = false;
        this.isLastPage = false;
        this.hasPreviousPage = false;
        this.hasNextPage = false;
    }

    public PageInfo(List<T> list) {
        this(list, 8);
    }

    public PageInfo(List<T> list, int navigatePages) {
        this.isFirstPage = false;
        this.isLastPage = false;
        this.hasPreviousPage = false;
        this.hasNextPage = false;
        if (list instanceof Collection) {
            this.pageNum = 1;
            this.pageSize = list.size();
            this.pages = 1;
            this.list = list;
            this.size = list.size();
            this.total = (long)list.size();
            this.startRow = 0;
            this.endRow = list.size() > 0 ? list.size() - 1 : 0;
        }

        if (list instanceof Collection) {
            this.navigatePages = navigatePages;
            this.calcNavigatepageNums();
            this.calcPage();
            this.judgePageBoudary();
        }

    }

    private void calcNavigatepageNums() {
        int i;
        if (this.pages <= this.navigatePages) {
            this.navigatepageNums = new int[this.pages];

            for(i = 0; i < this.pages; ++i) {
                this.navigatepageNums[i] = i + 1;
            }
        } else {
            this.navigatepageNums = new int[this.navigatePages];
            i = this.pageNum - this.navigatePages / 2;
            int endNum = this.pageNum + this.navigatePages / 2;
            //int i;
            if (i < 1) {
                i = 1;

                for(i = 0; i < this.navigatePages; ++i) {
                    this.navigatepageNums[i] = i++;
                }
            } else if (endNum > this.pages) {
                endNum = this.pages;

                for(i = this.navigatePages - 1; i >= 0; --i) {
                    this.navigatepageNums[i] = endNum--;
                }
            } else {
                for(i = 0; i < this.navigatePages; ++i) {
                    this.navigatepageNums[i] = i++;
                }
            }
        }

    }

    private void calcPage() {
        if (this.navigatepageNums != null && this.navigatepageNums.length > 0) {
            this.navigateFirstPage = this.navigatepageNums[0];
            this.navigateLastPage = this.navigatepageNums[this.navigatepageNums.length - 1];
            if (this.pageNum > 1) {
                this.prePage = this.pageNum - 1;
            }

            if (this.pageNum < this.pages) {
                this.nextPage = this.pageNum + 1;
            }
        }

    }

    private void judgePageBoudary() {
        this.isFirstPage = this.pageNum == 1;
        this.isLastPage = this.pageNum == this.pages;
        this.hasPreviousPage = this.pageNum > 1;
        this.hasNextPage = this.pageNum < this.pages;
    }

    public int getPageNum() {
        return this.pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }

    public int getPageSize() {
        return this.pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getSize() {
        return this.size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public int getStartRow() {
        return this.startRow;
    }

    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }

    public int getEndRow() {
        return this.endRow;
    }

    public void setEndRow(int endRow) {
        this.endRow = endRow;
    }

    public long getTotal() {
        return this.total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getPages() {
        return this.pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public List<T> getList() {
        return this.list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    /** @deprecated */
    @Deprecated
    public int getFirstPage() {
        return this.navigateFirstPage;
    }

    /** @deprecated */
    @Deprecated
    public void setFirstPage(int firstPage) {
        this.navigateFirstPage = firstPage;
    }

    public int getPrePage() {
        return this.prePage;
    }

    public void setPrePage(int prePage) {
        this.prePage = prePage;
    }

    public int getNextPage() {
        return this.nextPage;
    }

    public void setNextPage(int nextPage) {
        this.nextPage = nextPage;
    }

    /** @deprecated */
    @Deprecated
    public int getLastPage() {
        return this.navigateLastPage;
    }

    /** @deprecated */
    @Deprecated
    public void setLastPage(int lastPage) {
        this.navigateLastPage = lastPage;
    }

    public boolean isIsFirstPage() {
        return this.isFirstPage;
    }

    public void setIsFirstPage(boolean isFirstPage) {
        this.isFirstPage = isFirstPage;
    }

    public boolean isIsLastPage() {
        return this.isLastPage;
    }

    public void setIsLastPage(boolean isLastPage) {
        this.isLastPage = isLastPage;
    }

    public boolean isHasPreviousPage() {
        return this.hasPreviousPage;
    }

    public void setHasPreviousPage(boolean hasPreviousPage) {
        this.hasPreviousPage = hasPreviousPage;
    }

    public boolean isHasNextPage() {
        return this.hasNextPage;
    }

    public void setHasNextPage(boolean hasNextPage) {
        this.hasNextPage = hasNextPage;
    }

    public int getNavigatePages() {
        return this.navigatePages;
    }

    public void setNavigatePages(int navigatePages) {
        this.navigatePages = navigatePages;
    }

    public int[] getNavigatepageNums() {
        return this.navigatepageNums;
    }

    public void setNavigatepageNums(int[] navigatepageNums) {
        this.navigatepageNums = navigatepageNums;
    }

    public int getNavigateFirstPage() {
        return this.navigateFirstPage;
    }

    public int getNavigateLastPage() {
        return this.navigateLastPage;
    }

    public void setNavigateFirstPage(int navigateFirstPage) {
        this.navigateFirstPage = navigateFirstPage;
    }

    public void setNavigateLastPage(int navigateLastPage) {
        this.navigateLastPage = navigateLastPage;
    }

    public String toString() {
        StringBuffer sb = new StringBuffer("PageInfo{");
        sb.append("pageNum=").append(this.pageNum);
        sb.append(", pageSize=").append(this.pageSize);
        sb.append(", size=").append(this.size);
        sb.append(", startRow=").append(this.startRow);
        sb.append(", endRow=").append(this.endRow);
        sb.append(", total=").append(this.total);
        sb.append(", pages=").append(this.pages);
        sb.append(", list=").append(this.list);
        sb.append(", prePage=").append(this.prePage);
        sb.append(", nextPage=").append(this.nextPage);
        sb.append(", isFirstPage=").append(this.isFirstPage);
        sb.append(", isLastPage=").append(this.isLastPage);
        sb.append(", hasPreviousPage=").append(this.hasPreviousPage);
        sb.append(", hasNextPage=").append(this.hasNextPage);
        sb.append(", navigatePages=").append(this.navigatePages);
        sb.append(", navigateFirstPage").append(this.navigateFirstPage);
        sb.append(", navigateLastPage").append(this.navigateLastPage);
        sb.append(", navigatepageNums=");
        if (this.navigatepageNums == null) {
            sb.append("null");
        } else {
            sb.append('[');

            for(int i = 0; i < this.navigatepageNums.length; ++i) {
                sb.append(i == 0 ? "" : ", ").append(this.navigatepageNums[i]);
            }

            sb.append(']');
        }

        sb.append('}');
        return sb.toString();
    }
}
```

## BeanUtils

> 只做参考，这个都是自己写的

```java

import org.apache.commons.beanutils.BeanUtils;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

public class BeanUtil {

    /*
    只做参考，这个都是自己写的
    */


    private static BeanUtil BEAN_UTIL = null;

    private BeanUtil() {

    }

    /**
     * 获取实例
     * @return
     */
    public static BeanUtil build() {
        if (null == BEAN_UTIL) {
            synchronized (RegentUtils.class) {
                if (null == BEAN_UTIL) {
                    BEAN_UTIL = new BeanUtil();
                }
            }
        }
        return BEAN_UTIL;
    }

    /**
     * 将Map对象转换为Bean对象
     *
     * @param map Map对象
     * @param clazz Bean类型
     * @return Bean对象
     */
    public  <T> T convertParamsToBean(Map<String, Object> map, Class<T> clazz) throws Exception {
        if (map == null) {
            return null;
        }
        T bean = clazz.newInstance();
        BeanUtils.populate(bean, map);
        return bean;
    }

    /**
     * Bean 转 Map<String,String>
     * 值为 null 的不放
     *
     * @param obj
     * @param <T>
     * @return
     */
    public  <T> Map<String, String> convertObjectToMap(T obj) {
        return Arrays.stream(obj.getClass().getDeclaredFields())
                .peek(field -> field.setAccessible(true))
                .filter(field -> {
                    try {
                        return field.get(obj) != null;
                    } catch (IllegalAccessException e) {
                        throw new RuntimeException(e);
                    }
                })
                .collect(Collectors.toMap(
                        Field::getName,
                        field -> {
                            try {
                                Object value = field.get(obj);
                                return value != null ? value.toString() : null;
                            } catch (IllegalAccessException e) {
                                throw new RuntimeException(e);
                            }
                        }
                ));
    }


}

```

# 打包

> 微服务架构下的打包，其他的类似，更加简单

**注意**：

1. 每个`父工程`必须是`POM`格式（默认为`jar`），子模块切不可为`pom`，一旦在其他子模块中使用该模块，==在打包的那一刻我们永远都是找不到该模块下的实体类，在我们项目本地启动的时候并不会产生问题==，但是**打包并不会打`pom`模块的子模块**，所以一定要注意子模块和父模块的`packaging`标签

2. 注意父子`POM`文件的路径，善用`relationPath`标签

   - `<relationPath>../<relationPath>`默认值，最好写上，不写也行
   - `<relativePath/>`设定空值，意思是：**将始终从仓库中获取，不从本地路径获取**
   - `<relativePath>某个pom的路径<relativePath/>`指定本地的路径，从本地路径获取`parent`的`pom`。

3. 具体打包步骤

   1. 打包的时候我们要引入一个插件`spring-boot-maven-plugin`

      **注意**：==要打包哪个模块再放到该模块下即可==，不可直接让父类使用，自己继承父类的，**要求最小颗粒化**

   ```xml
   	<build>
           <plugins>
               <!-- 打 war/jar包 插件 -->
               <plugin>
                   <groupId>org.springframework.boot</groupId>
                   <artifactId>spring-boot-maven-plugin</artifactId>
                   <configuration>
                       <!-- 指定当前服务的主类是哪一个 -->
                       <mainClass>cn.zjj.graduation.V1SpringApplication</mainClass>
                       <fork>true</fork>
                   </configuration>
               </plugin>
           </plugins>
       </build>
   ```

   2. 修改`spring-boot-starter-web`依赖**（打成`jar`包，跳过）**

      去掉自带的 Tomcat，自己重新引入一个 Tomcat 依赖，将他设置为`private`这样我们在打包的时候，就不会带有 Tomcat，会直接依赖于外部的 Tomcat。其次我们在本地测试也还是可以继续进行。

      - 好处：

        - 可以不修改程序而改变服务的端口号，它的端口号由外部 Tomcat 指定
        - 可以轻松的实现单台机器多服务部署

      - 缺点

        操作过多，服务完全寄托于 Tomcat

      > 修改后的`spring-boot-starter-web`

      ```xml
       		<!--spring-web-->
              <dependency>
                  <groupId>org.springframework.boot</groupId>
                  <artifactId>spring-boot-starter-web</artifactId>
                  <!-- 打 war 包的时候再打开这个 -->
                  <exclusions>
                      <exclusion>
                          <groupId>org.springframework.boot</groupId>
                          <artifactId>spring-boot-starter-tomcat</artifactId>
                      </exclusion>
                  </exclusions>
              </dependency>
              <!-- 打 war 包的时候再打开这个 -->
              <dependency>
                  <groupId>org.springframework.boot</groupId>
                  <artifactId>spring-boot-starter-tomcat</artifactId>
                  <!-- 注意：一定是provider -->
                  <scope>provided</scope>
              </dependency>
      ```

   3. 修改容器启动配置**（打成`jar`包，跳过）**

      进入到要打包的主类，继承`SpringBootServletInitializer`重写`configure`

      ```java
      @SpringBootApplication
      public class MySpringApplication extends SpringBootServletInitializer {
          public static void main(String[] args) {
              SpringApplication.run(MySpringApplication.class, args);
          }
          //重写配置方法
          @Override
          protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
              # 主类的字节码信息
              return application.sources(MySpringApplication.class);
          }
      }
      ```

   4. 准备工作结束，进入真正打包阶段

   5. 打开`Maven`，在最大的父类中依次执行`clean`和`install`

      > 目的

      先清除缓存，其次我们可能存在本地子模块间的相互引用，所以我们首先要间所有服务下载到本地。避免后面产生依赖、程序包不存在、类找不到等问题。

   6. 找到对应的要发布的模块的`Maven`下，执行`package`即可

      ![image-20230314230022747](index/image-20230314230022747.png)

4. 查看打包结果

   以`war`包为例，`jar`包同样是如此。

   ![image-20230314230153613](index/image-20230314230153613.png)

5. 上线

   > 前提：上线的服务器有`JDK` ；`Tomcat`可以根据需求而定，但是`JDK`必须

   - `jar`包格式

     直接在合适的地方，执行启动命令

     ```shell
     # 带日志启动 ctrl+z 退出控制台 ctl+c退出程序
     java -jar xxxx.jar

     # 不产生控制台启动
     java -jar xxx.jar & #&代表在后台运行 ，ctrl+c 后程序也会继续运行

     #nohup 即 no hang up 不挂断 ，关闭SSH客户端连接，程序不会中止运行缺省情况下该作业的所有输出被重定向到nohup.out的文件中
     nohup java -jar xxx.jar &

     #具体参考 https://blog.csdn.net/weixin_46356409/article/details/128893837
     ```

     启动成功后测试：

     直接就和我们在`idea`中使用一致即可，例如：http://localhost:8080/test

   - `war`包格式

     将我们的`war`包直接放到`tomcat安装目录/webapps`下，重启服务器，自动解压一个与我们`war`包同名的文件夹，我们在访问服务的时候要先带一个我们的文件名再写我们的 url 路径，例如：

     我们的`war`包名为：`temp.war`，所以我们的解压文件名为：`temp`，我们终止测试的地址为：http://localhost:8080/temp/test

     至于要省去文件名`temp`的操作设置，这就涉及到了`Tomcat`的相关内容，我们后期补充~~~
