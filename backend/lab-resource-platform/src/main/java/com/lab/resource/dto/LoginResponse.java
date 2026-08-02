package com.lab.resource.dto;

public class LoginResponse {

    private Long userId;
    private String token;
    private String role;
    private String firstName;
    private String email;

    public LoginResponse() {
    }

    public LoginResponse(
            Long userId,
            String token,
            String role,
            String firstName,
            String email
    ) {
        this.userId = userId;
        this.token = token;
        this.role = role;
        this.firstName = firstName;
        this.email = email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}