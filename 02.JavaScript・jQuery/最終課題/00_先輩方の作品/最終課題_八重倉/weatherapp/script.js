const apiKey = "0ff2fefbcad529d8173078e08b7f7eee"; 
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value;
  if (city) {
    getWeather(city);
  }
});

// 入力欄（cityInput）でキーボードが押された時の処理
cityInput.addEventListener("keypress", (event) => {
  // 押されたキーが「Enter」だった場合のみ実行
  if (event.key === "Enter") {
    const city = cityInput.value;
    if (city) {
      getWeather(city);
    }
  }
});

async function getWeather(city) {
  // 漢字などの日本語をURLで正しく送れる形式に変換します
  const encodedCity = encodeURIComponent(city);
  
  // 末尾に「,jp」を付けて、日本の都市であることを明示します
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity},jp&appid=${apiKey}&units=metric&lang=ja`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // 404エラー（都市名の間違い）などの判定をより正確にします
    if (data.cod !== 200) {
      showError();
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error("通信エラー:", error);
    showError();
  }
}

function displayWeather(data) {
  document.getElementById("weather-result").classList.remove("hidden");
  document.getElementById("error-msg").classList.add("hidden");

  document.getElementById("city-name").textContent = cityInput.value;
  document.getElementById("temp").textContent =
    `${Math.round(data.main.temp)}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description;
  document.getElementById("humidity").textContent =
    `湿度: ${data.main.humidity}%`;

  // 天気アイコンの設定
  const icon = data.weather[0].icon;
  document.getElementById("weather-icon").innerHTML =
    `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">`;
}

function showError() {
  document.getElementById("weather-result").classList.add("hidden");
  document.getElementById("error-msg").classList.remove("hidden");
}
