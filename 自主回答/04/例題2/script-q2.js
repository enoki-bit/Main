document.addEventListener("DOMContentLoaded", function () {
  alert("HTMLの読み込みが完了しました");

  const input1 = document.getElementById("txt_1");
  const input2 = document.getElementById("txt_2");
  const select = document.getElementById("sel_5");
  const button = document.getElementById("ft_btn");

  input1.addEventListener("blur", function () {
    alert("入力項目1からフォーカスが離れました");
  });

  // input2.addEventListener("input", function () {
  //   if (input2.value.endsWith("a")) {
  //     alert("[a]が入力されました");
  //   }
  // });

  input2.addEventListener("input", function (e) {
    if (e.data === "a") {
      alert("[a]が入力されました");
    }
  });

  // input2.addEventListener("input", function () {
  //   if (input2.value === "a") {
  //     alert("[a]が入力されました");
  //   }
  // });

  select.addEventListener("change", function () {
    alert("入力項目5が選択されました");
  });

  button.addEventListener("click", function () {
    alert("ボタンがクリックされました");
  });
});
