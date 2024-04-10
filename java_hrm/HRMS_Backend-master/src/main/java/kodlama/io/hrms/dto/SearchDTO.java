package kodlama.io.hrms.dto;

import kodlama.io.hrms.entities.concretes.Employer;
import kodlama.io.hrms.entities.concretes.Job;
import kodlama.io.hrms.entities.concretes.JobPosition;
import kodlama.io.hrms.entities.concretes.JobSeeker;
import kodlama.io.hrms.entities.dtos.JobForGetAllDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SearchDTO {
    private List<JobForGetAllDto> job;
    private List<JobSeeker> jobSeeker;
    private List<Employer> employer;
    private List<JobPosition> jobPosition;
}
