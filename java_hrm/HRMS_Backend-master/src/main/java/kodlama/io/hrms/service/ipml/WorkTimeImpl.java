package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.WorkPlaceDao;
import kodlama.io.hrms.Dao.WorkTimeDao;
import kodlama.io.hrms.core.utilities.results.DataResult;
import kodlama.io.hrms.core.utilities.results.SuccessDataResult;
import kodlama.io.hrms.entities.concretes.WorkPlace;
import kodlama.io.hrms.entities.concretes.WorkTime;
import kodlama.io.hrms.service.WorkTimeService;
import kodlama.io.hrms.service.constants.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkTimeImpl implements WorkTimeService {

    private WorkTimeDao workTimeDao;

    @Autowired
    public WorkTimeImpl(WorkTimeDao workTimeDao) {
        this.workTimeDao = workTimeDao;
    }

    @Override
    public DataResult<List<WorkTime>> getAll() {
        return new SuccessDataResult<List<WorkTime>>(Messages.DataListed, workTimeDao.findAll());
    }

    @Override
    public DataResult<WorkTime> getById(int id) {
        return new SuccessDataResult<WorkTime>(Messages.WorkTimeFound, workTimeDao.getById(id));
    }
}
