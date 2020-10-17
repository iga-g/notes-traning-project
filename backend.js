window.noteBackgrounds = {}

window.onload = function() {
    window.noteBackgrounds = window.localStorage.getItem('noteBackgrounds') || '{}'
    window.noteBackgrounds = JSON.parse(window.noteBackgrounds)

    if (window.location.href.indexOf('note.html') >= 0) {
        var noteIndex = parseInt(window.location.search.substr(4))
        document.querySelector('button.delete').dataset.noteIndex = noteIndex
        document.querySelector('textarea').value = getNote(noteIndex)
        document.querySelector('button.delete').addEventListener('click', function() {
            deleteNote(this.dataset.noteIndex)
            window.location.href = 'index.html'
            delete window.noteBackgrounds['note_' + this.dataset.noteIndex]
            window.localStorage.setItem('noteBackgrounds', JSON.stringify(window.noteBackgrounds))
        })
        document.querySelector('button.save').dataset.noteIndex = noteIndex
        document.querySelector('button.save').addEventListener('click', function() {
                saveNote(this.dataset.noteIndex, document.querySelector('textarea').value)
                if (typeof window.noteBackgrounds['note_' + this.dataset.noteIndex] === 'undefined') window.noteBackgrounds['note_' + this.dataset.noteIndex] = ''
                window.noteBackgrounds['note_' + this.dataset.noteIndex] = document.querySelector('#noteBackground').value
                window.localStorage.setItem('noteBackgrounds', JSON.stringify(window.noteBackgrounds))
                window.location.reload()
            })
            // if (typeof window.noteBackgrounds['note_' + noteIndex] !== 'undefined') {
            //     document.querySelector(`#noteBackground option[value=${window.noteBackgrounds['note_' + noteIndex]}]`).selected = "selected"
            //     document.queryElement('textarea').classList.add(`noteStyle${noteIndex % 4}`)
            // }
        var noteBackgroundIndex = (noteIndex % 5) + 1
        document.querySelector('textarea').classList.add(`noteStyle${noteBackgroundIndex}`)
        document.querySelector('main').classList.add(`noteStyle${noteBackgroundIndex}`)
    } else if (window.location.pathname == '/notes-trening-project/') {
        if ('content' in document.createElement('template')) {
            var notesPlace = document.querySelector('main .notes')
            var template = document.querySelector('#noteTemplate')
            var allNotes = getAllNotes()

            for (let index = 0; index < allNotes.length; index++) {
                const element = allNotes[index]
                var clone = template.content.cloneNode(true)
                var trimText = element
                if (trimText.length > 60) trimText = trimText.substr(0, 60) + '...'
                clone.querySelector('.note_title').innerText = element
                clone.querySelector('button.delete').dataset.noteIndex = index
                clone.querySelector('button.delete').addEventListener('click', function() {
                    deleteNote(this.dataset.noteIndex)
                    window.location.reload()
                })
                clone.querySelector('.note > a').href = 'note.html?id=' + index
                    // if (typeof window.noteBackgrounds['note_' + index] !== 'undefined')
                    //     clone.querySelector('.note').classList.add(window.noteBackgrounds['note_' + index])
                notesPlace.appendChild(clone)
            }
        }

        document.querySelector('button.add').addEventListener('click', function() { createNote() })
    }
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
    allNotes.push('')
    window.localStorage.setItem('allNotes', JSON.stringify(allNotes))
    window.location.reload()
}

function getNote(noteID) {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    return allNotes[noteID]
}

function saveNote(noteID, content) {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    allNotes[noteID] = content
    window.localStorage.setItem('allNotes', JSON.stringify(allNotes))
}

function getAllNotes() {
    var allNotes = window.localStorage.getItem('allNotes') || '[]'
    allNotes = JSON.parse(allNotes)
    return allNotes
}