// Create event handlers when page is loaded
document.addEventListener("DOMContentLoaded", function(e) {
    // Selected index of item (when -1 - nothing selected)
    let selectedItemIdx = -1

    // Create event handler for selecting item in list
    let items = document.querySelector('.form--record--list')
    items.addEventListener('click', function (e) {
        selectedItemIdx = e.target.id
        selectItem()
    })

    // Creating event handler for click on delete button
    document.querySelector('.btn--delete').addEventListener('click', function(e) {
        // If we didn't select item - do nothing
        if (selectedItemIdx !== - 1) {
            let items = Array.from(document.querySelectorAll('.form--list--item'))
            // Deleting array element
            items.splice(selectedItemIdx,1)
            // Rewriting records
            document.querySelector('.form--record--list').innerHTML = ''
            for (let idx = 0; idx < items.length; idx++) {
                items[idx].id = idx
                document.querySelector('.form--record--list').innerHTML += items[idx].outerHTML
            }
            // Unselecting item
            selectedItemIdx = -1
        }
    })

    // Creating event handler for click on add button
    document.querySelector('.btn--add').addEventListener('click', function(e) {
        // Getting text from input field
        let inputRecord = document.querySelector('.inp--record').value
        // Matching value on correct pattern (key=value), else - outputting message
        // String matches by next pattern - start of text, some amount of letters of digits, symbol =, some amount of letters of digits and end of string
        let matches = inputRecord.match(/^[a-zA-Z0-9]+=[a-zA-Z0-9]+$/)
        if (matches != null && matches.length === 1) {
            // Adding record and clearing input field
            addRecord(inputRecord)
            document.querySelector('.inp--record').value = ''
        } else {
            alert('Incorrect record. It should be like "key=value"')
        }
    })

    // Creating event handler for click on sort by name button
    document.querySelector('.btn--sort--by--name').addEventListener('click', function(e) {
        let items = Array.from(document.querySelectorAll('.form--list--item'))
        // Sorting by key (key has index 0, value - 1, because the string key=value splittings on 2-element array [key, value])
        items.sort(sortBy(0))
        // Rewriting records
        refreshRecord(items)
        // Unselecting item
        selectedItemIdx = -1
        selectItem()
    })

    // Creating event handler for click on sort by value button
    document.querySelector('.btn--sort--by--value').addEventListener('click', function(e) {
        let items = Array.from(document.querySelectorAll('.form--list--item'))
        // Sorting by key (key has index 0, value - 1, because the string key=value splittings on 2-element array [key, value])
        items.sort(sortBy(1))
        // Rewriting records
        refreshRecord(items)
        // Unselecting item
        selectedItemIdx = -1
        selectItem()
    })

    // Function that clears list of records and writes new list
    function refreshRecord(records) {
        document.querySelector('.form--record--list').innerHTML = ''
        for (let idx = 0; idx < records.length; idx++) {
            records[idx].id = idx
            document.querySelector('.form--record--list').innerHTML += records[idx].outerHTML
        }
    }

    // Function that selects item (setting background color and color for items)
    function selectItem() {
        let items = document.querySelectorAll('.form--list--item')
        for (let idx = 0; idx < items.length; idx++) {
            if (idx === parseInt(selectedItemIdx)) {
                items.item(idx).style['backgroundColor'] = 'gray'
                items.item(idx).style['color'] = 'white'
            } else {
                items.item(idx).style['backgroundColor'] = 'white'
                items.item(idx).style['color'] = 'black'

            }
        }
    }

    // Function that concatenates new record (HTML markup) to other records
    function addRecord(record) {
        let itemsLength = Array.from(document.querySelectorAll('.form--list--item')).length
        let formattedRecord = `<div class="form--list--item" id="${itemsLength}">${record}</div>`
        document.querySelector('.form--record--list').innerHTML += formattedRecord
    }

    // Compare function for sorting records, returns compare function by chosen field
    function sortBy(idx) {
        return (a,b) => {
            let splitedA = a.textContent.split('=')
            let splitedB = b.textContent.split('=')
            if (splitedA[idx] < splitedB[idx]) {
                return -1
            } else {
                return 0
            }
        }
    }

});

