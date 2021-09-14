import axios from 'axios';
import {handleErrors} from './error_handling';


const path = "/books";
var books_list = [];

class BookService {

    

    async getBooks(){
        books_list = [];
        await axios.get(path).then((response)=>{
            response.data.forEach(doc=>{
                books_list.push(doc);
            });
        }).catch(handleErrors);
        return books_list;
    }

    async getBook(id){
        var obj = null;
        await axios.get(`${path}/${id}`).then((response)=>{
            obj =  response.data;
        }).catch(handleErrors);
        return obj;
    }

    async addBook(book){
        await axios.post(path, book).then((response)=>{

        }).catch(handleErrors);
        alert("Given Book is Added to the System");
    }

    async updateBook(id, book){
        await axios.patch(`${path}/${id}`, book).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Book Updated");
    }

    async deleteBook(id){
        await axios.delete(`${path}/${id}`).then((response)=>{

        }).catch(handleErrors);
        alert("Selected Book Removed");
    }
}

export default new BookService();