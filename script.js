
window.addEventListener('load', () => {

  
  generateResponse();
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
});


const OPENROUTER_API_KEY = "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";

const generateResponse = () => {
    const API_url = "https://openrouter.ai/api/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "meta-llama/llama-3.1-8b-instruct:free",
            "messages": [{"role": "user", "content": "Who is the current president of USA?"}]
        })
    }
    fetch(API_url, requestOptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
};

