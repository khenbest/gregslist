import Job from "../models/job.js";

let _api = axios.create({
    baseURL: 'http://localhost:3000/api'
})

let _state = {
    jobs: []
}

let _subscribers = {
    jobs: []
}

function setState(prop, data) {
    _state[prop] = data
    _subscribers[prop].forEach(fn => fn());
}




export default class JobService {

    addSubscriber(prop, fn) {
        _subscribers[prop].push(fn)
    }
    get Jobs() {
        return _state.jobs.map(j => new Job(j))
    }

    grabApiJobs() {
        _api.get('jobs')
            .then(res => {
                console.log("res", res)
                let jobData = res.data.map(j => new Job(j))
                setState('jobs', jobData)
            })
    }

    addJob(rawJob) {
        let newJob = new Job(rawJob)
        _api.post('jobs', newJob)
            .then(res => {
                this.grabApiJobs()
            })
    }

    deleteJob(id) {
        _api.delete('jobs/' + id)
            .then(res => {
                this.grabApiJobs()
            })
    }

    apply(jobToFindId) {
        let job = _state.jobs.find(j => j._id == jobToFindId)
        job.applicants += 1
        _api.put('jobs/' + job._id, job)
            .then(res => {
                this.grabApiJobs()
            })
    }
}