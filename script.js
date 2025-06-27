const sheetID = "1srwCRcCf_grbInfDSURVzXXRqIqxQ6_IIPG-4_gnSY8";
const sheetName = "LIVE";
const query = "select AE, AO, AF, AH, AI, AK, AJ";
const sheetURL = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&tq=${encodeURIComponent(query)}`;

const leftGrouping = document.getElementById("leftGrouping");
const rightGrouping = document.getElementById("rightGrouping");
const toggleBtn = document.getElementById("toggleBtn");

async function fetchAndDisplayData() {
  try {
    const response = await fetch(sheetURL);
    const text = await response.text();
    const json = JSON.parse(text.substring(47).slice(0, -2));
    const rows = json.table.rows;

    leftGrouping.innerHTML = '';
    rightGrouping.innerHTML = '';

    rows.forEach((row, index) => {
      const teamPosition = row.c[0]?.v || 'N/A';
      const teamLogo = row.c[1]?.v || '';
      const teamName = row.c[2]?.v || 'Unknown';
      const teamPlacePoints = row.c[3]?.v || '0';
      const teamElims = row.c[4]?.v || '0';
      const teamTotal = row.c[5]?.v || '0';
      const teamChickenDinner = row.c[6]?.v || '0';

      const teamBraket = document.createElement('div');
      teamBraket.classList.add('teamBraket');
      teamBraket.innerHTML = `
        <div class="teamPositionWrapper"><p class="teamPosition">${teamPosition}</p></div>
        <div class="teamLogoWrapper">
          <img class="teamLogo" style="display: ${teamLogo ? 'block' : 'none'}" src="${teamLogo}" alt="${teamName} Logo" onerror="this.onerror=null; this.src='default-logo.png';">
          <p class="teamName">${teamName}</p>
        </div>
        <div class="teamPlacePointsWrapper"><p class="teamPlacePoints">${teamPlacePoints}</p></div>
        <div class="teamElimsWrapper"><p class="teamElims">${teamElims}</p></div>
        <div class="teamTotalWrapper">
          <p class="teamTotal">${teamTotal}</p>
          <div class="teamChickenDinnerWrapper">
            <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 22" width="36" height="22">
                 <path fill-rule="evenodd" class="teamChickenDinnerIMG" d="m32 21.5h-28.5c-1.8 0-3.3-1.4-3.3-3.2 0-0.4 0.3-0.6 0.6-0.6 0.3 0 0.6 0.2 0.6 0.6 0 1.1 0.9 2 2.1 2h28.5c1.2 0 2.1-0.9 2.1-2 0-0.4 0.3-0.6 0.6-0.6 0.3 0 0.6 0.2 0.6 0.6 0 1.8-1.5 3.2-3.3 3.2zm-28.3-5.2q0 0 0 0c0-7 6.1-12.5 13.6-12.5 2.4 0 4.6 0.6 6.5 1.5q0.9-0.2 1.8-0.4 0 0 0.1 0 0.1 0 0.2 0 0.1 0 0.1 0 0 0 0 0 0.1-0.1 0.1-0.1 0 0 0.1 0 0 0 0 0 0.1 0 0.1 0 0 0 0.1-0.1 0 0 0 0 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0 0.1 0 0 0 0.1 0 0 0 0 0 0.1 0 0 0.1 0 0.1 0 0 0 0 0 0.1 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0 0 0 0 0 0.1 0 0 0 0 0.1 0 0.1-0.1 0 0 0 0 0 0 0 0.1 0 0-0.1 0.1 0 0 0 0.1 0 0.1-0.1 0.2 0 0 0 0.1 0 0 0 0.1 0 0-0.1 0 0 0.1 0 0.2 0 0 0 0-0.1 0.2-0.2 0.3c-0.7 1.6-1.8 3.1-2.9 4-0.9 0.7-2 1.1-3.1 1.2q-0.2 0-0.4 0c-4.1 0-5-3.3-5-3.3 0 0-0.1 4.2 5 4.2q0.2 0 0.4 0c1.3-0.1 2.6-0.6 3.7-1.4 1-0.8 2.1-2.2 2.9-3.7 0.7 1.5 1.1 3.2 1.1 5q0 0 0 0 0 1.9-1.3 3.3h-24.6c-0.9-1-1.4-2.1-1.4-3.3zm24.9-10.7c0 0.1 0.1 0.4 0.4 0.7 0.2 0.2 0.3 0.4 0.5 0.4l3-2.4c0 0 0.8 0.8 1.4 0.5 0.3-0.3 0.4-0.7 0.1-1-0.3-0.4-1.4-0.4-1.4-0.4 0 0 0.3-0.9-0.1-1.5q-0.1-0.2-0.4-0.2-0.3 0-0.5 0.1c-0.6 0.5-0.1 1.4-0.1 1.4z"></path>
            </svg>
            <p class="teamChickeDinner">x${teamChickenDinner}</p>
          </div>
        </div>
      `;

      if (index < 8) {
        teamBraket.style.animationDelay = `${index * 100}ms`;
        leftGrouping.appendChild(teamBraket);
      } else if (index < 16) {
        const i = index - 8;
        teamBraket.style.animationDelay = `${i * 100}ms`;
        rightGrouping.appendChild(teamBraket);
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchAndDisplayData();
setInterval(fetchAndDisplayData, 5000);

// Toggle Button Logic
toggleBtn.addEventListener("click", () => {
  const isHidden = leftGrouping.classList.contains("hidden") || rightGrouping.classList.contains("hidden");

  if (isHidden) {
    // Show
    [leftGrouping, rightGrouping].forEach(group => {
      group.classList.remove("hidden");
      const items = group.querySelectorAll('.teamBraket');
      items.forEach((item, i) => {
        item.style.opacity = "0";
        item.classList.remove("animate-fade-in");
        void item.offsetWidth;
        item.style.animationDelay = `${i * 100}ms`;
        item.classList.add("animate-fade-in");
      });
    });
    toggleBtn.textContent = "Hide";
  } else {
    // Hide
    leftGrouping.classList.add("hidden");
    rightGrouping.classList.add("hidden");
    toggleBtn.textContent = "Show";
  }
});
