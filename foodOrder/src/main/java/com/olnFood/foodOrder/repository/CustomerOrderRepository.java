package com.olnFood.foodOrder.repository;

import com.olnFood.foodOrder.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerOrderRepository extends JpaRepository<OrderItem, Long> {
}
