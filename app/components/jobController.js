import JobService from "./jobService.js";

//apply will not work with server but leaving it cause its a good idea
let _jobServ = new JobService()

function draw() {
    let jobs = _jobServ.Jobs
    let template = ''
    jobs.forEach(job => {
        template += job.makeCard()
    });
    document.getElementById('available-content').innerHTML = template
    document.getElementById('form-content').innerHTML = `            
    <form onsubmit="app.controllers.jobController.addJob(event)">
        <input type="text" name="title" placeholder="JobTitle" required>
        <input type="text" name="company" placeholder="Company" required>
        <input type="decimal" name="rate" placeholder="Rate" required>
        <input type="number" name="hours" placeholder="Hours" required>
        <input type="text" name="description" placeholder="Description">
         <button type="submit">Submit</button>
    </form>`
}

export default class JobController {
    constructor() {
        _jobServ.addSubscriber('jobs', draw)
        _jobServ.grabApiJobs()
    }
    addJob(event) {
        event.preventDefault();
        let form = event.target
        let newJob = {
            jobTitle: form.title.value,
            company: form.company.value,
            rate: form.rate.value,
            hours: form.hours.value,
            description: form.description.value
        }
        _jobServ.addJob(newJob)
        form.reset()

    }

    deleteJob(id) {
        _jobServ.deleteJobs(id)
    }

    apply(id) {
        _jobServ.apply(id)
    }

    grabJobs() {
        _jobServ.grabApiJobs()
    }
}