import axios from 'axios';

const USER_SERVER_URL = 'http://localhost:8080/api/users';

class UserService {

    getUsers(){
        axios.get(USER_SERVER_URL);
    }

    getSingleUser(id){
        axios.get(USER_SERVER_URL+'/'+id);
    }

    postUser(user){
        axios.post(USER_SERVER_URL, user);
    }

    

    deleteUser(id){
        axios.delete(USER_SERVER_URL+'/'+id);
    }
}

export default new UserService;