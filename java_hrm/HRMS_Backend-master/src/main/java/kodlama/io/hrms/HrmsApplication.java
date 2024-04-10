package kodlama.io.hrms;

import kodlama.io.hrms.entities.concretes.Vacation;
import kodlama.io.hrms.entities.enums.VacationType;
import kodlama.io.hrms.service.VacationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableSwagger2
@SpringBootApplication
public class HrmsApplication {

	public static void main(String[] args) {
		SpringApplication.run(HrmsApplication.class, args);
	}

	@Configuration
	public class SpringFoxConfig {
		@Bean
		public Docket api() {
			return new Docket(DocumentationType.SWAGGER_2)
					.select()
					.apis(RequestHandlerSelectors.any())
					.paths(PathSelectors.any())
					.build();
		}
	}
//	@Autowired
//	private VacationService service;
//	@Bean
//	CommandLineRunner init(){
//		return args -> {
//			Vacation v1= new Vacation(VacationType.ANNUAL);
//			Vacation v2= new Vacation(VacationType.HOLIDAY);
//			Vacation v3= new Vacation(VacationType.COMPENSATORY);
//			Vacation v4= new Vacation(VacationType.UNPAID);
//			service.save(v1);
//			service.save(v2);
//			service.save(v3);
//			service.save(v4);
//		};
//	}

}
