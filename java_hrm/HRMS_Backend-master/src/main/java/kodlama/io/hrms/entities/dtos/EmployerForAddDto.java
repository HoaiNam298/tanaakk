package kodlama.io.hrms.entities.dtos;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployerForAddDto {
	private String email;
	private String password;
    private String companyName;
    private String webSites;
    private String phone;
    private LocalDate createdDate;
}
