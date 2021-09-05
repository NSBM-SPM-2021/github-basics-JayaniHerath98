
class User {
    constructor(username, password, contactno, nic, state){
        this.username = username;
        this.password = password;
        this.contactno = contactno;
        this.nic = nic;
        this.state = state || 'NOT APPROVED';
    }
}

export default User;