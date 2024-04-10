package kodlama.io.hrms.api.controllers;


import kodlama.io.hrms.entities.concretes.ActivationPanelForSystemUser;
import kodlama.io.hrms.entities.dtos.PanelForJob;
import kodlama.io.hrms.service.ActivationPanelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/activationpanel/")
public class ActivationPanelController {

    private ActivationPanelService activationPanelService;

    @Autowired
    public ActivationPanelController(@RequestBody ActivationPanelService activationPanelService) {
        this.activationPanelService = activationPanelService;
    }

    @PostMapping("setapproved")
    public ResponseEntity<?> setApproved(@RequestBody PanelForJob panelForJob){
        return ResponseEntity.ok(this.activationPanelService.setApproved(panelForJob));
    }

    @PostMapping("setunapproved")
    public ResponseEntity<?> setUnapproved(@RequestBody PanelForJob panelForJob){
        return ResponseEntity.ok(this.activationPanelService.setUnapproved(panelForJob));
    }

}
