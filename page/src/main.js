const socket = io()
socket.on('msg', (msg) => {
  document.getElementById('output').innerText += '\n' + msg
})

document.getElementById('input').addEventListener('keypress', (ev) => {
  if (ev.keyCode !== 13) return
  
  const test = document.getElementById('input').value.split('').find((char) => !/^[\x00-\x7F]*$/.test(char))
  if (test) {
    document.getElementById('input').value = ''
    return alert('아 이 채팅은 영어만 지원해요!\n\n한글날 위해서 만든거 아니냐구요?\n대신 아희는 다 알아들을 수 있잖아요?\n쿨럭.. 낌새가 한글 지원하는 모듈을 찾아 오겠죠 뭐')
  }

  socket.emit('msg', document.getElementById('input').value)
  document.getElementById('input').value = ''
})
