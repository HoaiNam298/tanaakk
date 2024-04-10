package kodlama.io.hrms.service;

import kodlama.io.hrms.core.utilities.results.Result;
import kodlama.io.hrms.entities.dtos.PanelForJob;

public interface ActivationPanelService {

    Result setApproved(PanelForJob panelForJob);

    Result setUnapproved(PanelForJob panelForJob);

}
