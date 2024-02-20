let count = 1;

document.getElementById('executebutton').addEventListener('click', function() {
    var script = document.getElementById('textbox').value;
    var gameID = localStorage.getItem('Key_');
    
    fetch('/key/' + gameID, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ script: script })
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

window.onload = function() {
    var gameID = window.location.pathname.split('/').pop();
    fetch('/key/' + gameID)
    .then(response => response.text())
    .then(script => {
        document.getElementById('textbox').value = script;
    })
    .catch(error => {
        console.error('Error:', error);
    });
};


document.getElementById('apply_config').onclick = function () {
    localStorage.setItem('Key_', document.getElementById('KeyBox').value)
    localStorage.setItem('username_', document.getElementById('Username').value)
}

document.body.onload = function () {
    document.getElementById('KeyBox').value = localStorage.getItem('Key_')
    document.getElementById('Username').value = localStorage.getItem('username_')
    LoadAll();
}

function downloadLuaFile() {
    var luaContent = document.getElementById('textbox').value;
    var blob = new Blob([luaContent], { type: 'text/plain' });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'script.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }


  function replaceUsername(script) {
    return script.replace(/RBLX_USERNAME/g, localStorage.getItem('username_'));
}

function RunCode(script) {
    var modifiedScript = replaceUsername(script);
    document.getElementById('textbox').value = modifiedScript

    setTimeout(() => {
        document.getElementById('executebutton').click()
    }, 50);
}


function LoadAll() {
    fetch('./externa/script.json')
        .then(response => response.json())
        .then(data => {
            if (!Array.isArray(data)) {
                console.error('Data is not an array:', data);
                return;
            }

            const jsonContainer = document.getElementById('SHUB');
            jsonContainer.innerHTML = '';
            data.forEach(item => {
                if (!item.name || !item.icon || !item.script) {
                    console.error('Invalid item:', item);
                    return;
                }

                const MainBox = document.createElement('div')
                MainBox.className = 'ScriptBox';

                jsonContainer.appendChild(MainBox);
                const ImageBox = document.createElement('div');
                ImageBox.className = 'ImageBox';
                const Image = document.createElement('img')
                MainBox.appendChild(ImageBox)
                ImageBox.appendChild(Image)
                Image.src = item.icon

                const TitlePart = document.createElement('div');
                TitlePart.className = 'TitleParts';
                MainBox.appendChild(TitlePart)
                const P_ = document.createElement('p');
                P_.textContent = item.name;
                const RunButton = document.createElement('button');
                RunButton.textContent = '▶';
                TitlePart.appendChild(P_)
                TitlePart.appendChild(RunButton)
                RunButton.className = 'runButton';

                RunButton.onclick = function() {
                    RunCode(item.script);
                };
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}


function executor() {
    document.getElementById('SHUB').style.display = 'none';
    document.getElementById('execu').style.display = 'flex';
}

function ScriptHub() {
    document.getElementById('SHUB').style.display = 'flex';
    document.getElementById('execu').style.display = 'none';
}