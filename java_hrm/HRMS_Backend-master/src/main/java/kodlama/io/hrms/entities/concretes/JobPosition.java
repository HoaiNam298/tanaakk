package kodlama.io.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name = "job_positions")
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "jobs", "jobSeekers", "workExperiences" })
public class JobPosition {

	@Id
	@Column(name = "id")
	private int id;

	@Column(name = "position_name")
	private String positionName;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "jobPosition")
	@JsonIgnore
	private List<Job> jobs;

	@OneToMany(cascade = CascadeType.ALL, mappedBy = "jobPosition")
	@JsonIgnore
	private List<WorkExperience> workExperiences;

	@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
      name = "job_position_skill", 
      joinColumns = @JoinColumn(name = "job_position_id"), 
      inverseJoinColumns = @JoinColumn(name = "skill_id"))
    private Collection<Skill> skills;

	@Override
	public String toString() {
		return "JobPosition{" + "id=" + id + ", positionName='" + positionName + '\'' + '}';
	}

}
