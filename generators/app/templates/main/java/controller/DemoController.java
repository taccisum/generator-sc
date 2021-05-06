package ${base_package}.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author ${author} - ${email}
 * @since ${current}
 */
@RestController
@RequestMapping("demo")
public class DemoController {
    @GetMapping
    public String index() {
        return "hello";
    }
}
