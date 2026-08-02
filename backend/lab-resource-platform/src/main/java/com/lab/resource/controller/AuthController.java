package com.lab.resource.controller;

import com.lab.resource.dto.LoginRequest;
import com.lab.resource.dto.LoginResponse;
import com.lab.resource.entity.User;
import com.lab.resource.repository.UserRepository;
import com.lab.resource.security.JwtService;
import com.lab.resource.service.UserService;
import jakarta.validation.Valid;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserRepository userRepository,
                          UserService userService,
                          PasswordEncoder passwordEncoder,
                          JwtService jwtService) {

        this.userRepository = userRepository;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // ==========================================
    // REGISTER
    // ==========================================

    @PostMapping("/register")
    public User register(@Valid @RequestBody User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return userService.saveUser(user);
    }

    // ==========================================
    // LOGIN
    // ==========================================

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().getRoleName()
        );

        return new LoginResponse(

                user.getUserId(),
                token,
                user.getRole().getRoleName(),
                user.getFirstName(),
                user.getEmail()

        );
    }

}