const monthStrings = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const filterOverlay = ( type, column, data ) => {
    let overlay = document.createElement( 'form' );
    let overlayInner = document.createElement( 'div' );
    let overlayHeader = document.createElement( 'div' );
    let overlayFooter = document.createElement( 'div' );
    overlayInner.className = 'filterOverlay-content pt-3 pb-3';
    overlayHeader.className = 'filterOverlay-header';
    overlayFooter.className = 'filterOverlay-footer';
    overlay.className = 'filterOverlay shadow-xl absolute p-6 bg-white';
    overlay.style.zIndex = '1000';

    if ( type === 'number' ) {

        overlayInner.innerHTML = `
                <div>
                    <small class="mb-2 block">This doesn't actually work, it's just for illustration.</small>
                  <div>
                      <input type="radio" id="huey" name="next_date_option" value="date" checked>
                      <label for="huey">Exactly</label>
                  </div>
                  <div class="block pl-3 pt-2 pb-2 js-date-single">
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="text" value="">
                  </div>
                </div>

                <div>
                  <div>
                      <input type="radio" id="dewey" name="next_date_option" value="between">
                      <label for="dewey">Contains</label>
                  </div>
                  <div class="block pl-3 pt-2 pb-2 js-date-multi hidden">
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="text" value="">
                  </div>
                </div>`;

    } else if ( type === 'text' ) {
        if ( column === 'id' ) {
            column = 'ID';
        }
        overlayInner.innerHTML = `
                <div>
                    <small class="mb-2 block">This doesn't actually work, it's just for illustration.</small>
                  <div>
                      <input type="radio" id="huey" name="next_date_option" value="date" checked>
                      <label for="huey">Exactly</label>
                  </div>
                  <div class="block pl-3 pt-2 pb-2 js-date-single">
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="text" value="">
                  </div>
                </div>

                <div>
                  <div>
                      <input type="radio" id="dewey" name="next_date_option" value="between">
                      <label for="dewey">Contains</label>
                  </div>
                  <div class="block pl-3 pt-2 pb-2 js-date-multi hidden">
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="text" value="">
                  </div>
                </div>`;

    } else if ( type === 'select' ) {
        let options = '<option>Select an option</option>'
        data.forEach( ( item ) => {
            options += `<option value="${item}">${item}</option>`;
        })

        overlayInner.innerHTML = `<select class="w-full border border-solid border-gray-200 text-gray-800 rounded" name="${column.toLowerCase().split(" ").join("_")}" id="${column.toLowerCase().split(" ").join("_")}">${options}</select>`
    } else if ( type === 'date' ) {
        overlayInner.innerHTML = `
                <div>
                    <small class="mb-2 block">This doesn't actually work, it's just for illustration.</small>
                  <div>
                      <input type="radio" id="huey" name="next_date_option" value="date" checked>
                      <label for="dewey">Date of transfer</label>
                  </div>
                  <div class="block pl-3 pt-2 pb-2 js-date-single">
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="date" id="start" name="trip-start" value="">
                  </div>
                </div>

                <div>
                  <div>
                      <input type="radio" id="dewey" name="next_date_option" value="between">
                      <label for="dewey">Between dates</label>
                  </div>
                  <div class="block pl-3 pt-2 pb-2 js-date-multi hidden">
                    <label for="">Start</label>
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="date" id="start" name="trip-start" value="">
                    <label for="" class="pt-3 block">End</label>
                    <input class="w-full p-1 border border-solid border-gray-200 text-gray-800 rounded block" type="date" id="start" name="trip-start" value="">
                  </div>

                </div>`;
    }

    overlayHeader.innerHTML = `<h3 class="capitalize">Filter by ${column}</h3>`
    overlayFooter.innerHTML = `
<!--            <button class="js-cancel inline-flex items-center border border-transparent disabled:opacity-50 px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm text-purple-600 bg-gray-50 hover:bg-gray-200">Cancel</button>-->
            <button class="js-filter inline-flex items-center border border-transparent disabled:opacity-50 px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-800 w-full" style="justify-content:center;">Add Filter</button>
            `;
    overlay.appendChild(overlayHeader);
    overlay.appendChild(overlayInner);
    overlay.appendChild(overlayFooter);

    overlay.querySelectorAll( 'input[name="next_date_option"]' ).forEach( ( opt ) => {
        opt.addEventListener( 'click', () => {
            if ( opt.value === 'between' ) {
                overlay.querySelector( '.js-date-single').classList.add( 'hidden' )
                overlay.querySelector( '.js-date-multi').classList.remove( 'hidden' )
            } else {
                overlay.querySelector( '.js-date-single').classList.remove( 'hidden' )
                overlay.querySelector( '.js-date-multi').classList.add( 'hidden' )
            }
        } );
    } );

    return overlay;
}

