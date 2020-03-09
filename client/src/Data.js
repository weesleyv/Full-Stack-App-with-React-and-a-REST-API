import config from './config';

export default class Data {
    api(path, method = 'GET', body = null, requiredAuth = false, credentials = null) {

        const url = config.apiUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
              },
        }

        if (body != null) {
            options.body = JSON.stringify(body)
        }

        if (requiredAuth) {
            const encodedCredentials = btoa( `${ credentials.emailAddress }:${ credentials.password }` );
            options.headers['Authorization'] = `Basic ${encodedCredentials}`
        }

        return fetch(url, options)
    }

    async getCourses() {
        const response = await this.api('/courses', 'GET');
        if ( response.status === 200 ) {
            return response.json()
                .then( data => data )
        } else if ( response.status === 401) {
            return null
        } else {
            throw new Error();
        }
    }

    async getUser(emailAddress, password) {
        const response = await this.api('/users', 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => data)
        } else if (response.status === 400) {
            return null
        } else {
            throw new Error()
        }
    }

    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return []
        } else if ( response.status === 400 ) {
            return response.json().then( data => { 
                return data.message })
        } else {
            throw new Error()
        }
    }
}