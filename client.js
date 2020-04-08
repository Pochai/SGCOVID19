console.log('Hello World!');

const form = document.querySelector('form'); // grabbing an element on the page
//const errorElement = document.querySelector('.error-message');
const loadingElement = document.querySelector('.loading');
const mewsElement = document.querySelector('.cases');
const loadMoreElement = document.querySelector('#loadMore');
const API_URL = window.location.hostname === '127.0.0.1' ? 'https://sgcovid19.now.sh/v2/covid19' : 'https://sgcovid19.now.sh/v2/covid19';

let skip = 0;
let count = 0;
let limit = 20;
let loading = false;
let finished = false;

//errorElement.style.display = 'none';

document.addEventListener('scroll', () => {
  const rect = loadMoreElement.getBoundingClientRect();
  if (rect.top < window.innerHeight && !loading && !finished) {
    loadMore();
  }
});

listAllMews();






// form.addEventListener('submit', (event) => {
//   event.preventDefault();
//   const formData = new FormData(form);
//   const name = formData.get('name');
//   const content = formData.get('content');
//  const created = formData.get('created');
//   const targetlink = formData.get('targetlink');
//   if (name.trim() && content.trim()) {
//     errorElement.style.display = 'none';
//     form.style.display = 'none';
//     loadingElement.style.display = '';

//     const mew = {
//       name,
//       created,
//       content,
//       targetlink
//     };
    
//     fetch(API_URL, {
//       method: 'POST',
//       body: JSON.stringify(mew),
//       headers: {
//         'content-type': 'application/json'
//       }
//     }).then(response => {      
//       if (!response.ok) {
//         const contentType = response.headers.get('content-type');
//         if (contentType.includes('json')) {
//           return response.json().then(error => Promise.reject(error.message));
//         } else {
//           return response.text().then(message => Promise.reject(message));
//         }
//       }
//     }).then(() => {
//       form.reset();
//       setTimeout(() => {
//         form.style.display = '';
//       }, 30000);
//       listAllMews();
//     }).catch(errorMessage => {
//       form.style.display = '';
//       errorElement.textContent = errorMessage;
//       errorElement.style.display = '';
//       loadingElement.style.display = 'none';
//     });
//   } else {
//     errorElement.textContent = 'Name and content are required!';
//     errorElement.style.display = '';
//   }
// });

function loadMore() {
  skip += limit;
  listAllMews(false);
}

function listAllMews(reset = true) {
  loading = true;
  if (reset) {
    mewsElement.innerHTML = '';
    skip = 0;
    finished = false;
  }
  fetch(`${API_URL}?skip=${skip}&limit=${limit}`)
    .then(response => response.json())
    .then(result => {

      const ul = document.createElement('ul');
      ul.className='responsive-table';
      result.covid19.forEach(mew => {
        
        const div = document.createElement('li');
        div.className='table-row';

      

        const div1 = document.createElement('li');
        div1.className='table-header';
        if (count==0) {
        //  tbl.appendChild(div);
          const col1 = document.createElement('div');
          col1.textContent = 'Case';
          col1.className='col col-1';
        const col2 = document.createElement('div');
        col2.textContent = 'DATE';
        col2.className='col col-2';
        const col3 = document.createElement('div');
        col3.textContent = 'Hospital';
        col3.className='col col-3';
        const col4 = document.createElement('div');
        col4.textContent = 'AGE';
        col4.className='col col-4';
        const col5 = document.createElement('div');
        col5.textContent = 'GENDER';
        col5.className='col col-5';
        const col6 = document.createElement('div');
        col6.textContent = 'NATIONALITY';
        col6.className='col col-6';
        const col7 = document.createElement('div');
        col7.textContent = 'ORIGIN';
        col7.className='col col-7';
        const col8 = document.createElement('div');
        col8.textContent = 'EXPOSURE';
        col8.className='col col-8';
        const col9 = document.createElement('div');
        col9.textContent = 'LINKS';
        col9.className='col col-9';
        const col10 = document.createElement('div');
        col10.textContent = 'CLUSTER';
        col10.className='col col-10';
      //  tbl.appendChild(div1);
        div1.appendChild(col1);
        div1.appendChild(col2);
        div1.appendChild(col3);
        div1.appendChild(col4);
        div1.appendChild(col5);
        div1.appendChild(col6);
        div1.appendChild(col7);
        div1.appendChild(col8);
        div1.appendChild(col9);
        div1.appendChild(col10);
          ul.appendChild(div1);
       // mewsElement.appendChild(tbl);
        } 
       
        count++;

        const header = document.createElement('div');
        header.textContent = mew.CASE;
        header.setAttribute('data-label','CASE');
        header.className='col col-1';

        const contents = document.createElement('div');
        contents.textContent = mew.CONFIRMED_DT;
        contents.setAttribute('data-label','CONFIRMED DATE');
        contents.className='col col-2';
        const image = document.createElement('div');
        image.textContent =mew.HA;
        image.setAttribute('data-label','HOSPITAL');
        image.className='col col-3';

        const date = document.createElement('div');
        date.textContent =mew.AGE;
        date.setAttribute('data-label','AGE');
        date.className='col col-4';

        const gender = document.createElement('div');
        gender.textContent =mew.GENDER;
        gender.setAttribute('data-label','GENDER');
        gender.className='col col-5';
        
        const nationality = document.createElement('div');
        nationality.textContent =mew.NATIONALITY;
        nationality.setAttribute('data-label','NATIONALITY');
        nationality.className='col col-6';


        const history = document.createElement('div');
        history.textContent =mew.HISTORY;
        history.setAttribute('data-label','HISTORY');
        history.className='col col-7';

        const exposure = document.createElement('div');
        exposure.textContent =mew.EXPOSURE;
        exposure.setAttribute('data-label','EXPOSURE');
        exposure.className='col col-8';

        const links = document.createElement('div');
        links.textContent =mew.LINKS;
        links.setAttribute('data-label','LINKS');
        links.className='col col-9';

        const cluster = document.createElement('div');
        cluster.textContent =mew.CLUSTER;
        cluster.setAttribute('data-label','CLUSTER');
        cluster.className='col col-10';


      //   const date = document.createElement('div');
      //  // date.textContent = new Date(mew.CONFIRMED_DT).toString().split(" ").slice(0, 4).join(" ");
      //  date.textContent = mew.CONFIRMED_DT.toString().split(" ").slice(0, 4).join(" ");
      //   date.className='col col-4';
       
        div.appendChild(header);
        div.appendChild(contents);
        div.appendChild(image);
        div.appendChild(date);
        div.appendChild(gender);
        div.appendChild(nationality);
        div.appendChild(history);
        div.appendChild(exposure);
        div.appendChild(links);
        div.appendChild(cluster);
        const tbl1 = document.createElement('ul');
        
       // mewsElement.appendChild(div);
      
        
        ul.appendChild(div);
        
        
          mewsElement.appendChild(ul);
      
        //mewsElement.appendChild(tbl);
        if (count==15) {
         //  mewsElement.appendChild(tbl);
         // document.write(count);
         }
         
        
      });
      
      loadingElement.style.display = 'none';
      if (!result.meta.has_more) {
        loadMoreElement.style.visibility = 'hidden';
        finished = true;
      } else {
        loadMoreElement.style.visibility = 'visible';
      }
      loading = false;
    });
}