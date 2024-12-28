const loadPhone = async (searchInnerText = '13',isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchInnerText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayLoadedPhone(phones,isShowAll);
};
loadPhone();

const handleSearchButton = (isShowAll) => {

  loadingSpinner(true);
  const searchPhone = document.getElementById("search-phone");
  const searchInnerText = searchPhone.value;

  loadPhone(searchInnerText,isShowAll);
  
};

const handleShowAllButton = () => {
    handleSearchButton(true)
    
    
  
};

const loadingSpinner = (isLoading) => {
  const loading = document.getElementById("loading-spinner");
  if (isLoading) {
    
    loading.classList.remove("hidden");
  } else {
    loading.classList.add("hidden");
  }
};

const displayLoadedPhone = (phones,isShowAll) => {
  


  const showAll = document.getElementById('show-all')
  const phone = phones.length;
  
  if (phone > 12) {
    showAll.classList.remove('hidden')
  }
  else{
    showAll.classList.add('hidden')
  }

  
  if(!isShowAll){
    phones = phones.slice(0,12)
  }
  else{
    showAll.classList.add('hidden')
  }

  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = '';

  const notFound = document.getElementById('not-found')
  notFound.textContent = '';
  if (phone === 0) {
    showAll.classList.add('hidden'); 
    
    const notFoundCard = document.createElement('div');
    notFoundCard.innerHTML = `
    <p class="text-center text-red-500 text-xl font-bold">No phone found</p>
    `;
    notFound.appendChild(notFoundCard)
    loadingSpinner(false); 
    return; 
  }
  phones.forEach((phone) => {
    
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-base-100 shadow-xl`;
    phoneCard.innerHTML = `
           <figure>
              <img
                src="${phone.image}"
                alt="Phones"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p class="font-bold">Brand: ${phone.brand}</p>
              <div class="card-actions justify-center">
                <button onclick ="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
              </div>
            </div>
    `;
    phoneContainer.appendChild(phoneCard);
  });
  loadingSpinner(false);
 
};

const handleShowDetails = async(id)=>{
  show_details_modal.showModal()
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
   const data = await res.json();
   const targetPhone = data.data;
   console.log(targetPhone)
   
   const phoneDetailsContainer = document.getElementById('show-details');
   const phoneDetailsCard = document.createElement('div');
   phoneDetailsCard.innerHTML = `

   <img src="${targetPhone.image}" />
   <h1 class="text-2xl">${targetPhone.name}</h1>
   <p><span class="text-xl font-medium">Released_date:</span>${targetPhone.releaseDate}</p>
   <p><span class="text-xl font-medium">Brand:</span> ${targetPhone.brand}</p>
   <p><span class="text-xl font-medium">Display:</span> ${targetPhone?.mainFeatures?.displaySize}</p>
   <p><span class="text-xl font-medium">Storage:</span> ${targetPhone?.mainFeatures?.memory}</p>
   <p><span class="text-xl font-medium">Processor:</span> ${targetPhone?.mainFeatures?.chipSet}</p>
   <p><span class="text-xl font-medium">Bluetooth:</span> ${targetPhone?.others?.Bluetooth || 'Not Available'}</p>
   <p><span class="text-xl font-medium">Gps:</span> ${targetPhone?.others?.GPS || 'Not Available'}</p>
   <p><span class="text-xl font-medium">Nfc:</span> ${targetPhone?.others?.NFC || 'Not Available'}</p>
   <p><span class="text-xl font-medium">Radio:</span> ${targetPhone?.others?.Radio || 'Not Available'}</p>
   <p><span class="text-xl font-medium">USB:</span> ${targetPhone?.others?.USB || 'Not Available'}</p>
   <p><span class="text-xl font-medium">WLAN:</span> ${targetPhone?.others?.WLAN || 'Not Available'}</p>
   `
   phoneDetailsContainer.appendChild(phoneDetailsCard);
}