class Modal {
    constructor( data ) {

        this.data = data;

    }

    buildModal() {
        let modal = document.createElement( 'div' );
        modal.className = 'fixed z-10 inset-0 overflow-y-auto'
        modal.setAttribute( 'aria-labelledby', 'modal-title' )
        modal.setAttribute( 'role', 'dialog' )
        modal.setAttribute( 'aria-modal', 'true' )

        modal.innerHTML = `
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" style="" aria-hidden="true"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full" style="max-width:90vw;">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-xl leading-6 font-medium text-gray-900" id="modal-title">
              ${this.data.name}
            </h3>
                    <div class="bg-white max-w-7xl">
                        <div class="grid md:grid-cols-5 grid-cols-1 md:gap-6 gap-0 py-4">
                            <div class="md:col-span-1">
                                <h2 class="text-lg font-medium">Lorem Ipsum Dolor</h2></div>
                                <div class="mt-5 md:mt-0 md:col-span-4">
                                    <div class="grid grid-cols-6 gap-1">
                                        <div class="flex flex-col col-span-6 gap-1">
                                            <div>
                                                <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci aliquam assumenda consectetur cupiditate doloremque, eaque error, ex impedit magnam nemo perspiciatis praesentium quaerat quia quibusdam quidem quod repellendus, tenetur totam ut.</p><p class="mb-3">Ab accusamus ad amet, consectetur culpa dolores esse excepturi fuga illum, ipsam laudantium, magni nesciunt odit officiis omnis placeat possimus qui quia quo rem! Debitis dolore inventore iste obcaecati quisquam. Perspiciatis, rerum?</p><p class="mb-3">Autem commodi cum, cumque dignissimos dolore ea id illo illum ipsa itaque, laudantium nam numquam officiis pariatur provident qui reprehenderit totam velit veniam voluptatem? Laboriosam nobis, officia perspiciatis quas soluta tempore ullam?</p><p class="mb-3">Ab aliquid architecto atque aut corporis dignissimos, dolor dolorem doloremque eveniet exercitationem facere, magni mollitia nulla quo sed similique soluta tenetur totam ut, vero. Ex iste odit optio possimus quasi repellat ullam.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="grid md:grid-cols-5 grid-cols-1 md:gap-6 gap-0 py-4 pt-8">
                            <div class="md:col-span-1">
                                <h2 class="text-lg font-medium">Lorem Ipsum Dolor</h2></div>
                                <div class="mt-5 md:mt-0 md:col-span-4">
                                    <div class="grid grid-cols-6 gap-1">
                                        <div class="flex flex-col col-span-6 gap-1">
                                            <div>
                                                <table class="min-w-full divide-y divide-gray-200">
                                                    <thead class="bg-gray-50 divide-y divide-gray-200 sticky top-0" style="z-index:200">
                                                    <tr>
                                                        <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                        <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                        <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                        <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody class="bg-white">
                                                    <tr>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    </tr>
                                                    <tr>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                        <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
          </div>
        </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button type="button" class="js-modal-close mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-indigo-700 text-base font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Close
        </button>
        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Action
        </button>
        <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          Action
        </button>
      </div>
    </div>
  </div>`;

        modal.querySelector( '.js-modal-close' ).addEventListener( 'click', () => {
            modal.remove();
        })

        document.body.append( modal );


    }

}

