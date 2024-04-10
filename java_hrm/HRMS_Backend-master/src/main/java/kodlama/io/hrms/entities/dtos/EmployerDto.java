package kodlama.io.hrms.entities.dtos;

import kodlama.io.hrms.entities.abstracts.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployerDto {
    private int id;
    private String companyName;
    private String phone;
    private String webSites;
    private User user;
    private LocalDate joinDate;
}
