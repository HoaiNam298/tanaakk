package kodlama.io.hrms.service.ipml;

import kodlama.io.hrms.Dao.ActivationPanelDao;
import kodlama.io.hrms.Dao.SystemUserDao;
import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.core.utilities.results.SuccessResult;
import kodlama.io.hrms.entities.concretes.ActivationPanelForSystemUser;
import kodlama.io.hrms.entities.dtos.PanelForJob;
import kodlama.io.hrms.service.ActivationPanelService;
import kodlama.io.hrms.service.constants.Messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ActivationPanelImpl implements ActivationPanelService {

    private ActivationPanelDao activationPanelDao;
    private SystemUserDao systemUserDao;

    @Autowired
    public ActivationPanelImpl(ActivationPanelDao activationPanelDao,SystemUserDao systemUserDao) {
        this.activationPanelDao = activationPanelDao;
        this.systemUserDao = systemUserDao;
    }

    @Override
    public Result setApproved(PanelForJob panelForJob) {
        ActivationPanelForSystemUser activationPanel =
                activationPanelDao.getActivationPanelForSystemUserByJobId_Id(panelForJob.getJobId());

        activationPanel.setApproved(true);
        activationPanel.setSystemUser(systemUserDao.getById(panelForJob.getSystemUserId()));
        activationPanel.setActivationDate(new Date());
        activationPanel.setDetail(panelForJob.getDetail());

        activationPanelDao.save(activationPanel);

        activationPanelDao.save(activationPanel);
        return new SuccessResult(Messages.JobApproved);
    }

    @Override
    public Result setUnapproved(PanelForJob panelForJob) {

        ActivationPanelForSystemUser activationPanel =
                activationPanelDao.getActivationPanelForSystemUserByJobId_Id(panelForJob.getJobId());

        activationPanel.setApproved(false);
        activationPanel.setSystemUser(systemUserDao.getById(panelForJob.getSystemUserId()));
        activationPanel.setActivationDate(new Date());
        activationPanel.setDetail(panelForJob.getDetail());

        activationPanelDao.save(activationPanel);
        return new SuccessResult(Messages.JobUnapproved);
    }
}