class TableIt {
    constructor( selector, data, tableStyle ) {
        this.data = data;
        this.table = document.getElementById( selector );
        this.dateFormat = new RegExp( '[0-9]+ [A-Za-z]+ [0-9]+ [0-9]+:[0-9]+' );
        this.filters = {};
        this.filtered = [];
        this.tableStyle = tableStyle;
        this.buildTableHeaders();
        this.buildTable();
        this.searchData();

        Object.keys(this.data.data[0]).forEach( ( _k ) => {
            this.filters[_k] = []
        } )

    }

    // Sort the columns
    sortData( column, direction ) {

        let columnSlug = column.name.split(" ").join("_").toLowerCase();
        let data = this.data.data;

        const sorter = ( type, direction ) => {

            data.sort( function ( a, b ) {

                if ( type === 'string' ) {

                    let strA = a[columnSlug].toLowerCase();
                    let strB = b[columnSlug].toLowerCase();

                    if ( direction === 'dsc' ) {

                        if ( strA < strB ) {
                            return -1;
                        }
                        if ( strA > strB ) {
                            return 1;
                        }
                        return 0;

                    } else {

                        if ( strA > strB ) {
                            return -1;
                        }
                        if ( strA < strB ) {
                            return 1;
                        }
                        return 0;
                    }
                }
                else if ( type === 'integer' ) {
                    if ( direction === 'dsc' ) {
                        return a[columnSlug] - b[columnSlug]
                    } else {
                        return b[columnSlug] - a[columnSlug]
                    }
                }
                else if ( type === 'date' ) {
                    let dateA = new Date(a[columnSlug])
                    let dateB = new Date(b[columnSlug])
                    if ( direction === 'dsc' ) {
                        return dateB - dateA
                    } else {
                        return dateA - dateB
                    }
                }
            } );

            this.buildTable(true);

        }

        if ( column.filter_type === 'integer' ) {
            sorter( 'integer', direction )
        } else if ( column.filter_type === 'date' ) {
            sorter( 'date', direction )
        } else {
            sorter( 'string', direction );
        }

    }

