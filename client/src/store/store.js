import {defineStore} from 'pinia'

export const useCart = defineStore('cart', {
    state: () => ({
        items: [], visible: false, total: 0,
    }), actions: {
        addToCart(itemToAdd, count = 1) {
            const existingItem = this.items.find(item => item.id === itemToAdd.id);
            if (existingItem) {
                existingItem.count += count;
            } else {
                this.items.push({...itemToAdd, count});
            }
            this.calculateTotal();
        }, toggleCart() {
            this.visible = !this.visible;
        }, calculateTotal() {
            this.total = this.items.reduce((total, item) => {
                return total + (item.price * item.count);
            }, 0);
        }, removeItem(id) {
            this.items = this.items.filter(item => item.id !== id);
            this.calculateTotal();
        }
    }
});

export const useUser = defineStore('user', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('user') || null)
    }), getters: {
        isLoggedIn() {
            return !!this.user
        }
    }, actions: {
        persistToLocalStorage() {
            localStorage.setItem('user', JSON.stringify(this.user))

        }, setUser(payload) {
            this.user = payload
            this.persistToLocalStorage()
        }, logout() {
            this.user = null
            this.persistToLocalStorage()
        }
    }
})

