package com.olnFood.foodOrder.service;

import com.olnFood.foodOrder.model.Cart;
import com.olnFood.foodOrder.model.FoodItem;
import com.olnFood.foodOrder.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public Cart getCart(Long id) {
        return cartRepository.findById(id).orElse(new Cart());
    }

    // Create a new cart
    public Cart createCart() {
        Cart cart = new Cart();
        return cartRepository.save(cart);
    }

    // Add item to cart
    public Cart addItemToCart(Long cartId, FoodItem foodItem) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            cart.getFoodItems().add(foodItem);
            return cartRepository.save(cart);
        }
        throw new RuntimeException("Cart not found");
    }

    public Cart updateItemQuantity(Long cartId, Long itemId, int quantity) {
        Cart cart = getCart(cartId);
        for (FoodItem item : cart.getFoodItems()) {
            if (item.getId().equals(itemId)) {
                item.setQuantity(quantity);
                break;
            }
        }
        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(Long cartId, Long itemId) {
        Cart cart = getCart(cartId);
        cart.getFoodItems().removeIf(item -> item.getId().equals(itemId));
        return cartRepository.save(cart);
    }
}