    filterData( column, cell ) {
        let popup;
        let runFilter;

        // Create the dropdown element to select the creator
        if ( column.ui_type === 'stacked' ) {
            let people = [];

            this.data.data.forEach( ( row ) => {

                if ( !people.includes( row.creator ) ) {
                    people.push( row.creator );
                }
            } );

            popup = filterOverlay( 'select', 'Creator', people.sort() )
            runFilter = true;

        } else if ( column.filter_type === 'string' ) {
            popup = filterOverlay( 'text', 'id', [])
            runFilter = false;
        } else if ( column.filter_type === 'select' ) {
            let arr = [];
            const _k = cell.querySelector( '.filterSet-button' ).dataset.type.toLowerCase();
            this.data.data.forEach( ( row ) => {
                if ( !arr.includes( row[_k] ) ) {
                    arr.push( row[_k] );
                }
            } );
            popup = filterOverlay( 'select', _k, arr.sort() )
            runFilter = true;
        } else if ( column.ui_type === 'date' ) {
            popup = filterOverlay( 'date', 'next transfer', [])
            runFilter = false;
        } else if ( column.ui_type === 'integer' ) {
            popup = filterOverlay( 'number', 'count', [])
            runFilter = false;
        }

        cell.appendChild(popup);

        popup.addEventListener( 'submit', ( e ) => {
            e.preventDefault();
            let formData = new FormData(e.target)

            if ( runFilter ) {
                for ( let _data of formData ) {

                    // The user has selected something from the dropdown
                    if ( _data[1].toLowerCase() !== 'select an option' ) {

                        let filterContainer = document.getElementById( 'filterContainer' );
                        let badges = filterContainer.querySelectorAll( '.filterBadges-badge' );

                        if ( badges.length === 0 ) {
                            let clearAllLi = document.createElement( 'li' );
                            clearAllLi.className = 'filterBadges-badge-all inline text-xs px-2 py-0.5 bg-white text-purple-700 rounded mr-2 border border-gray-200';
                            clearAllLi.innerHTML = `<span class="font-bold capitalize">Clear All Filters</span> <button class="fa-solid fa-times pl-1"></button>`;
                            filterContainer.appendChild(clearAllLi)

                            clearAllLi.querySelector( '.fa-times' ).addEventListener( 'click', () => {
                                filterContainer.querySelectorAll( '.filterBadges-badge' ).forEach( ( badge ) => {
                                    const index = this.filters[badge.dataset.key].indexOf(badge.dataset.filter);
                                    if (index > -1) {
                                        this.filters[badge.dataset.key].splice(index, 1);
                                    }
                                    badge.remove();
                                } );
                                this.buildTable(true);
                                clearAllLi.remove();
                            } );
                        }


                        // Update the filters object
                        this.filters[_data[0]].push(_data[1])
                        let columnName = _data[0];

                        if ( _data[0] === 'creator' ) {
                            columnName = 'Created By';
                        }

                        let li = document.createElement( 'li' );
                        li.dataset.filter = _data[1].toString();
                        li.dataset.key = _data[0].toString();
                        li.className = 'filterBadges-badge inline text-xs px-2 py-0.5 bg-purple-600 text-white rounded mr-2 border boreder-purple-600';
                        li.innerHTML = `<span class="font-bold capitalize">${columnName}:</span> ${_data[1]} <button class="fa-solid fa-times pl-1"></button>`;

                        filterContainer.appendChild(li)

                        li.querySelector( '.fa-times' ).addEventListener( 'click', () => {
                            // remove the filter pill and the filter
                            let parent = document.getElementById( 'filterContainer' );
                            parent.querySelector( `li[data-filter="${_data[1].toString()}"]` ).remove();

                            const index = this.filters[_data[0]].indexOf(_data[1]);
                            if (index > -1) {
                                this.filters[_data[0]].splice(index, 1);
                            }

                            if ( Object.keys(this.filters).length > 0 ) {
                                this.buildTable(true);
                            } else {
                                this.buildTable(false);
                            }
                        } );
                    }
                }
                if ( Object.keys(this.filters).length > 0 ) {
                    this.buildTable(true);
                } else {
                    this.buildTable(false);
                }
            }
            popup.remove();

        } );

        popup.addEventListener( 'mouseleave', () => {
            popup.remove();
        } );

    }

    searchData() {
        let search = document.getElementById( 'searchInput' );
        let button = document.getElementById( 'searchButton');

        const clearSet = () => {
            if ( !document.querySelector( '.searchWrap .clearButton' ) ) {
                const clearButton = document.createElement( 'button' );
                clearButton.innerHTML = '';
                clearButton.className = 'clearButton absolute right-1 p-2 fa-solid fa-times text-gray-400 h-full';

                document.querySelector( '.searchWrap' ).appendChild( clearButton );

                clearButton.addEventListener( 'click', () => {
                    search.value = '';
                    this.searchResults = false;
                    this.buildTable( true );
                    clearButton.remove();
                } );

            }
        }
        const searchIt = () => {

            let results = []
            const searchValue = search.value.toLowerCase();

            clearSet();

            for( let i=0; i<this.data.data.length; i++ ) {
                for ( let key in this.data.data[i] ) {
                    if ( this.data.data[i][key].toString().toLowerCase().indexOf(searchValue) !== -1 ) {
                        results.push(this.data.data[i]);
                    }
                }
            }


            this.searchResults = results;

            // let li = document.createElement( 'li' );
            // li.className = 'search-badge filterBadges-badge inline text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded mr-2';
            // li.innerHTML = `<span class="font-bold capitalize">Search:</span> ${ search.value } <button class="fa-solid fa-times pl-1"></button>`;
            //
            // document.getElementById( 'filterContainer' ).appendChild( li );
            // search.value = '';
            // li.querySelector( '.fa-times' ).addEventListener( 'click', () => {
            //     // remove the filter pill and the filter
            //     li.remove();
            //     this.searchResults = false;
            //     this.buildTable( true );
            // } );

            this.buildTable( true );
        }


        button.addEventListener( 'click', () => {
            searchIt();
        } );

        search.addEventListener( 'keydown', ( e ) => {
            if ( e.key === 'Enter' ) {
                searchIt();
            }
        } )
    }

