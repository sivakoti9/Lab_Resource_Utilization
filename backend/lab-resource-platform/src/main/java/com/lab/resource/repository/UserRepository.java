package com.lab.resource.repository;

import com.lab.resource.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Login
    Optional<User> findByEmail(String email);

    // Register
    boolean existsByEmail(String email);

    // Dashboard Statistics
    long countByRoleRoleName(String roleName);

    // Search Users
    List<User> findByFirstNameContainingIgnoreCase(String firstName);

    List<User> findByLastNameContainingIgnoreCase(String lastName);

    List<User> findByRoleRoleName(String roleName);

}