const time = document.getElementById('time');
const date = document.getElementById('date');
const date2 = document.getElementById('date2');
// const date3 = document.getElementById('date3');

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const interval = setInterval(() => {

    const local = new Date();
    
    let day = local.getDate(),
        month = local.getMonth(),
        year = local.getFullYear(),
        namedate=local.toDateString();
        
    if(local.getMinutes<10){
        time.innerHTML = local.getHours() + ":" + "0" + local.getMinutes();
    }
    else
        time.innerHTML = local.getHours() + ":" + local.getMinutes();
    date.innerHTML = `${monthNames[month]} ${year}`;
    date2.innerHTML = `${namedate}`;

}, 1000);