package kodlama.io.hrms.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import kodlama.io.hrms.entities.concretes.Role;
import kodlama.io.hrms.entities.concretes.Skill;

@Repository
public interface SkillDao extends JpaRepository<Skill, Integer>{
	@Query(value = "SELECT skill.id, skill.skill_name, skill.description FROM skill  LEFT JOIN job_position_skill ON skill.id = job_position_skill.skill_id WHERE job_position_skill.job_position_id = :job_position_id", nativeQuery = true)
	List<Skill> findSkillPosition( @Param("job_position_id") Integer job_position_id);
}
