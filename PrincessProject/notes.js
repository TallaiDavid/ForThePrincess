document.addEventListener("DOMContentLoaded", () => {
  const notesArea = document.getElementById("notesArea");
  const clearBtn = document.getElementById("clearNotes");

  // Ha van korábbi jegyzet, töltsük vissza
  const savedNotes = localStorage.getItem("notesContent");
  if (savedNotes) {
    notesArea.value = savedNotes;
  }

  // Írás közben automatikusan mentse
  notesArea.addEventListener("input", () => {
    localStorage.setItem("notesContent", notesArea.value);
  });

  // Jegyzet törlése gombbal
  clearBtn.addEventListener("click", () => {
    if (confirm("Biztosan törlöd a jegyzetet?")) {
      notesArea.value = "";
      localStorage.removeItem("notesContent");
    }
  });
});
