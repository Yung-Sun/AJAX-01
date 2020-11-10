getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/4.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const dom = request.responseXML
            const text = dom.getElementsByTagName('warning')[0].textContent
            console.log(text.trim())
        }
    }
    request.send()
}


getHTML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/next.html')
    request.onload = () => {
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = () => { }
    request.send()
}


getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/style.css')
    request.onreadystatechange = () => {
        //下载完成，但不知道成功（2xx)还是失败(4xx、5xx)
        if (request.readyState === 4) {
            //判断request.status是否是200多
            if (request.status >= 200 && request.status < 300) {
                console.log('下载完成')
                // 创建style标签
                const style = document.createElement('style')
                // 填写style内容
                style.innerHTML = request.response
                // 插入style标签
                document.head.appendChild(style)
            } else {
                console.log('下载失败')
            }
        }
    }
    request.send()
}


getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/giao.js')
    request.onreadystatechange = () => {
        console.log(request.readyState)
        if (request.readyState === 4) {
            const script = document.createElement('script')
            script.innerHTML = request.response
            document.body.appendChild(script)
        }
    }
    request.send()
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/5.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            //JSON.parse()可以把符合JSON语法的字符串变成对应的对象或者是其他东西
            const object = JSON.parse(request.response)
            console.log(request.response)
            console.log(object)
            userName.textContent = object.name
        }
    }
    request.send()
}

let n = 1
nextPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n + 1}`)
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response)
            array.forEach(item => {
                const li = document.createElement('li')
                li.textContent = item.id
                pageList.appendChild(li)
            });
            n += 1
        }
    }
    request.send()
}