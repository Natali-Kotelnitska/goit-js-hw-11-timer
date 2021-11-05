class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalID = null;

    this.days = document.querySelector('[data-value="days"]');
    this.hours = document.querySelector('[data-value="hours"]');
    this.mins = document.querySelector('[data-value="mins"]');
    this.secs = document.querySelector('[data-value="secs"]');

    this.start();
    this.stop();
  }

  start() {
    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const timeDistance = this.targetDate - currentTime;
      const time = this.getTimeComponents(timeDistance);
      this.updateClockface(time);
    }, 1000);
  }

  stop() {
    if (this.timeDistance < 0) {
      clearInterval(this.intervalID);
      const time = this.getTimeComponents(0);
      console.log(time);
    }
  }
  // onClear = () => {
  //   this.stop();
  //   this.timeDistance = 0;
  //   this.currentTime = 0;
  //   this.getTimeComponents(this.timeDistance, this.selector);
  // };

  pad(value) {
    return String(value).padStart(2, '0');
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  updateClockface({ days, hours, mins, secs }) {
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.mins.textContent = `${mins}`;
    this.secs.textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Nov 5, 2021'),
});
