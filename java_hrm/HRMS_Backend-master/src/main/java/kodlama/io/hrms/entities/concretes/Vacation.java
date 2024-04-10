package kodlama.io.hrms.entities.concretes;

import kodlama.io.hrms.entities.enums.VacationStatus;
import kodlama.io.hrms.entities.enums.VacationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name="vacation")
@Data
@NoArgsConstructor
public class Vacation {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    @Enumerated(EnumType.STRING)
    private VacationType vacationType;
    private String vacationName;
    private long numberDay;
    private LocalDate dayOff;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String note;
    @Enumerated(EnumType.STRING)
    private VacationStatus status;
    public Vacation(VacationType vacationType, String vacationName, LocalDate dayOff, LocalDate fromDate, LocalDate toDate, String note, VacationStatus status) {
        this.vacationType = vacationType;
        this.vacationName = vacationName;
        this.dayOff = dayOff;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.numberDay = dayOff!=null&&(fromDate==null||fromDate.equals(""))?1:ChronoUnit.DAYS.between(fromDate, toDate) + 1;
        this.note = note;
        this.status = status;
    }

    public Vacation(Long id, VacationType vacationType, String vacationName, LocalDate dayOff, LocalDate fromDate, LocalDate toDate, String note, VacationStatus status) {
        this.id = id;
        this.vacationType = vacationType;
        this.vacationName = vacationName;
        this.dayOff = dayOff;
        this.fromDate = fromDate;
        this.toDate = toDate;
        this.numberDay = dayOff!=null&&(fromDate==null||fromDate.equals(""))?1:ChronoUnit.DAYS.between(fromDate, toDate) + 1;
        this.note = note;
        this.status = status;
    }
}
