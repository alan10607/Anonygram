package com.alan10607.ag.service.auth;

import com.alan10607.ag.dao.RoleDAO;
import com.alan10607.ag.model.Role;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public class RoleService {
    private final RoleDAO roleDAO;

    public Role findRole(String roleName) {
        return roleDAO.findByRoleName(roleName);
    }

    public void saveRole(Role role) {
        roleDAO.save(role);
    }

}