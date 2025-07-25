package net.engineeringdigest.journalApp.service;

import net.engineeringdigest.journalApp.controller.entity.User;
import net.engineeringdigest.journalApp.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserServiceDetailsImpl implements UserDetailsService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    // Constructor injection to avoid circular dependency
    @Autowired
    public UserServiceDetailsImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepo.findByUserName(username);
        if (user.isPresent()) {
            return org.springframework.security.core.userdetails.User.builder()
                    .username(user.get().getUsername())
                    .password(user.get().getPassword())  // The password should already be encoded
                    .roles(user.get().getRoles().toArray(new String[0]))  // Ensuring roles are fetched properly
                    .build();
        } else {
            throw new UsernameNotFoundException("User not found: " + username);
        }
    }

    // Optionally, you can add a method to register a user (ensure password encoding during registration)
    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));  // Encode the password before saving
        userRepo.save(user);  // Save the user to the repository
    }
}
