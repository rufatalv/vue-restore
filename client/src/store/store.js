import {defineStore} from 'pinia'
import {jwtDecode} from 'jwt-decode'


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
            return this.user && this.isTokenValid(this.user.token);
            // const {user} = this;
            // console.log(user)
            // if (!user || !user.token) return false;
            //
            // if (!this.isTokenValid(user.token)) {
            //     this.logout();
            //     return false;
            // }
            //
            // return true;
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