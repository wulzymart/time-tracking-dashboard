fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    const timeCards = document.querySelector(".time-cards");
    const times = document.querySelectorAll(".time");
    let timeOption = "daily";
    document
      .querySelector(`.${timeOption}`)
      .classList.add("text-white", "font-normal");

    render(timeOption);
    document.querySelector(".time-options").addEventListener("click", (e) => {
      e.preventDefault();
      times.forEach((time) => {
        time.classList.remove("text-white", "font-normal");
      });
      const clicked = e.target.classList;
      clicked.contains("daily") && (timeOption = "daily");
      clicked.contains("weekly") && (timeOption = "weekly");
      clicked.contains("monthly") && (timeOption = "monthly");
      clicked.add("text-white", "font-normal");
      timeCards.innerHTML = "";
      render(timeOption);
    });
    function render(options) {
      data.forEach((timeStamp) => {
        const clsNme = timeStamp.title.includes(" ")
          ? timeStamp.title.split(" ").join("-").toLowerCase()
          : timeStamp.title.toLowerCase();
        const html = `<div class="time-card w-full h-52 sm:h-60 rounded-xl ${clsNme} relative">
      <div
        class="details bg-[#1C1F4A] hover:bg-[#6F76C8] w-full px-10 py-8 rounded-xl absolute bottom-[-1px]"
      >
        <div class="heading flex justify-between items-center">
          <h1 class="text-white font-medium text-2xl">${timeStamp.title}</h1>
          <img
            class="sm:opacity-50 hover:opacity-100"
            src="images/icon-ellipsis.svg"
            alt=""
          />
        </div>
        <div
          class="time-spent mt-4 flex sm:flex-col justify-between items-cente sm:items-start"
        >
          <h1 class="text-white text-3xl sm:text-4xl font-normal">${
            timeStamp.timeframes[options].current
          }hrs</h1>
          <p class="text-[#BDC1FF]">${
            options === "daily"
              ? "Yesterday"
              : options === "weekly"
              ? "Last Week"
              : "Last Month"
          } - <span>${timeStamp.timeframes[options].previous}hrs</span></p>
        </div>
      </div>
    </div>`;
        timeCards.insertAdjacentHTML("beforeend", html);
      });
    }
  });
