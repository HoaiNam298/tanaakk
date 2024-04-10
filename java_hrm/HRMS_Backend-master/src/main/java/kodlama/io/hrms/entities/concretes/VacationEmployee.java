package kodlama.io.hrms.entities.concretes;

import kodlama.io.hrms.entities.enums.VacationStatus;
import kodlama.io.hrms.entities.key.VacEmpKey;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "vacation_employee")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacationEmployee implements Serializable {
    @EmbeddedId
    private VacEmpKey vacEmpKey;
    @Enumerated(EnumType.STRING)
    private VacationStatus status;
}
