package kodlama.io.hrms.entities.dtos;

import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.enums.EmployeeStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import java.time.LocalDate;

@Data
@NoArgsConstructor
public class EmployeeDto {
    private Long id;
    private String name;
    private String phone;

    private LocalDate dateOfBirth;
    private String address;
    @Email
    private String email;
    private double salary;
    @Enumerated(EnumType.STRING)
    private EmployeeStatus status;
    private Long numDayOffInMonth;

    public EmployeeDto(Long id,String name, String phone, LocalDate dateOfBirth, String address, String email, double salary, EmployeeStatus status, Long numDayOffInMonth) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.email = email;
        this.salary = salary;
        this.status = status;
        this.numDayOffInMonth = numDayOffInMonth==null?0:numDayOffInMonth;
    }
}
