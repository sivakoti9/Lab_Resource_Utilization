package com.lab.resource.service.impl;

import com.lab.resource.entity.User;
import com.lab.resource.repository.UserRepository;
import com.lab.resource.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository,
                           PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;

    }

    // =====================================================
    // CREATE USER
    // =====================================================

    @Override
    public User saveUser(User user) {

        // Check duplicate email
        if (userRepository.existsByEmail(user.getEmail())) {

            throw new RuntimeException("Email already exists.");

        }

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);

    }

    // =====================================================
    // GET ALL USERS
    // =====================================================

    @Override
    public List<User> getAllUsers() {

        return userRepository.findAll();

    }

    // =====================================================
    // GET USER BY ID
    // =====================================================

    @Override
    public User getUserById(Long id) {

        return userRepository.findById(id).orElse(null);

    }

    // =====================================================
    // UPDATE USER
    // =====================================================

    @Override
    public User updateUser(Long id, User user) {

        User existing = userRepository.findById(id).orElse(null);

        if (existing == null) {

            return null;

        }

        // Check duplicate email
        User emailOwner =
                userRepository.findByEmail(user.getEmail())
                        .orElse(null);

        if (emailOwner != null &&
                !emailOwner.getUserId().equals(id)) {

            throw new RuntimeException("Email already exists.");

        }

        existing.setFirstName(user.getFirstName());
        existing.setLastName(user.getLastName());
        existing.setEmail(user.getEmail());
        existing.setPhone(user.getPhone());
        existing.setRole(user.getRole());

        // Update password only if provided
        if (user.getPassword() != null &&
                !user.getPassword().isBlank()) {

            existing.setPassword(
                    passwordEncoder.encode(user.getPassword())
            );

        }

        return userRepository.save(existing);

    }

    // =====================================================
    // DELETE USER
    // =====================================================

    @Override
    public void deleteUser(Long id) {

        userRepository.deleteById(id);

    }

    // =====================================================
    // DASHBOARD STATISTICS
    // =====================================================

    @Override
    public long getTotalUsers() {

        return userRepository.count();

    }

    @Override
    public long getUserCountByRole(String roleName) {

        return userRepository.countByRoleRoleName(roleName);

    }

    // =====================================================
    // SEARCH USERS
    // =====================================================

    @Override
    public List<User> searchByFirstName(String firstName) {

        return userRepository.findByFirstNameContainingIgnoreCase(firstName);

    }

    @Override
    public List<User> searchByLastName(String lastName) {

        return userRepository.findByLastNameContainingIgnoreCase(lastName);

    }

    @Override
    public List<User> getUsersByRole(String roleName) {

        return userRepository.findByRoleRoleName(roleName);

    }

}