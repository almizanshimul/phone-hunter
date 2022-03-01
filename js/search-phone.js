/* ----------------
Find All Phone
----------------- */
const searchPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    const addValue = document.getElementById('search-value')
    addValue.innerText = searchText;
    searchField.value = '';

    if (searchText == '') {
        alert('Please enter a phone name')
    } else {
        // fetch data 
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayRsult(data.data.slice(0, 20)));

        document.getElementById('spinner').style.display = 'block';
        document.getElementById('search-result').textContent = '';

    }

};

/* ------------------------
Add product to display 
---------------------------- */

const displayRsult = phones => {
    if (!phones.length) {
        alert('Please enter a Valid Phone Name')
    } else {
        const resultRow = document.getElementById('search-result')
        resultRow.textContent = '';
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = ` <div class="card border-0 shadow">
                            <img src="${phone.image}" class="w-50 mx-auto my-4" alt="...">
                            <div class="card-body text-center">
                                <h6 class="card-title">${phone.brand}</h6>
                                <h5 class="card-title">${phone.phone_name}</h5>
                                <button class="btn btn-primary text-white my-3" type="button" id="btn-details" onclick="loadMoreDetails('${phone.slug}')">More details</button>
                            </div>
                         </div>
                         `;
            resultRow.appendChild(div);

        });

    }
    document.getElementById('signal-product').style.display = 'none';
    document.getElementById('spinner').style.display = 'none';
    /* 
    Show all button hide and show
     */
    if (phones.length > 20) {
        document.getElementById('show-all-product').style.display = 'none';
    } else {
        document.getElementById('show-all-product').style.display = 'inline-block';
    }


};

/* -----------------------
Signal Phone details
-------------------------- */

const loadMoreDetails = details => {
    const url = `https://openapi.programming-hero.com/api/phone/${details}`;
    fetch(url)
        .then(res => res.json())
        .then(data => addDetails(data.data))
}

const addDetails = (product) => {
    const signalProduct = document.getElementById('signal-product');
    console.log(product);
    signalProduct.style.display = 'block';
    signalProduct.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card', 'mx-auto', 'border-0', 'shadow', 'pos-rel')
    div.innerHTML = `<div class="row g-4 my-4  p-3">
                        <div class="col-lg-4 col-12 text-center">
                            <img src="${product.image}" class="w-75 mx-auto my-4 alt="...">
                        </div>
                        <div class="col-lg-8 col-12">
                        <!-- Product Details -->
                            <h2 class="text-primary">Product Details:</h2>
                            <h3 class="card-text">Name: ${product.name}</h3>
                            <p class="card-text fs-6 mb-1 text-black-50"><span class="fw-bold">Release Date: </span>${product.releaseDate ? product.releaseDate : 'No release date found'}</p>
                            <p class="card-text fs-6 mb-1 pos-ab">${product.brand}</p>
                            <img src='./img/close.png' class='details-close' onclick='detailsClose()'>
                        <!-- Main features -->
                            <h5 class="text-success my-2">Main features:</h5>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Storage: </span>${product.mainFeatures.storage}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Display Size: </span>${product.mainFeatures.displaySize}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Chip Set: </span>${product.mainFeatures.chipSet}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Memory: </span>${product.mainFeatures.memory}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Sensors: </span>${product.mainFeatures.sensors}</p>
                        <!-- Other Details -->
                            <h5 class="text-success my-2">Other Details:</h5>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">WLAN: </span>${product.others.WLAN ? product.others.WLAN : 'No'}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Bluetooth: </span>${product.others.Bluetooth ? product.others.Bluetooth : 'No'}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">GPS: </span>${product.others.GPS ? product.others.GPS : 'No'}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">NFC: </span>${product.others.NFC ? product.others.NFC : 'No'}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">Radio: </span>${product.others.Radio ? product.others.Radio : 'No'}</p>
                            <p class="card-text fs-6 mb-1"><span class="fw-bold">USB: </span>${product.others.USB ? product.others.USB : 'No'}</p>
                        </div>
    </div>
    `;
    signalProduct.appendChild(div);
};

/* ------------------------------------
signal Product Details Close button add
------------------------------------------  */
const detailsClose = () => {
    document.getElementById('signal-product').style.display = 'none';

}

/* -------------------------
Show all Product
------------------------ */
const showAllPhone = () => {
    const searchText = document.getElementById('search-value').innerText;
    // fetch data 
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayRsult(data.data));
};
// Call show all button 
const showAllProducts = () => {
    showAllPhone();
}