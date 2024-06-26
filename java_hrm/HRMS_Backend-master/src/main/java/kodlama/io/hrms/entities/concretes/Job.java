package kodlama.io.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.time.LocalDate;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "jobs")
public class Job {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "description")
    private String description;

    @Column(name = "min_salary")
    private int minimumSalary;

    @Column(name = "max_salary")
    private int maximumSalary;

    @Column(name = "number_of_empty_positions")
    private int empty_positions;

    @Column(name = "is_active")
    private boolean isActive;

    @Column(name = "deadline")
    private LocalDate deadline;

    @Column(name = "created_date")
    private LocalDate createdDate;

    @ManyToOne()
    @JoinColumn(name = "general_position_id")
    private JobPosition jobPosition;

    @ManyToOne()
    @JoinColumn(name = "city_id")
    private City city;

    @ManyToOne()
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @ManyToOne()
    @JoinColumn(name = "work_place_id")
    private WorkPlace workPlace;

    @ManyToOne()
    @JoinColumn(name = "work_time_id")
    private WorkTime workTime;
    @Override
    public String toString() {
        return "Job{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", minimumSalary=" + minimumSalary +
                ", maximumSalary=" + maximumSalary +
                ", empty_positions=" + empty_positions +
                ", isActive=" + isActive +
                ", deadline=" + deadline +
                ", createdDate=" + createdDate +
                '}';
    }


}
