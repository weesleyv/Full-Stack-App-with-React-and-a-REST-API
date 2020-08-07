import config from './config';

export default class Data {
    //makes the GET, POST, PUT, DELETE requests to the REST API.
    // @path - api endpoint, @method - http method
    api(path, method = 'GET', body = null, requiredAuth = false, credentials = null) {

        const url = path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
        }

        if (body !== null) {
            options.body = JSON.stringify(body)
        }

        if (requiredAuth) {
            const encodedCredentials = btoa( `${ credentials.emailAddress }:${ credentials.password }` );
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }
    
        return fetch(url, options)
    }

    //sends a GET request to the REST API's /api/users route
    async getUser(emailAddress, password) {
        const response = await this.api('/api/users', 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(user => user)
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error()
        }
    }

    //sends a POST request to the REST API's /api/users route
    async createUser(user) {
        const response = await this.api('/api/users', 'POST', user);
        if (response.status === 201) {
            return []
        } else if ( response.status === 400 ) {
            return response.json().then( data =>  
                data )
        } else {
            throw new Error()
        }
    }

    //sends a POST request to the REST API's /api/courses route
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, {emailAddress, password});
        if (response.status === 201) {
            return []
        } else if (response.status === 400) {
            return response.json().then( data => {
                return data
            })
        } else {
            throw new Error()
        }
    }
    
    //sends a GET request to the REST API's /api/courses/:id route
    async getCourse(id)  {
        const response = await this.api(`/courses/${id}`, 'GET');
        if (response.status === 200) {
            response.json().then(data => data)
        } else if (response.status === 401) {
            return null
        } else {
            throw new Error()
        }
    }

    //sends a PUT request to the REST API's /api/courses/:id route
    async updateCourse(course, emailAddress, password) {
        const response = await this.api(`/courses/${course.id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return []
        } else if (response.status === 400) {
            return response.json().then(error => {
                console.log(error);
                return error
            })
        } else {
            throw new Error()
        }
    }

    //sends a DELETE request to the REST API's /api/courses/:id route
    async deleteCourse(id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return []
        } else if (response.status === 401) {
            return response.json().then( data => data)
        } else {
            throw new Error();
        }
    }
}