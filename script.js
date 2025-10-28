const formatDoc = (cmd, value = false) => {
    if(value){
        document.execCommand(cmd, false, value);
        // console.log("hi")
    }else{
        document.execCommand(cmd);
    }
}

const handleAddLink = () => {
    const url = prompt("Enter the URL");
    formatDoc('createLink', url);
}

let content = document.querySelector('.content');
content.addEventListener('mouseenter', () => {
    let anchors = content.querySelectorAll('a');
    console.log(anchors);

    anchors.forEach((anchor) => {
        anchor.addEventListener('mouseenter', (e) => {
            anchor.setAttribute("target", "_blank");
            content.setAttribute("contentEditable", "false");
        })

        anchor.addEventListener('mouseleave', () => {
            anchor.removeAttribute("target");
            content.setAttribute("contentEditable", "true");
        })
    })
})

let fileName = document.getElementById('fileName');

const handleFileExport = (value) => {
    if(value === "new"){
        content.innerHTML = "";
        fileName.value = "";
    }
    if(value === "pdf"){
        console.log("saved as pdf");
        console.log(content.innerHTML);
        if (!fileName.value.trim()) {
            alert("Please enter a file name before saving as PDF.");
            return;
        }
        html2pdf().from(content).set({ filename: fileName.value.trim() + ".pdf" }).save();
    }
    if(value === "txt"){
        const extractedText = content.innerText;
        const blob = new Blob([extractedText]);     //blob (Binary large object) is a file-like object of immutable, raw data 
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName.value + ".txt";
        a.click();
    }
}

let active = false;
let showCode = document.getElementById('show-code');
showCode.addEventListener('click', () => {
    active = !active;
    showCode.dataset.active = active;
    if(active){
        content.textContent = content.innerHTML;
        content.setAttribute("contentEditable", "false");
    }
    else{
        content.innerHTML = content.textContent;
        content.setAttribute("contentEditable", "true");
    }
});