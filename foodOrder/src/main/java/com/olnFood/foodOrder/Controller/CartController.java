package com.olnFood.foodOrder.Controller;

import com.olnFood.foodOrder.model.Cart;
import com.olnFood.foodOrder.model.FoodItem;
import com.olnFood.foodOrder.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public Cart createCart() {
        return cartService.createCart();
    }

    @GetMapping
    public Cart getCart(@PathVariable Long id){
        return cartService.getCart(id);
    }

    @PostMapping("/{cartId}/foodItems")
    public Cart addItemToCart(@PathVariable Long cartId, @RequestBody FoodItem foodItems){
        return cartService.addItemToCart(cartId, foodItems);
    }

    @PutMapping
    public Cart updateItemQuantity(@PathVariable Long id, @PathVariable Long itemId, @RequestParam int quantity) {
        return cartService.updateItemQuantity(id, itemId, quantity);
    }
    @DeleteMapping("/{id}/items/{itemId}")
    public Cart removeItemFromCart(@PathVariable Long id, @PathVariable Long itemId) {
        return cartService.removeItemFromCart(id, itemId);
    }
}
