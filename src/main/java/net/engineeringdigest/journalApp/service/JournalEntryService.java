package net.engineeringdigest.journalApp.service;

import net.engineeringdigest.journalApp.controller.entity.JournalEntry;
import net.engineeringdigest.journalApp.controller.entity.User;
import net.engineeringdigest.journalApp.repository.JournalEntryRepo;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Component
public class JournalEntryService {
    @Autowired
    private JournalEntryRepo journalEntryRepo;
    @Autowired
    private UserService userService;
    @Transactional
    public void saveEntry(JournalEntry journalEntry, String userName) {
        try {
            User user = userService.findByUserName(userName);
            if (user == null) {
                throw new RuntimeException("User not found: " + userName);
            }
            journalEntry.setDate(LocalDateTime.now());
            System.out.println("Saving journal entry: " + journalEntry);
            JournalEntry saved = journalEntryRepo.save(journalEntry);
            System.out.println("Saved entry: " + saved);
            user.getJournalEntries().add(saved);
            userService.saveUser(user);
        } catch (Exception e) {
            System.out.println(e);
            throw new RuntimeException("An error occurred: " + e);
        }
    }

    public void saveEntry(JournalEntry journalEntry) {
        journalEntryRepo.save(journalEntry);
    }

    public List<JournalEntry> getAll(){
        return journalEntryRepo.findAll();
    }
    public Optional<JournalEntry> findById(ObjectId id){
        return journalEntryRepo.findById(id);
    }

    @Transactional
    public boolean deleteById(ObjectId id, String userName) {
        boolean removed = false;
        try {
            User user = userService.findByUserName(userName);
            removed = user.getJournalEntries().removeIf(entry -> entry.getId().equals(id));

            if (removed) {
                userService.saveUser(user); // Save updated user without the deleted journal entry
                journalEntryRepo.deleteById(id); // Delete the journal entry from the DB
            }
        } catch (Exception e) {
            System.out.println(e); // Log the error to console
            throw new RuntimeException("An error occurred while deleting the entry.", e);
        }
        return removed;
    }

    public List<JournalEntry> findByUserName(String userName) {
        User user = userService.findByUserName(userName);
        return user.getJournalEntries();
    }



}
