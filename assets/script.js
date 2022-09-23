const selectMenu = document.querySelectorAll('select');
const content = document.querySelector('.content');
const currentTime = document.querySelectorAll('.clock');
const setAlarmTime = document.querySelector('.set');
const ring = new Audio('assets/alarm/alarm-1.mp3');

let alarmTime;
let isAlarmSet = false;

for (let i = 1; i <= 12; i++) {
    i = i < 10 ? '0' + i : i;
    let option = '<option value="${i}">${i}</option>'
    selectMenu[0].lastElementChild.insertAdjacentHTML('afterend', option)
}
for (let i = 0; i <= 59; i++) {
    i = i < 10 ? '0' + i : i;
    let option = '<option value="${i}">${i}</option>'
    selectMenu[1].lastElementChild.insertAdjacentHTML('afterend', option)
}
for (let i = 0; i <= 59; i++) {
    i = i < 10 ? '0' + i : i;
    let option = '<option value="${i}">${i}</option>'
    selectMenu[2].lastElementChild.insertAdjacentHTML('afterend', option)
}
for (let i = 1; i <= 2; i++) {
    let ampm = i == 1 ? 'AM' : 'PM';
    let option = '<option value="${ampm}">${ampm}</option>'
    selectMenu[3].lastElementChild.insertAdjacentHTML('afterend', option)
}

setInterval(clock, 1000)

function clock() 
{
    const date = new Date();

    h = date.getHours();
    m = date.getMinutes();
    s = date.getSeconds();
    ampm = 'AM'

    if (h >= 12) {
        ampm = 'AM'
    }
    if (h == 0) {
        h = 12;
    }
    if (h > 12) {
        h = h % 12;
    }

    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    currentTime[0].innerText = h;
    currentTime[1].innerText = m;
    currentTime[2].innerText = s;
    currentTime[3].innerText = ampm;

    if (alarmTime == '${h}:${m}:${s} ${ampm}') {
        ring.play();
        ring.loop = true;
    }

    clock();

    function setAlarm() {
        if (isAlarmSet) {
            ring.pause();
            alarmTime = '';
            setAlarmTime.style.color = 'black';
            setAlarmTime.style.backgroundColor = 'hsl(115,72%,53.7%)';
            content.classList.remove('disable');
            setAlarmTime.innerText = 'Set Alarm';
            return isAlarmSet = false;
        }

        time = '${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value}:${selectMenu[3].value}';
        alarmTime = time;

        if (time.includes('Hour') || time.includes('Min') || time.includes('Sec') || time.includes('AM/PM')) {
            alert('kamu harus memilih dari semua opsi');
            return
        }
        isAlarmSet = true;
        content.classList.add('disable');
        setAlarmTime.style.backgroundColor = '#690202';
        setAlarmTime.style.color = '#fff';
        setAlarmTime.innerText = 'Reset Alarm';
    }
    setAlarmTime.addEventListener('Klik', setAlarm);
    
}