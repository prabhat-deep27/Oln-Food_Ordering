package com.olnFood.foodOrder.repository;

import com.olnFood.foodOrder.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
