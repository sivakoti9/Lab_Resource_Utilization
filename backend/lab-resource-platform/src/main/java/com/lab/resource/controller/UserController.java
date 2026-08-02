package com.lab.resource.controller;

import com.lab.resource.entity.User;
import com.lab.resource.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ==========================
    // Create User
    // ==========================

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public User saveUser(@Valid @RequestBody User user) {

        return userService.saveUser(user);

    }

    // ==========================
    // Get All Users
    // ==========================

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public List<User> getAllUsers() {

        return userService.getAllUsers();

    }

    // ==========================
    // Get User By ID
    // ==========================

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public User getUserById(@PathVariable Long id) {

        return userService.getUserById(id);

    }

    // ==========================
    // Update User
    // ==========================

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        return userService.updateUser(id, user);

    }

    // ==========================
    // Delete User
    // ==========================

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public String deleteUser(@PathVariable Long id) {

        userService.deleteUser(id);

        return "User deleted successfully";

    }

    // ==========================
    // Dashboard Statistics
    // ==========================

    @GetMapping("/count")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','DEPARTMENT_HEAD')")
    public long getTotalUsers() {

        return userService.getTotalUsers();

    }

    @GetMapping("/count/{role}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER','DEPARTMENT_HEAD')")
    public long getUsersByRole(@PathVariable String role) {

        return userService.getUserCountByRole(role);

    }

    // ==========================
    // Search Users
    // ==========================

    @GetMapping("/search/firstname/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public List<User> searchByFirstName(@PathVariable String name) {

        return userService.searchByFirstName(name);

    }

    @GetMapping("/search/lastname/{name}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public List<User> searchByLastName(@PathVariable String name) {

        return userService.searchByLastName(name);

    }

    // ==========================
    // Filter Users By Role
    // ==========================

    @GetMapping("/role/{role}")
    @PreAuthorize("hasAnyRole('ADMIN','LAB_MANAGER')")
    public List<User> getUsersByRoleName(@PathVariable String role) {

        return userService.getUsersByRole(role);

    }

}