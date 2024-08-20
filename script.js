window.addEventListener('load', () => {

    const test = document.querySelector('.home_btn');
    const tab_switchers = document.querySelectorAll('[data-switcher]');
  
    for (let i = 0; i < tab_switchers.length; i++) {
      const tab_switcher = tab_switchers[i];
      const page_id = tab_switcher.dataset.tab;
  
      tab_switcher.addEventListener('click', () => {
      
        test.classList.remove('is-active'); 
        tab_switcher.parentNode.classList.add('is-active'); 
        SwitchPage(page_id);
          
      });
    }
    function SwitchPage (page_id) {
        console.log(page_id);
  
        const current_page = document.querySelector('.pages .page.is-active');
        current_page.classList.remove('is-active');
        current_page.setAttribute('hidden', "");
        const next_page = document.querySelector(`.pages .page[data-page="${page_id}"]`);
        next_page.classList.add('is-active');
        next_page.removeAttribute('hidden');
    }
})