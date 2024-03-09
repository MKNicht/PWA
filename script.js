var shop = new Vue({
    el: "#app",
    data: {
        sitename: "After School Class",
        showSubject: true,
        showProduct: true,
        subjects: [
            {
                id: 1,
                image: "image/english.png",
                subject: "English",
                location: "Hendon",
                price: "200",
                available: 10,
            },

            {
                id: 2,
                image: "image/chinese.png",
                subject: "Chinese",
                location: "Macau",
                price: "200",
                available: 10,
            },

            {
                id: 3,
                image: "image/math.png",
                subject: "Math",
                location: "Pimlico",
                price: "200",
                available: 10,
            },

            {
                id: 4,
                image: "image/biology.png",
                subject: "Biology",
                location: "London",
                price: "100",
                available: 10,
            },

            {
                id: 5,
                image: "image/physics.png",
                subject: "Physics",
                location: "Victoria",
                price: "150",
                available: 10,
            },

            {
                id: 6,
                image: "image/chemistry.png",
                subject: "Chemistry",
                location: "London",
                price: "300",
                available: 10,
            },

            {
                id: 7,
                image: "image/computer science.png",
                subject: "Computer science",
                location: "London",
                price: "250",
                available: 10,
            },

            {
                id: 8,
                image: "image/music.png",
                subject: "Music",
                location: "London",
                price: "500",
                available: 10,
            },

            {
                id: 9,
                image: "image/geography.png",
                subject: "Geography",
                location: "London",
                price: "100",
                available: 10,
            },

            {
                id: 10,
                image: "image/art.png",
                subject: "Art",
                location: "London",
                price: "400",
                available: 10,
            },
        ],
        cart: [],
        name: '',
        phone: '',
    },

    methods: {
        add: function (subject) {
            if (subject.available > 0) {
                const cartItem = this.cart.find(item => item.id === subject.id);
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    this.cart.push({
                        id: subject.id,
                        name: subject.subject,
                        price: subject.price,
                        quantity: 1,
                    });
                }
                subject.available--;
            }
        },

        showCheckout() {
            this.showProduct = !this.showProduct;
        },

        validateName() {
            this.name = this.name.replace(/[^a-zA-Z\s]/g, '');
        },

        validatePhone() {
            this.phone = this.phone.replace(/\D/g, '');
        },

        submitForm() {
            alert('The order has been submitted');
        },

        toggleView() {
            this.showSubject = !this.showSubject;
        },

        decreaseQuantity: function (item) {
            if (item.quantity > 0) {
                item.quantity--;
                if (item.quantity === 0) {
                    this.removeProduct(item);
                } else {
                    const subject = this.subjects.find(subject => subject.id === item.id);
                    if (subject) {
                        subject.available++;
                    }
                }
            }
        },

        removeProduct: function (item) {
            const index = this.cart.indexOf(item);
            if (index !== -1) {
                const subject = this.subjects.find(subject => subject.id === item.id);
                if (subject) {
                    subject.available += item.quantity;
                }
                this.cart.splice(index, 1);
            }
        },

        sort: function (property) {
            this.subjects.sort((a, b) => {
                const valueA = a[property];
                const valueB = b[property];

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB);
                }

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return valueA - valueB;
                }

                return 0;
            });
        },
    },

    computed: {
        countItem: function () {
            return this.cart.length || "";
        },

        checking() {
            return function (subject) {
                return subject.available > 0;
            };
        },

        isFormValid() {
            return this.name.trim() !== '' && /^\d+$/.test(this.phone.trim());
        },

        totalQuantity: function () {
            return this.cart.reduce((total, item) => total + item.quantity, 0);
        },

        totalPrice: function () {
            return this.cart.reduce((total, item) => {
                if (!isNaN(item.price)) {
                    return total + item.price * item.quantity;
                }
                return total;
            }, 0);
        },
    }
});