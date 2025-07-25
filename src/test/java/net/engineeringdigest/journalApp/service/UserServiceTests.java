package net.engineeringdigest.journalApp.service;

import net.engineeringdigest.journalApp.controller.entity.User;
import net.engineeringdigest.journalApp.repository.UserRepo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class UserServiceTests {
        @Autowired
        private UserRepo userRepo;
    @Test
    public void testFindByUserName(){
        Optional<User> user= userRepo.findByUserName("john");
        assertTrue(!user.get().getJournalEntries().isEmpty());
    }
}
