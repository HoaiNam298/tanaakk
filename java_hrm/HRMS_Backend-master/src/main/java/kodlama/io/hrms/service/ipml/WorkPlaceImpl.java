package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.WorkPlaceDao; 
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.SuccessDataResult;
import kodlama.io.hrms.entities.concretes.WorkPlace;
import kodlama.io.hrms.service.WorkPlaceService;
import kodlama.io.hrms.service.constants.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkPlaceImpl implements WorkPlaceService {

    private WorkPlaceDao workPlaceDao;

    @Autowired
    public WorkPlaceImpl(WorkPlaceDao workPlaceDao) {
        this.workPlaceDao = workPlaceDao;
    }

    @Override
    public DataResult<List<WorkPlace>> getAll() {
        return new SuccessDataResult<List<WorkPlace>>(Messages.DataListed, workPlaceDao.findAll());
    }

    @Override
    public DataResult<WorkPlace> getById(int id) {
        return new SuccessDataResult<WorkPlace>(Messages.WorkPlaceFound, workPlaceDao.getById(id));
    }
}
