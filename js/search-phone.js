// Find All Phone 
const searchPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    searchField.value = '';

    if (searchText == '') {
        alert('Please enter a phone name')
    } else {
        // fetch data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayRsult(data.data))
    }

}

const displayRsult = phones => {
    const resultRow = document.getElementById('search-result')
    resultRow.textContent = '';
    phones.forEach(phone => {
        // console.log(phones.length);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = ` <div class="card border-0 shadow">
                            <img src="${phone.image}" class="w-50 mx-auto my-4" alt="...">
                            <div class="card-body text-center">
                                <h6 class="card-title">${phone.brand}</h6>
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <button class="btn btn-primary text-white my-3" type="button" id="btn-details" onclick="loadMoreDetails('${phone.slug}')">More details</button>
                            </div>
                         </div>`;
        resultRow.appendChild(div);
        document.getElementById('signal-product').style.display = 'none';
    });
};

// Signal Phone details 


const loadMoreDetails = details => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => addDetails(data.data))
}

const addDetails = (product) => {
    console.log(product);
    const signalProduct = document.getElementById('signal-product');
    signalProduct.style.display = 'block';
    signalProduct.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto', 'border-0', 'shadow')
    div.innerHTML = `<div class="row g-4 my-4">
                        <div class="col-4 text-center">
                            <img src="${product.image}" class="w-75 mx-auto my-4 alt="...">
                        </div>
                        <div class="col-8 pos-rel">
                        <!-- Product Details -->
                            <h2 class="text-primary">Product Details:</h2>
                            <h3 class="card-text">Name: ${product.name}</h3>
                            <p class="card-text fs-6 mb-1 text-black-50"><span class="fw-bold">Release Date: </span>${product.releaseDate ? product.releaseDate : 'No release date found'}</p>
                            <p class="card-text fs-6 mb-1 pos-ab">${product.brand}</p>
                       
    </div>`;
    signalProduct.appendChild(div);
};