    buildTable( filters ) {

        this.table.querySelectorAll('tbody tr').forEach( ( tr ) => {
            tr.remove();
        })

        if ( !filters ) {
            if ( this.searchResults ) {
                this.searchResults.forEach( ( set, idx ) => {
                    this.buildTableRow( set, idx );
                } );
            } else {
                this.data.data.forEach( ( set, idx ) => {
                    this.buildTableRow( set, idx );
                } );
            }
        } else {
            let filter = {}

            Object.keys(this.filters).forEach( ( _f ) => {
                if ( this.filters[ _f ].length > 0 ) {
                    filter[_f] = this.filters[_f];
                }
            } );

            const applyFilter = (data, filter) => data.filter(obj =>
                Object.entries(filter).every(([prop, find]) => find.includes(obj[prop]))
            );

            if ( this.searchResults ) {
                this.filtered = applyFilter( this.searchResults, filter )
            } else {
                this.filtered = applyFilter( this.data.data, filter )
            }

            this.filtered.forEach( ( set, idx ) => {
                this.buildTableRow( set, idx );
            } );
        }
    }

    buildTableHeaders() {
        let row = document.createElement( 'tr' );
        this.data.headers.forEach( ( header) => {
            let cell = document.createElement( 'th' );
            cell.className = "whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable"


            if ( header.ui_type === 'stacked' ) {
                cell.innerHTML = `
                <span class="th-inner">
                    <span class="label">${header.name}</span>
                    <span class="filterSet">
                        <button class="filterSet-button fa-solid fa-filter text-gray-400 hover:text-gray-600" data-type="${header.name}"></button>
                    </span>
                </span>`;

                // User clicks "Filter" for a column
                cell.querySelector( '.filterSet-button' ).addEventListener( 'click', () => {
                    this.filterData( header, cell )
                } )
            } else {
                if ( header.name ) {
                    cell.innerHTML = `
                    <span class="th-inner">
                        <span class="sortSet">
                            <button class="sortSet-button mod-asc js-sort fa-solid fa-angle-up text-gray-400 hover:text-gray-600" data-sort="asc"></button>
                            <button class="sortSet-button mod-dsc js-sort fa-solid fa-angle-down text-gray-400 hover:text-gray-600" data-sort="dsc"></button>
                        </span>
                        <span class="label">${header.name}</span>
                        <span class="filterSet">
                            <button class="filterSet-button fa-solid fa-filter text-gray-400 hover:text-gray-600" data-type="${header.name}"></button>
                        </span>
                    </span>`;

                    // User clicks "Filter" for a column
                    cell.querySelector( '.filterSet-button' ).addEventListener( 'click', () => {
                        this.filterData( header, cell )
                    } )

                    cell.querySelectorAll( '.js-sort' ).forEach( ( sortButton ) => {
                        sortButton.addEventListener( 'click', () => {
                            document.querySelectorAll( '.js-sort' ).forEach( ( button ) => {
                                button.classList.remove( 'is-active' );
                            });
                            sortButton.classList.add( 'is-active' );

                            this.sortData( header, sortButton.dataset.sort )
                        } );

                    });
                }
            }



            cell.setAttribute( 'scope', 'col')

            // If this array has a "width" value, add it here
            if ( header[1] ) {
                cell.style.minWidth = header[1].toString() + 'px'
            }

            row.appendChild( cell )
        } );

        this.table.querySelector( 'thead' ).appendChild( row );
    }

