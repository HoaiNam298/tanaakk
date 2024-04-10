package kodlama.io.hrms.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
public class JobForGetAllDto {

    private int id;

    private int minimumSalary;

    private int maximumSalary;

    private int number_of_empty_positions;

    private String positionName;

    private String cityName;

    private LocalDate createdDate;

    private LocalDate deadLine;

    private String workPlaceName;

    private String workTimeName;

    private String description;

    private boolean isActive;

    private boolean isApproved;

    public JobForGetAllDto() {
    }

    public JobForGetAllDto(int id, int minimumSalary, int maximumSalary, int number_of_empty_positions, String positionName, String cityName, LocalDate createdDate, LocalDate deadLine, String workPlaceName, String workTimeName, String description, boolean isActive, boolean isApproved) {
        this.id = id;
        this.minimumSalary = minimumSalary;
        this.maximumSalary = maximumSalary;
        this.number_of_empty_positions = number_of_empty_positions;
        this.positionName = positionName;
        this.cityName = cityName;
        this.createdDate = createdDate;
        this.deadLine = deadLine;
        this.workPlaceName = workPlaceName;
        this.workTimeName = workTimeName;
        this.description = description;
        this.isActive = isActive;
        this.isApproved = isApproved;
    }
}
