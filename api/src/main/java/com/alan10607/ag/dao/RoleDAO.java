package com.alan10607.ag.dao;

import com.alan10607.ag.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleDAO extends JpaRepository<Role, Long> {
    Role findByRoleName(String roleName);
}