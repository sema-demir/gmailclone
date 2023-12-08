
//Html den cagırılan elemanlar
export const ele = {
    menu: document.querySelector('#menu'),
    nav: document.querySelector('nav'),
    mailsArea: document.querySelector(".mails")
}
export const renderMails = (mailData) => {
   const mail_html = mailData.map((mail) =>{ 
    return`<div class="mail">
    <div class="info">
      <input type="checkbox" />
      <i class="bi bi-star-fill"></i>
      <b>${mail.sender}</b>
    </div>

    <div class="content">
      <p class="title">${mail.title}</p>
      <p class="desc">${mail.message}</p>
    </div>
    <p class="time">${mail.date}</p>
    <button>Sil</button>
  </div>`;

    });
    ele.mailsArea.innerHTML = mail_html.join(' ')
};