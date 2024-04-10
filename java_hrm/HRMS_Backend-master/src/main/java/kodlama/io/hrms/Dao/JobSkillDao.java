package kodlama.io.hrms.Dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import kodlama.io.hrms.entities.concretes.JobPositionSkill;
import kodlama.io.hrms.entities.concretes.Skill;


@Repository
public interface JobSkillDao extends JpaRepository<JobPositionSkill, Integer>{
	

}
