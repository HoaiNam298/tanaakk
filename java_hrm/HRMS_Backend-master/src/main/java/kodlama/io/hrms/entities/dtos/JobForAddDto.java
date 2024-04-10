package kodlama.io.hrms.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobForAddDto {

    private int jobPositionId;

    private int cityId;

    private int employerId;

    private int workPlaceId;

    private int workTimeId;

    private int numberOfEmptyPositions;

    private int minimumSalary;

    private int maximumSalary;

    private LocalDate deadline;

    private LocalDate createdDate;

    private String description;

}
