package kodlama.io.hrms.entities.key;

import kodlama.io.hrms.entities.concretes.Employee;
import kodlama.io.hrms.entities.concretes.Vacation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@EqualsAndHashCode
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class VacEmpKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "emp_id")
    private Employee employee;

    @ManyToOne
    @JoinColumn(name = "vac_id")
    private Vacation vacation;
}