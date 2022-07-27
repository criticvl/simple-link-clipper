let linkList = []

let linkStorage = JSON.parse(localStorage.getItem("linkList"))

if (linkStorage) {
    linkList = linkStorage
    showLinks(linkList)
}

function showLinks(links) {
    document.getElementsByClassName("list")[0].textContent = ""
    for (let i = 0; i < links.length; i++) {
        let li = document.createElement("li")
        let a = document.createElement("a")
        let delButton = document.createElement("button")
        delButton.addEventListener("click", function () {
            linkList.splice(i, 1)
            localStorage.setItem("linkList", JSON.stringify(linkList))
            showLinks(linkList)
        })
        delButton.textContent = "X"
        delButton.classList.add("deleteButton")

        a.target = "_blank"
        a.textContent = links[i]
        a.href = links[i]
        li.appendChild(a)
        li.appendChild(delButton)
        document.getElementsByClassName("list")[0].appendChild(li)
    }
}


document.getElementsByClassName("button-save-input")[0].addEventListener("click", addInput)

function addInput() {
    if (document.getElementsByClassName("linkInput")[0].value != "" && document.getElementsByClassName("linkInput")[0].value.includes(".")) {
        if (!document.getElementsByClassName("linkInput")[0].value.includes("http") && !document.getElementsByClassName("linkInput")[0].value.includes("://")) {
            document.getElementsByClassName("linkInput")[0].value = "https://" + document.getElementsByClassName("linkInput")[0].value + "/"
        }
        linkList.push(document.getElementsByClassName("linkInput")[0].value)
        document.getElementsByClassName("linkInput")[0].value = ""
        localStorage.setItem("linkList", JSON.stringify(linkList))
        showLinks(linkList)
    }
}

document.getElementsByClassName("button-save-tab")[0].addEventListener("click", addTab)

function addTab() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        if (tabs[0].url.includes("http") && !tabs[0].url.includes("chrome") && tabs[0].url.includes("://")) {
            linkList.push(tabs[0].url)
            localStorage.setItem("linkList", JSON.stringify(linkList))
            showLinks(linkList)
        }
    })
}

document.getElementsByClassName("button-delete")[0].addEventListener("click", deleteAll)

function deleteAll() {
    localStorage.clear()
    linkList = []
    showLinks(linkList)
}

document.addEventListener('keydown', function (event) {
    if (event.key == "Enter") {
        addInput()
    }
});