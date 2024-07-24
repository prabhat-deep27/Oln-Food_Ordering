package com.olnFood.foodOrder.Controller;

import com.olnFood.foodOrder.model.OrderItem;
import com.olnFood.foodOrder.repository.CustomerOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderItemController {
    @Autowired
    private CustomerOrderRepository orderRepository;

    @GetMapping
    public List<OrderItem> getAllOders(){
        return orderRepository.findAll();
    }

    @PostMapping
    public OrderItem createOrder(@RequestBody OrderItem order){
        return orderRepository.save(order);
    }
}
