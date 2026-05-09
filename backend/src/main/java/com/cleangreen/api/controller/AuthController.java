package com.cleangreen.api.controller;

import com.cleangreen.api.model.User;
import com.cleangreen.api.repository.UserRepository;
import com.cleangreen.api.security.JwtUtils;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (encoder.matches(loginRequest.getPassword(), user.getPassword())) {
            String jwt = jwtUtils.generateJwtToken(user.getUsername());
            return ResponseEntity.ok(new JwtResponse(jwt, user.getUsername(), user.getRole()));
        } else {
            return ResponseEntity.badRequest().body("Invalid password");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Username is already taken!");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(encoder.encode(registerRequest.getPassword()));
        user.setAadhaarNumber(registerRequest.getAadhaarNumber());
        user.setVerified(true); // Mocking successful Aadhaar verification
        user.setRole("CITIZEN");

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully with Aadhaar verification!");
    }

    @Data
    public static class LoginRequest {
        private String username;
        private String password;
    }

    @Data
    public static class RegisterRequest {
        private String username;
        private String email;
        private String password;
        private String aadhaarNumber;
    }

    @Data
    public static class JwtResponse {
        private String token;
        private String username;
        private String role;

        public JwtResponse(String token, String username, String role) {
            this.token = token;
            this.username = username;
            this.role = role;
        }
    }
}
