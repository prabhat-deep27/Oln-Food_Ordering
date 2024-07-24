package com.olnFood.foodOrder.Controller;

import com.olnFood.foodOrder.model.FoodItem;
import com.olnFood.foodOrder.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fooditems")
public class FoodItemController {
    @Autowired
    private FoodItemRepository foodItemRepository;

    @GetMapping
    public List<FoodItem> getAllFoodItems(){
        return foodItemRepository.findAll();
    }

    @PostMapping
    public FoodItem createFoodItem(@RequestBody FoodItem foodItem){
        return foodItemRepository.save(foodItem);
    }
}
