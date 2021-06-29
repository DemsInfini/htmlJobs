
document.querySelector(".button-container")
    .addEventListener('click', () => {
        let texte = document.getElementById("filter-jobs").value

        getJobs().then(jobs => {
            let filteredJobs = filterJobs(jobs, texte)
            showJobs(filteredJobs)
        })
    })

async function getJobs() {
    const res = await fetch("data.json")
    const data = await res.json()
    return data
}


function filterJobs(jobs, searchText) {
    console.log(searchText)
    if(searchText) {
        let filteredJobs =
            jobs.filter(job => {
                 if (job.roleName.toLowerCase().includes(searchText) ||
                    job.type.toLowerCase().includes(searchText) ||
                    job.company.toLowerCase().includes(searchText) ||
                    job.requirements.content.toLowerCase().includes(searchText)) {
                    return true
                } else {
                    return false
                } 
                console.log(job)
            })
        return filteredJobs

    } else {
        return jobs
    }

    console.log(searchText)
}

function showJobs(jobs) {
    // console.log("Jobs in showJobs",jobs)
    let jobsContainer = document.querySelector('.jobs-container')
    // console.log(jobsContainer)
    let jobsHTML = ""
    jobs.forEach(job => {
        jobsHTML += `
    
                 <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" alt="Job Logo">
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">
                    <span>
                    ${job.requirements.content}
                    </span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>
            </div>
            
            `

        /*  console.log(jobsHTML) */
    })

    jobsContainer.innerHTML = jobsHTML
}

getJobs().then(data => {
    showJobs(data)
})