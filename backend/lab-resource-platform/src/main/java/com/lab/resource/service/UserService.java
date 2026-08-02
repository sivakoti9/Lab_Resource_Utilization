package com.lab.resource.service;

import com.lab.resource.entity.User;

import java.util.List;

public interface UserService {

    // =====================================================
    // CREATE USER
    // =====================================================

    User saveUser(User user);

    // =====================================================
    // GET ALL USERS
    // =====================================================

    List<User> getAllUsers();

    // =====================================================
    // GET USER BY ID
    // =====================================================

    User getUserById(Long id);

    // =====================================================
    // UPDATE USER
    // =====================================================

    User updateUser(Long id, User user);

    // =====================================================
    // DELETE USER
    // =====================================================

    void deleteUser(Long id);

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    long getTotalUsers();

    long getUserCountByRole(String roleName);

    // =====================================================
    // SEARCH USERS
    // =====================================================

    List<User> searchByFirstName(String firstName);

    List<User> searchByLastName(String lastName);

    List<User> getUsersByRole(String roleName);

}