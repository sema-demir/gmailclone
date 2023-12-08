import { ele, renderMails } from '../scripts/ui.js';
import { mailData } from '../scripts/constants.js';



ele.menu.addEventListener('click', () => {
    ele.nav.classList.toggle('hide');

})


document.addEventListener('DOMContentLoaded', () => {
 renderMails(mailData)
});

