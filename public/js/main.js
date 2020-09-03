document.getElementById('search').addEventListener("click", () => {
    const searchKey = (document.getElementById('s_input').value || '').toLowerCase();
    console.log('Store List: ', storeList, searchKey === '');
    const results = document.getElementById('results');
    if(searchKey === '') {
        results.innerHTML = '';
        results.parentNode.replaceChild(results.cloneNode(false), results)
        return;
    }
    const filteredList = storeList.data.map(store => {
        store_copy = {...store, medicines: [...store.medicines]};
        store_copy.medicines = store_copy.medicines.filter(medicine => {
            return medicine.name.toLowerCase().includes(searchKey);
        })
        return store_copy;
    }).filter(store => store.medicines.length > 0);
    console.log(filteredList)
    results.innerHTML = '';
    filteredList.forEach(store => {
        console.log('Gets here: ', store)
        results.innerHTML = '<h5 style="width: 100%>Search Results: </h5>'
        results.innerHTML = results.innerHTML + `
        <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Medicine Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Address</th>
                <th scope="col">Store Id</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            ${
                store.medicines.map((medicine, idx) => `
                <tr>
                    <td scope="col">${idx + 1}</td>
                    <td scope="col">${medicine.name}</td>
                    <td scope="col">${medicine.quantity}</td>
                    <td scope="col">${store.location.formattedAddress}</td>
                    <td scope="col">${store.storeId}</td>
                    <td scope="col"><button type="button" class="btn btn-danger">Add to Cart</button></td>
                </tr>
                `)
            }
        </tbody>
        </table>
        `
})
})

function searchMedicine(value) {
    
}