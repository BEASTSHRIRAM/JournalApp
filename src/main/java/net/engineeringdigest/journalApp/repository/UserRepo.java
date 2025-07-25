package net.engineeringdigest.journalApp.repository;

import net.engineeringdigest.journalApp.controller.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepo extends MongoRepository <User, ObjectId>{
    Optional<User> findByUserName(String userName);
    void deleteByUserName(String userName);
}
