export default class Job {
    constructor(data) {
        this.jobTitle = data.jobTitle
        this.company = data.company
        this.rate = data.rate
        this.hours = data.hours
        this.description = data.description
        this._id = data._id
        this.applicants = 0
    }

    makeCard() {
        return `
        <div class="card col-3">
                <h5 class="card-title">${this.jobTitle} - ${this.company} </h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text">${this.hours} -- $${this.rate}</p>
                <button onclick="app.controllers.carController.apply('${this._id}')">Apply Now</button>
                <button onclick="app.controllers.carController.deleteJob('${this._id}')">Remove</button>
        </div>`
    }
}


