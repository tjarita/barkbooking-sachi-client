import axios from 'axios';

export default class DogRestService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://dog.ceo/api',
            timeout: 1000,
        });
    }

    getAllDogBreeds() {
        this.api.get('breeds/list/all')
            .then(function (response) {
                console.log(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
}