import House from "../models/house.js";




let _api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

let _state = {
    houses: []
}

let _subscribers = {
    houses: []
}

function setState(prop, value) {
    _state[prop] = value
    _subscribers[prop].forEach(fn => fn());
}


//public
export default class HouseService {

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }

    get Houses() {
        return _state.houses.map(h => new House(h))
    }


    getApiHouses() {
        _api.get('houses')
            .then(res => {
                let data = res.data.map(h => new House(h))
                setState('houses', data)
            })
    }
    addHouse(rawHouse) {
        let newHouse = new House(rawHouse)
        _api.post('houses', newHouse)
            .then(res => {
                this.getApiHouses()
            })
    }

    deleteHouse(id) {
        _api.delete('houses/' + id)
            .then(res => {
                this.getApiHouses()
            })
    }

}