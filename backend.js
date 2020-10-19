function loadIndex() {
    if ('content' in document.createElement('template')) {
        var notesPlace = document.querySelector('main .notes')
        var template = document.querySelector('#noteTemplate')
        var allNotes = getAllNotes()

        for (let index = 0; index < allNotes.length; index++) {
            const element = allNotes[index]
            var clone = template.content.cloneNode(true)
            var trimText = element
            if (trimText.length > 60) trimText = trimText.substr(0, 60) + '...'
            clone.querySelector('.note_title').innerText = element.title
            clone.querySelector('button.delete').dataset.noteIndex = index
            clone.querySelector('button.delete').addEventListener('click', function() {
                deleteNote(this.dataset.noteIndex)
                window.location.reload()
            })
            clone.querySelector('.note > a').href = 'note.html?id=' + index
            notesPlace.appendChild(clone)
        }
    }

    document.querySelector('button.add').addEventListener('click', function() { createNote() })
}

function loadNote() {
    var noteIndex = parseInt(window.location.search.substr(4))
    document.querySelector('button.delete').dataset.noteIndex = noteIndex
    console.log(getNote(noteIndex))
    document.querySelector('textarea').value = getNote(noteIndex).content
    document.querySelector('.nav_flex>h1').innerText = getNote(noteIndex).title
    document.title = getNote(noteIndex).title
    document.querySelector('button.delete').addEventListener('click', function() {
        deleteNote(this.dataset.noteIndex)
        window.location.href = 'index.html'
    })
    document.querySelector('button.save').dataset.noteIndex = noteIndex
    document.querySelector('button.save').addEventListener('click', function() {
        saveNote(this.dataset.noteIndex, document.querySelector('textarea').value, document.querySelector('.nav_flex>h1').innerText)
        window.location.reload()
    })
    var noteBackgroundIndex = (noteIndex % 5) + 1
    document.querySelector('textarea').classList.add(`noteStyle${noteBackgroundIndex}`)
    document.querySelector('main').classList.add(`noteStyle${noteBackgroundIndex}`)
}

function deleteNote(noteID) {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    if (noteID >= 0) allNotes.splice(noteID, 1)
    window.localStorage.setItem('allNotes', JSON.stringify(allNotes))
}

function createNote() {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    var maxId = 0
    for (let index = 0; index < allNotes.length; index++) {
        const element = allNotes[index];
        if (element.id >= maxId) {
            maxId = element.id + 1
        }
    }
    allNotes.push({
        id: maxId,
        title: 'Nazwa twojej notatki',
        content: ''
    })
    window.localStorage.setItem('allNotes', JSON.stringify(allNotes))
    window.location.reload()
}

function getNote(noteID) {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    var retElem = {}
    for (let index = 0; index < allNotes.length; index++) {
        const element = allNotes[index];
        if (element.id == noteID) {
            retElem = allNotes[index];
        }
    }
    return retElem
}

function saveNote(noteID, content, title) {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    for (let index = 0; index < allNotes.length; index++) {
        const element = allNotes[index];
        if (element.id == noteID) {
            allNotes[index].content = content
            allNotes[index].title = title
            break
        }
    }
    window.localStorage.setItem('allNotes', JSON.stringify(allNotes))
}

function getAllNotes() {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    return allNotes
}