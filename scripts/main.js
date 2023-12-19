import { ele, renderMails, toggleModal } from "../scripts/ui.js";
import { getDate } from "../scripts/helpers.js";

const strMails = localStorage.getItem("mails") || [];
let mailData = JSON.parse(strMails);
//navbar gizleme
ele.menu.addEventListener("click", () => {
  ele.nav.classList.toggle("hide");
});

//mail listeleme
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailData);

  if (window.innerWidth < 1200) {
    ele.nav.classList.add("hide");
  }
});

//3.modal acma kapama
ele.createBtn.addEventListener("click", () => toggleModal(true));
ele.closeBtn.addEventListener("click", () => toggleModal(false));

ele.modal.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-wrapper")) {
    toggleModal(false);
  }
});

//4) mail atma özelliği

ele.modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const receiver = e.target[1].value;
  const title = e.target[2].value;
  const message = e.target[3].value;
  //egerki inputlar bossa uyarı ver
  if (!receiver || !title || !message) {
    alert("Lütfen boş Alanları doldurun");
  } else {
    const newMail = {
      id: new Date().getTime(),
      sender: "Sema",
      receiver: receiver,
      title: title,
      message: message,
      date: getDate(),
    };
    //yeni mail ekleme
    mailData.unshift(newMail);

    //mailler dizisinin son halini local-stroge e kaydet
    localStorage.setItem("mails", JSON.stringify(mailData));

    //mailler dizisinin son hali
    renderMails(mailData);

    //modalı kapat
    toggleModal(false);
  }
});
const handleClick = (e) => {
  const mail = e.target.closest(".mail");
  const mailId = mail.dataset.id;

  console.log(mailId);
  //tıklanan elemanın İd si delete ise maili sil
  if (e.target.id === "delete" && confirm("Maili Silmek İstiyormusunuz")) {
    //id si sileceğimiz eleman esit olmayan elemenları filterele
    mailData = mailData.filter((mail) => mail.id !== Number(mailId));

    //lokali güncelle
    localStorage.setItem("mails", JSON.stringify(mailData));

    //maili htmlden kaldır
    mail.remove();
  }
  //tıklanan eleman yıldız ise maili like'la
  if (e.target.id === "star") {
    // id sini bildiğimiz mailin bütün bilgilerini al
    const found = mailData.find((item) => item.id === Number(mailId));
    //objenin is_stared
    found.isStared = !found.isStared;

    localStorage.setItem("mails", JSON.stringify(mailData));

    //arayüzü güncelle
    renderMails(mailData);
  }
};

ele.mailsArea.addEventListener("click", handleClick);
//navigasyon alanı
ele.nav.addEventListener("click", (e) => {
  if (e.target.id === "cat2") {
    const filtred = mailData.filter((mail) => mail.isStared === true);
    renderMails(filtred);
  } else {
    renderMails(mailData);
  }
});

//aratma özelliği
let timer;
ele.searchInp.addEventListener("input", (e) => {
  const query = e.target.value;

  clearTimeout(timer)
    timer = setTimeout(() =>  searchMail(e), 400)
   
  });

  function searchMail(e) {

    const query = e.target.value;

    const filtred = mailData.filter((mail) =>

      Object.values(mail)
        .slice(1, 6)
        .some((value) => value.toLowerCase().includes(query))
    );

    //mail.title.toLowerCase().includes(query.toLowerCase()) baslık üzerinden aratma yapmak istersek

    if (filtred.length === 0) {
      ele.mailsArea.innerHTML = //dizide eleman yoksa uyarı ver
        '<div class= "warn">Aradığınız  Mail Bulunamadı</div>';
    } else {
      renderMails(filtred); //filterelenenleri ekrana bas
    }
  }