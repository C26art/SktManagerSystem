package com.skt.restlmpl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.skt.rest.DashboardRest;
import com.skt.service.DashboardService;

@RestController
public class DashboardRestlmpl implements DashboardRest {

    @Autowired
    DashboardService dashboardService;

    @Override
    public ResponseEntity<Map<String, Object>> getCount() {

        return dashboardService.getCount();
    }

}
