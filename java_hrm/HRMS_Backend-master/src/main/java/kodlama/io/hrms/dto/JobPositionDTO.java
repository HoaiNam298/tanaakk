package kodlama.io.hrms.dto;

import java.util.List;

import kodlama.io.hrms.entities.concretes.Skill;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobPositionDTO {
	int id;
	String positionName;
	List<Skill> skills;
}
