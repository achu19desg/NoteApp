
let notes = []
let editingNoteIndex = null

const noteTitle = document.querySelector("#notetitle")
const noteDescription = document.querySelector("#descrip")
const addBtn = document.querySelector("#addbtn")
const notesContainer = document.querySelector("#notescontainer")


// Create Delete All Button
const deleteAllBtn =
    document.createElement("button")

deleteAllBtn.textContent =
    "Delete All"

deleteAllBtn.className =
    "text-xl bg-red-700 hover:bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg transition hover:scale-105 mt-6 mb-10 w-50 "

notesContainer.after(deleteAllBtn)


// Save Notes
function saveNotes() {

    localStorage.setItem(
        "quickNotes",
        JSON.stringify(notes)
    )

}


// Load Notes
function loadNotes() {

    const savedNotes =
        localStorage.getItem("quickNotes")

    return savedNotes
        ? JSON.parse(savedNotes)
        : []

}


// Render Notes
function renderNotes() {

    notesContainer.innerHTML = ""

    // Hide Delete Button First
    deleteAllBtn.style.display =
        "none"

    // Empty State
    if (notes.length === 0) {

        notesContainer.innerHTML = `

            <div class="text-white text-center col-span-full py-10">

                <h2 class="text-4xl font-bold mb-3">
                    No Notes Yet 📝
                </h2>

                <p class="text-lg">
                    Start Writing Your Ideas ✨
                </p>

            </div>
        `

        return

    }

    // Show Delete Button
    deleteAllBtn.style.display =
        "block"

    // Create Notes
    notes.forEach((note, index) => {

        const noteCard =
            document.createElement("div")

        noteCard.className =
            "bg-mauve-500 w-full p-5 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 animate-[fadeIn_0.4s_ease]"

        noteCard.innerHTML = `

            <div class="bg-mauve-300 p-5 rounded-xl break-words text-left">

                <div class="flex justify-between items-start gap-4 mb-4 flex-wrap">

                    <h3 class="text-2xl text-black font-bold font-mono">
                        ${note.title}
                    </h3>

                    <p class="text-sm text-black">
                        ${note.date}
                    </p>

                </div>

                <p class="text-lg text-black break-words  leading-8 text-left">
                    ${note.description}
                </p>

            </div>

            <div class="flex justify-end gap-4 mt-4">

                <button
                    class="edit-btn text-lg font-bold bg-green-700 hover:bg-green-500 text-white rounded-lg px-4 py-2 transition hover:scale-105"
                    data-index="${index}"
                >
                    Edit
                </button>

                <button
                    class="remove-btn text-lg font-bold bg-red-600 hover:bg-red-500 text-white rounded-lg px-4 py-2 transition hover:scale-105"
                    data-index="${index}"
                >
                    Remove
                </button>

            </div>
        `

        notesContainer.appendChild(noteCard)

    })

}


// Add / Update Note
addBtn.addEventListener("click", () => {

    if (
        noteTitle.value.trim() === "" ||
        noteDescription.value.trim() === ""
    ) {

        alert("Please fill all fields")

        return

    }

    // Edit Existing Note
    if (editingNoteIndex !== null) {

        notes[editingNoteIndex] = {

            ...notes[editingNoteIndex],

            title: noteTitle.value,

            description: noteDescription.value

        }

        editingNoteIndex = null

        addBtn.textContent =
            "+ Add Note"

    }

    // Add New Note
    else {

        notes.unshift({

            title: noteTitle.value,

            description: noteDescription.value,

            date: new Date().toLocaleString()

        })

    }

    saveNotes()

    renderNotes()

    // Clear Inputs
    noteTitle.value = ""

    noteDescription.value = ""

})


// Edit & Remove
document.addEventListener("click", (e) => {

    // Remove Note
    if (
        e.target.classList.contains("remove-btn")
    ) {

        const index =
            e.target.dataset.index

        const card =
            e.target.closest("div.bg-mauve-500")

        card.style.opacity = "0"

        card.style.transform =
            "translateY(20px)"

        card.style.transition =
            "0.3s"

        setTimeout(() => {

            notes.splice(index, 1)

            saveNotes()

            renderNotes()

        }, 300)

    }

    // Edit Note
    if (
        e.target.classList.contains("edit-btn")
    ) {

        const index =
            e.target.dataset.index

        noteTitle.value =
            notes[index].title

        noteDescription.value =
            notes[index].description

        editingNoteIndex = index

        addBtn.textContent =
            "Update Note"

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        })

    }

})


// Delete All Notes
deleteAllBtn.addEventListener("click", () => {

    const allCards =
        document.querySelectorAll(
            "#notescontainer > div"
        )

    allCards.forEach((card) => {

        card.style.opacity = "0"

        card.style.transform =
            "translateY(20px)"

        card.style.transition =
            "0.3s"

    })

    setTimeout(() => {

        notes = []

        saveNotes()

        renderNotes()

    }, 300)

})


// Initial Load
document.addEventListener(
    "DOMContentLoaded",
    () => {

        notes = loadNotes()

        renderNotes()

    }
)