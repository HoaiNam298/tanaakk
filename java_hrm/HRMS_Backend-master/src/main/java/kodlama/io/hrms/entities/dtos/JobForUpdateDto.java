package kodlama.io.hrms.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobForUpdateDto {

    private int id;

    private int minimumSalary;

    private int maximumSalary;

    private int number_of_empty_positions;

    private int jobPositionId;

    private int cityId;

    private LocalDate createdDate;

    private LocalDate deadLine;

    private int workPlaceId;

    private int workTimeId;

    private String description;

    private boolean isActive;

    private boolean isApproved;
    
}
