class manager {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }
    
    getEmail() {
        return this.email;
    }

    getRole() {
        return 'manager';
    }
    
};
//exports to main page
module.exports = manager;