    buildTableCell( set, item, idx ) {
        let cell = document.createElement( 'td' );
        cell.className = "px-6 py-4 text-sm text-gray-500 text-left tableCell"
        cell.innerText = set[item];
        cell.setAttribute( 'scope', 'col')

        // Handle the first cell in the row
        if ( idx === 0 ) {
            cell.style.width = '250px'
            if ( this.tableStyle === 'expand' ) {
                cell.classList.add( 'mod-expander' )
            }
            cell.innerHTML = `<span class="primary text-purple-800">${set[item]}</span><span class="text-gray-400 secondary">${set.creator}</span>`

        } else if ( item === 'status' ) {
            // This is a "status column," so we need to make status badges
            let state = 'bg-gray-100 text-gray-800';
            if ( set[item].toLowerCase() === 'error') {
                state = 'bg-red-100 text-red-800'
            } else if ( set[item].toLowerCase() === 'configuring') {
                state = 'bg-yellow-100 text-yellow-800'
            } else if ( set[item].toLowerCase() === 'success' || set[item].toLowerCase() === 'completed' ) {
                state = 'bg-green-100 text-green-800';
            }
            cell.innerHTML = `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${state}">${set[item]}</span>`;
        }
        else if ( item === 'count' ) {
            cell.classList.remove( "text-left" );
            cell.classList.add( "text-right" );
        } else if ( this.dateFormat.test( set[item] ) ) {
            // This is a date
            let date = new Date(set[item])
            let formattedDate = `${date.getDate()} ${monthStrings[ date.getMonth() ]} ${date.getFullYear()}`;
            let formattedTime = `${date.getHours()}:${date.getMinutes()}`;
            cell.innerHTML = `<span class="dateCell mod-date">${formattedDate}</span><span class="dateCell mod-time text-gray-400">${formattedTime}</span>`;
        }
        // Handle the last cell in the row
        if ( idx === Object.keys(set).length - 2 ) {
            cell.style.textAlign = 'right';
            cell.style.whiteSpace = 'nowrap'
            cell.innerHTML = "<a href='#' class='text-purple-800 px-2'>Edit</a><button class='overflowMenu fa-solid fa-ellipsis-vertical'></button>"

            cell.querySelector('a' ).addEventListener( 'click', ( e ) => {
                e.stopPropagation();
            } );
        }

        return cell;
    }

