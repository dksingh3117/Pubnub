package com.itmiracle;

import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class HelloController {

    @RequestMapping("/publish/**")
    @ResponseBody
    String hello(HttpServletRequest request) {
    	 String stringToBuild = request.getServletPath();
     	 String msg=stringToBuild.substring(stringToBuild.lastIndexOf('/')+1,stringToBuild.length());
       	 System.out.println(msg);
         return msg;
    }

    @RequestMapping("/rest/helloAsync")
    @ResponseBody
    @Async
    String helloAsync() {
        return "Hello World";
    }	
    
 
}
