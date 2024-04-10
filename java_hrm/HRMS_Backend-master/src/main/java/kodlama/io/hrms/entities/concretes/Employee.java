package kodlama.io.hrms.entities.concretes;

import kodlama.io.hrms.entities.enums.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import java.time.LocalDate;
import java.util.Collection;

@Entity
@Table(name = "employee")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String phone;
    private LocalDate dateOfBirth;
    private String address;
    @Email
    private String email;
//    @DecimalMin(value = "0.0", inclusive = true, message = "salary >=0")
//    @Min(value = 0)
    private double salary;
    @Enumerated(EnumType.STRING)
    private EmployeeStatus status;
}
