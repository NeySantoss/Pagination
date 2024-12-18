const paginationListWrapper = document.querySelector(".pagination-list");

function createDummyData(){
    for(let i = 1; i <= 100; i++){
        const newli = document.createElement("li");
        newli.textContent = `Item ${i}`;
        paginationListWrapper.appendChild(newli);
    }
}

createDummyData();

const extractAllListItems = document.querySelectorAll("li");
const paginationNumbers = document.querySelector(".pagination-numbers");
const prevBtnEl = document.querySelector(".prev-btn")
const nextBtnEl = document.querySelector(".next-btn");

let paginationLimit = 10;
let pageCount = Math.ceil(extractAllListItems.length/paginationLimit);
let currentPage = 1;

function createPaginationNumbers() {
    for( let i= 1 ; i <= pageCount; i++){
        createPageNumber(i);
    }
}

function createPageNumber(getCurrentIndex) {
    const pageNumber = document.createElement("button");
    pageNumber.classList.add("pagination-numbers");
    pageNumber.textContent = getCurrentIndex;
    pageNumber.setAttribute("page-index", getCurrentIndex);

    paginationNumbers.appendChild(pageNumber);
}

function handleActivePageNumber(){
    document.querySelectorAll(".pagination-numbers").forEach(button => {
        button.classList.remove("active-state");
        const getCurrentPageIndex = Number(button.getAttribute('page-index'));

        if(getCurrentPageIndex === currentPage) {
            button.classList.add("active-state");
        }
    })
}

function handleDisableButton(getBtn) {
    getBtn.classList.add("disabled");
    getBtn.setAttribute("disabled", 'true');
}

function handleEnableButton(getBtn) {
    getBtn.classList.remove("disabled");
    getBtn.removeAttribute("disabled", "false");
}


function handlePaginationButtonStatus(){
    if(currentPage === 1) {
        handleDisableButton(prevBtnEl);
    } else {
        handleEnableButton(prevBtnEl);
    }

    if(pageCount === currentPage){
        handleDisableButton(nextBtnEl);
    } else {
        handleEnableButton(nextBtnEl);
    }

}

function handleCurrentPage(getCurrentPageNumber) {
    currentPage = getCurrentPageNumber;

    handleActivePageNumber();
    handlePaginationButtonStatus();

    const getPreviousRange = (getCurrentPageNumber - 1) * paginationLimit;
    const getCurrentRange = getCurrentPageNumber * paginationLimit;

    extractAllListItems.forEach((listItem, index) => {
        listItem.classList.add("hide-list-item");

        if(index >= getPreviousRange && index < getCurrentRange){
            listItem.classList.remove("hide-list-item");
        }
    });
};


createPaginationNumbers();

handleCurrentPage(1);

prevBtnEl.addEventListener("click", () => {
    handleCurrentPage(currentPage - 1);
});

nextBtnEl.addEventListener("click", () => {
    handleCurrentPage(currentPage + 1);
});


document.querySelectorAll(".pagination-numbers").forEach(button => {
    const getCurrentPageIndex = Number(button.getAttribute("page-index"));

    if(getCurrentPageIndex) {
        button.addEventListener("click", () => {
             handleCurrentPage(getCurrentPageIndex);
        });
    }
});