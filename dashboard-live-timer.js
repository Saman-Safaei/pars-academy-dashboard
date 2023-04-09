const milliTimer = {
  oneSecond: 1000,
  oneMinute: 60 * 1000,
  oneHour: 60 * 60 * 1000,
  oneDay: 60 * 60 * 24 * 1000,
};

const timerSlice = document.querySelector(".timer-slice");
const redirectSlice = document.querySelector(".redirect-slice");

const dashboardLiveTimer = document.querySelector(".live-timer");

const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + ((1 + 3 - targetDate.getDay()) % 7));
targetDate.setHours(21, 0, 0);

const currentDate = new Date();

const timeDifferences = targetDate.getTime() - currentDate.getTime();

const showTimer = (timerValues) => {
  if (timerValues.ended) {
    timerSlice.style.display = "none";
    redirectSlice.style.display = "";
  } else {
    const days = ("0" + timerValues.absDays).slice(-2);
    const hours = ("0" + timerValues.absHours).slice(-2);
    const minutes = ("0" + timerValues.absMinutes).slice(-2);
    const seconds = ("0" + timerValues.absSeconds).slice(-2);

    dashboardLiveTimer.innerHTML = `
        <span class="live-timer__number">${days[0]}</span>
        <span class="live-timer__number">${days[1]}</span>
        <span>:</span>
        <span class="live-timer__number">${hours[0]}</span>
        <span class="live-timer__number">${hours[1]}</span>
        <span>:</span>
        <span class="live-timer__number">${minutes[0]}</span>
        <span class="live-timer__number">${minutes[1]}</span>
        <span>:</span>
        <span class="live-timer__number">${seconds[0]}</span>
        <span class="live-timer__number">${seconds[1]}</span>
  `;
  }
};

if (timeDifferences > 0) {
  redirectSlice.style.display = "none";

  const remainingDays = Math.floor(timeDifferences / milliTimer.oneDay);
  const remainingHours = Math.floor(timeDifferences / milliTimer.oneHour);
  const remainingMinutes = Math.floor(timeDifferences / milliTimer.oneMinute);
  const remainingSeconds = Math.floor(timeDifferences / milliTimer.oneSecond);

  const timerValues = {
    absDays: remainingDays,
    absHours: Math.floor((timeDifferences - milliTimer.oneDay * remainingDays) / milliTimer.oneHour),
    absMinutes: Math.floor((timeDifferences - milliTimer.oneHour * remainingHours) / milliTimer.oneMinute),
    absSeconds: Math.floor((timeDifferences - milliTimer.oneMinute * remainingMinutes) / milliTimer.oneSecond),
    ended: false,
  };

  const backwardTimer = () => {
    timerValues.absSeconds--;

    if (timerValues.absSeconds < 0) {
      timerValues.absSeconds = 59;
      timerValues.absMinutes--;
    }
    if (timerValues.absMinutes < 0) {
      timerValues.absMinutes = 59;
      timerValues.absHours--;
    }
    if (timerValues.absHours < 0) {
      timerValues.absHours = 23;
      timerValues.absDays--;
    }
    if (timerValues.absDays < 0) {
      timerValues.ended = true;
    }

    showTimer(timerValues);
    if (!timerValues.ended) setTimeout(backwardTimer, 1000);
  };

  backwardTimer();
} else {
  timerSlice.style.display = "none";
}
