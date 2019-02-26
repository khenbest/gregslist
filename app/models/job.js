export default class Job {
    constructor(data) {
        this.title = data.title
        this.company = data.company
        this.wage = data.wage
        this.hours = data.hours
        this.description = data.description
        this._id = data._id
        // this.applicants = 0
    }

    makeCard() {
        return `
        <div class="card col-3">
                <h5 class="card-title">${this.title} - ${this.company} </h5>
                <p class="card-text">${this.description}</p>
                <p class="card-text">${this.hours} -- $${this.wage}</p>
                <button onclick="app.controllers.carController.apply('${this._id}')">Apply Now</button>
                <button onclick="app.controllers.carController.deleteJob('${this._id}')">Remove</button>
        </div>`
    }
}


