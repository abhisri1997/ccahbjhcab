function LiveClock() {
  this.clearLiveClockId;

  this.liveClock = (startTime, element) => {
    let currentTime = new Date();
    const [hours, minutes, seconds] = startTime.split(":");

    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
    currentTime.setSeconds(seconds);

    let liveClockID = setInterval(() => {
      currentTime.setSeconds(currentTime.getSeconds() + 1);

      let hh = currentTime.getHours();
      let mm = currentTime.getMinutes();
      let ss = currentTime.getSeconds();

      this.setLiveClock(hh, mm, ss, element);
    }, 1000);
    this.setLiveClockId(liveClockID);
  };

  this.setLiveClock = (hh, mm, ss, element) => {
    if (hh == 0) {
      hh = 12;
    }
    if (hh > 12) {
      hh = hh - 12;
    }

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    switch (element.id.split("-")[0]) {
      case "top":
        element.querySelector(".city-time").innerHTML = hh + ":" + mm;
        element.querySelector(".city-second").innerHTML = ":" + ss;
        break;
      case "mid":
        element.innerHTML =
          hh + ":" + mm + " " + element.innerHTML.split(" ")[1];
        break;
      case "bottom":
        element.innerHTML =
          hh + ":" + mm + " " + element.innerHTML.split(" ")[1];
        break;
      default:
        console.error("Invalid element id: " + element.id);
    }
  };

  this.setLiveClockId = (id) => {
    this.clearLiveClockId = id;
  };

  this.getLiveClockId = () => {
    return this.getLiveClockId();
  };

  this.clearLiveClock = () => {
    clearInterval(this.clearLiveClockId);
  };
}

export default LiveClock;
