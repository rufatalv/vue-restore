import {defineStore} from 'pinia'
import {jwtDecode} from 'jwt-decode'
import axios from "axios";
import {toast} from "@steveyuowo/vue-hot-toast";

export const useCart = defineStore('cart', {
    state: () => ({
        items: [], visible: false, total: 0,
    }),
    getters: {
        initializeFromLocalStorage() {
            const cartData = localStorage.getItem('cart');
            if (cartData) {
                this.items = JSON.parse(cartData);
                this.calculateTotal();
            }
        },
    },
    actions: {
        addToCart(itemToAdd, count = 1) {
            const existingItem = this.items.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                existingItem.count += count;
            } else {
                this.items.push({...itemToAdd, count});
            }
            this.calculateTotal();
            this.persistToLocalStorage();
        },
        toggleCart() {
            this.visible = !this.visible;
        },
        calculateTotal() {
            this.total = this.items.reduce((total, item) => {
                return total + (item.price * item.count);
            }, 0);
        },
        removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.calculateTotal();
            this.persistToLocalStorage();
        },
        persistToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.items));
        }
    },
});

export const useUser = defineStore('user', {
    state: () => ({
        user: (() => {
            const storedUser = localStorage.getItem('user');
            try {
                return storedUser ? JSON.parse(storedUser) : null;
            } catch (error) {
                return null;
            }
        })()
    }),
    getters: {
        isLoggedIn() {
            if(this.user && this.isTokenValid(this.user.token)){
                return true;
            } else{
                this.logout()
                return false;
            }
        }
    },
    actions: {
        persistToLocalStorage() {
            localStorage.setItem('user', JSON.stringify(this.user));
        },
        setUser(payload) {
            this.user = payload;
            this.persistToLocalStorage();
        },
        async addLikedProduct(payload) {
            const like = toast.loading('Loading...')
            try {
                const response = await axios.post(import.meta.env.VITE_API_URL + "/api/products/add-to-fav/" + payload).then((res) => {
                    toast.update(like, {
                        type: "success",
                        message: "Item added to favorites!"
                    })
                    return res
                });
                console.log(response.data);

                this.user.likedProducts = response.data.likedProducts;
                this.persistToLocalStorage();
            } catch (error) {
                console.error('Error updating liked products to backend:', error);
            }

        },
        async removeLikedProduct(payload) {
            const like = toast.loading('Loading...')

            try {
                const response = await axios.delete(import.meta.env.VITE_API_URL + "/api/products/add-to-fav/" + payload).then((res) => {
                    toast.update(like, {
                        type: "success",
                        message: "Item removed from favorites!"
                    })
                    return res
                });
                console.log(response.data);
                this.user.likedProducts = response.data.likedProducts;
                this.persistToLocalStorage();
            } catch (error) {
                console.error('Error updating liked products to backend:', error);
            }
        },
        logout() {
            this.user = null;
            this.persistToLocalStorage();
        },
        isTokenValid(token) {
            if (!token) return false;

            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);
                return decodedToken.exp > currentTime;
            } catch (error) {
                console.error('Error decoding token:', error);
                return false;
            }
        }
    }
});