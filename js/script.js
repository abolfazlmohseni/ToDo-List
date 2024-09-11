// Shortcut
let $ = document
// Select ELement Html
const switchElements = $.querySelectorAll('.switch');
const InuptElemtAddTasck = $.querySelector("#input_add-tasck")
const BtnElemtAddTasck = $.querySelector("#BtnSunmit")
let InputElementEditTasck = $.querySelector(".editor_tasck-box")

// Dark&Light Mode  
switchElements.forEach(function (switchElement) {
    switchElement.addEventListener('click', function () {
        document.body.classList.toggle('dark');

        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});
// Add Tasck
BtnElemtAddTasck.addEventListener('click', function () {
    let ValueInputAddTasck = InuptElemtAddTasck.value
    let ConteynerNewTasck = $.createElement("div")
    let TasckText = $.createElement("div")
    let Icon1 = $.createElement("i")
    let ContentTasck = $.createElement("p")
    let moreIconsConteyner = $.createElement("div")
    let Icon2 = $.createElement("i")
    let Icon3 = $.createElement("i")

    ConteynerNewTasck.classList = "tasck-items"
    TasckText.classList = "tasck-text"
    Icon1.classList = "bi bi-square"
    ContentTasck.classList = "tasck-content"
    moreIconsConteyner.classList = "right_icon-tasck"
    Icon2.classList = "bi bi-trash"
    Icon3.classList = "bi bi-pencil-square"

    ContentTasck.innerHTML = ValueInputAddTasck

    moreIconsConteyner.append(Icon2, Icon3)
    TasckText.append(Icon1, ContentTasck)
    ConteynerNewTasck.append(TasckText, moreIconsConteyner)


    let poshitem = $.querySelector(".tasck-box")
    poshitem.append(ConteynerNewTasck)
    console.log(poshitem);
    InuptElemtAddTasck.value = ""
    SelectNewIconTrash()
    SelectNewIconCheckBox()
    SelectNewIconEdit()
    CountingTascks()
    CheckNumberItems()
})
InuptElemtAddTasck.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        let ValueInputAddTasck = InuptElemtAddTasck.value
        let ConteynerNewTasck = $.createElement("div")
        let TasckText = $.createElement("div")
        let Icon1 = $.createElement("i")
        let ContentTasck = $.createElement("p")
        let moreIconsConteyner = $.createElement("div")
        let Icon2 = $.createElement("i")
        let Icon3 = $.createElement("i")

        ConteynerNewTasck.classList = "tasck-items"
        TasckText.classList = "tasck-text"
        Icon1.classList = "bi bi-square"
        ContentTasck.classList = "tasck-content"
        moreIconsConteyner.classList = "right_icon-tasck"
        Icon2.classList = "bi bi-trash"
        Icon3.classList = "bi bi-pencil-square"

        ContentTasck.innerHTML = ValueInputAddTasck

        moreIconsConteyner.append(Icon2, Icon3)
        TasckText.append(Icon1, ContentTasck)
        ConteynerNewTasck.append(TasckText, moreIconsConteyner)


        let poshitem = $.querySelector(".tasck-box")
        poshitem.append(ConteynerNewTasck)
        console.log(poshitem);
        InuptElemtAddTasck.value = ""
        SelectNewIconTrash()
        SelectNewIconCheckBox()
        SelectNewIconEdit()
        CountingTascks()
        CheckNumberItems()
    }

})
// Delete Tasck
function SelectNewIconTrash() {
    let trashIcon = $.querySelectorAll('.bi-trash')
    trashIcon.forEach(function (Trash) {
        Trash.addEventListener('click', function (event) {
            event.target.parentElement.parentElement.remove()
            CountingTascks()
            CheckNumberItems()
        })
    })
}
SelectNewIconTrash()
// Tasck Status
function SelectNewIconCheckBox() {
    let CheckBoxIcon = $.querySelectorAll(".bi-square")
    CheckBoxIcon.forEach(function (Check) {
        Check.addEventListener('click', function (event) {


            let ParentCheck = event.target.parentElement.parentElement

            if (event.target.classList == "bi bi-square") {
                ParentCheck.style.color = "#aaa"
                ParentCheck.style.textDecoration = "line-through"
                event.target.classList = "bi bi-check2-square"
                ParentCheck.classList = "tasck-items OK"
            } else {
                ParentCheck.style.color = "#fff"
                ParentCheck.style.textDecoration = "none"
                event.target.classList = "bi bi-square"
                ParentCheck.classList = "tasck-items"
            }
            CountingTascks()
        })
    })
}

SelectNewIconCheckBox()
//   Edit Tasck
var Selectitemstasck = null
function SelectNewIconEdit() {
    let EditIcon = $.querySelectorAll(".bi-pencil-square")
    EditIcon.forEach(function (Edit) {
        Edit.addEventListener('click', function (event) {
            let ParentEdit = event.target.parentElement.parentElement.firstElementChild.lastElementChild.innerHTML
            InputElementEditTasck.style.display = 'block'
            InputElementEditTasck.firstElementChild.value = ParentEdit
            Selectitemstasck = event.target.parentElement.parentElement
            SelectNewIconCheckBox()
        })
    })
}
SelectNewIconEdit()
const BtnEditor = $.querySelector("#BtnEditor")
const BtnClese = $.querySelector("#BtnClese")

BtnEditor.addEventListener('click', function () {
    Selectitemstasck.firstElementChild.lastElementChild.innerHTML = InputElementEditTasck.firstElementChild.value
    InputElementEditTasck.firstElementChild.value = ''
    InputElementEditTasck.style.display = 'none'
    SelectNewIconCheckBox()
})
BtnClese.addEventListener('click', function () {
    InputElementEditTasck.firstElementChild.value = ''
    InputElementEditTasck.style.display = 'none'
    SelectNewIconCheckBox()
})


// Counting Tascks
function CountingTascks() {
    let tasckBox = $.querySelectorAll(".tasck-items")
    let tasckBoxOK = $.querySelectorAll(".bi-check2-square")
    let numbertasck = $.querySelector(".numbertasck")
    let numbertiktasck = $.querySelector(".numbertiktasck")
    let tasckNumberText = $.querySelector(".tasck-number-text")
    numbertiktasck.innerHTML = tasckBox.length
    numbertasck.innerHTML = tasckBoxOK.length
    console.log(tasckBoxOK.length)
    if (tasckBox.length == tasckBoxOK.length) {
        tasckNumberText.innerHTML = "همه کارارو به راه کردی"
    } else {
        tasckNumberText.innerHTML = "!هنوز کارات مونده"
    }
}
CountingTascks()
// Text For Tasck conteyner
function CheckNumberItems() {
    let tasckBox = $.querySelectorAll(".tasck-items")
    let close = $.querySelector("#close")
    if (tasckBox.length === 0) {
        close.style.display = 'block'
        close.style.color = '#fff'
    } else {
        close.style.display = 'none'
    }
    console.log(tasckBox.length)
}
CheckNumberItems() 