    buildTableRow( set ) {

        let row = document.createElement( 'tr' );
        row.className = 'dataRow'

        Object.keys(set).forEach( ( item, idx ) => {

            if ( item !== 'details' ) {
                if ( idx !== 1 ) {
                    row.appendChild( this.buildTableCell( set, item, idx ) );
                }
            }

        } );

        this.table.querySelector( 'tbody' ).appendChild( row );


        if ( this.tableStyle === 'expand' ) {

            let detailRow = document.createElement( 'tr' );
            let cell = document.createElement( 'td' );

            // This is the stuff that's actually in the object, but right now we aren't using it
            // console.log(item)

            detailRow.className = 'hidden detailRow';
            cell.className = "px-6 py-4 text-sm text-gray-500 text-left tableCell mod-detailRow"
            cell.colSpan = 7;
            cell.innerHTML = `
                <div class="bg-white max-w-7xl">
                    <div class="grid md:grid-cols-5 grid-cols-1 md:gap-6 gap-0 py-4">
                        <div class="md:col-span-1">
                            <h2 class="text-lg font-medium">Lorem Ipsum Dolor</h2></div>
                            <div class="mt-5 md:mt-0 md:col-span-4">
                                <div class="grid grid-cols-6 gap-1">
                                    <div class="flex flex-col col-span-6 gap-1">
                                        <div>
                                            <p class="mb-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. A adipisci aliquam assumenda consectetur cupiditate doloremque, eaque error, ex impedit magnam nemo perspiciatis praesentium quaerat quia quibusdam quidem quod repellendus, tenetur totam ut.</p><p class="mb-3">Ab accusamus ad amet, consectetur culpa dolores esse excepturi fuga illum, ipsam laudantium, magni nesciunt odit officiis omnis placeat possimus qui quia quo rem! Debitis dolore inventore iste obcaecati quisquam. Perspiciatis, rerum?</p><p class="mb-3">Autem commodi cum, cumque dignissimos dolore ea id illo illum ipsa itaque, laudantium nam numquam officiis pariatur provident qui reprehenderit totam velit veniam voluptatem? Laboriosam nobis, officia perspiciatis quas soluta tempore ullam?</p><p class="mb-3">Ab aliquid architecto atque aut corporis dignissimos, dolor dolorem doloremque eveniet exercitationem facere, magni mollitia nulla quo sed similique soluta tenetur totam ut, vero. Ex iste odit optio possimus quasi repellat ullam.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="grid md:grid-cols-5 grid-cols-1 md:gap-6 gap-0 py-4 pt-8">
                        <div class="md:col-span-1">
                            <h2 class="text-lg font-medium">Lorem Ipsum Dolor</h2></div>
                            <div class="mt-5 md:mt-0 md:col-span-4">
                                <div class="grid grid-cols-6 gap-1">
                                    <div class="flex flex-col col-span-6 gap-1">
                                        <div>
                                            <table class="min-w-full divide-y divide-gray-200">
                                                <thead class="bg-gray-50 divide-y divide-gray-200 sticky top-0" style="z-index:200">
                                                <tr>
                                                    <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                    <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                    <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                    <th class="whitespace-nowrap px-6 py-3 text-xs font-medium text-gray-600 text-left bg-gray-50 table-head mod-expandable mod-sortable mod-filterable">Header</th>
                                                </tr>
                                                </thead>
                                                <tbody class="bg-white">
                                                <tr>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                </tr>
                                                <tr>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                    <td class="px-6 py-4 text-sm text-gray-500 text-left border-b border-gray-200">Data</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div class="text-right p-1 mt-8">
                    <button class="inline-flex items-center border border-transparent disabled:opacity-50 px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm text-purple-600 bg-gray-50 hover:bg-gray-200">Action</button>
                    <button class="inline-flex items-center border border-transparent disabled:opacity-50 px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm text-purple-600 bg-gray-50 hover:bg-gray-200">Action</button>
                    <button class="inline-flex items-center border border-transparent disabled:opacity-50 px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm text-purple-600 bg-gray-50 hover:bg-gray-200">Action</button>
                </div>
                `;
            detailRow.appendChild( cell )
            this.table.querySelector( 'tbody' ).appendChild(detailRow);

            row.addEventListener( 'click', ( ) => {
                if ( row.classList.contains( 'expanded' ) ) {
                    row.classList.remove( 'expanded' );
                    row.querySelector( '.mod-expander').classList.remove('is-open');
                    row.nextElementSibling.classList.remove('expanded');
                    row.nextElementSibling.classList.add('hidden');
                } else {

                    row.classList.add( 'expanded' );
                    row.querySelector( '.mod-expander').classList.add('is-open');
                    row.nextElementSibling.classList.add('expanded');
                    row.nextElementSibling.classList.remove('hidden');
                }
            } );

        } else {

            row.addEventListener( 'click', () => {
                let modal = new Modal( set );
                modal.buildModal();
            } );
        }

        row.querySelector( '.overflowMenu' ).addEventListener( 'click', ( e ) => {
            e.stopPropagation();
        } );
    }
}