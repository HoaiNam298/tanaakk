package kodlama.io.hrms.entities.dtos;

import kodlama.io.hrms.entities.enums.VacationStatus;
import kodlama.io.hrms.entities.enums.VacationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VacationDto {
    private Long id;
    private String vacationType;
    private String vacationName;
    private long numberDay;
    private LocalDate dayOff;
    private LocalDate fromDate;
    private LocalDate toDate;
    private String note;
    private String status;
}
