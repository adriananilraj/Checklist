const getLocalStorage = () => {
  const storage = localStorage.getItem('checklist-storage')
  if (storage === null) return
  const formJSONStorage = JSON.parse(storage)

  formJSONStorage.map(form => {
    const container = document.getElementById('checklist-container')
    var newDiv = document.createElement("div")
    newDiv.classList.add("w-1/2", "rounded", "overflow-hidden", "shadow-lg", "p-4")
    var innerHTML = `
        <div class="flex items-center">
        <div class="input-box px-4">
          <input type="checkbox" name="" id=checkid-${form.id}>
        </div>
        <div class="flex flex-col">
          <h3 class="text-lg font-bold">${form.projectName}</h3>
          <p>${form.name}</p>
          <a class='text-sky-500 underline' href=${form.link}>Link</a>
        </div>
      </div>
      `
      newDiv.innerHTML = innerHTML
      container.appendChild(newDiv)
    })
}

const addTask = () => {
  let valueName = document.getElementById('task-id').value
  let valueLink = document.getElementById('link-id').value
  let projectName = document.getElementById('family-project').value
  let checkBoxCounter = Math.floor(Math.random() * (1 - 100 + 1)) + 100
  const container = document.getElementById('checklist-container')
  var newDiv = document.createElement("div")
  newDiv.classList.add("w-1/2", "rounded", "overflow-hidden", "shadow-lg", "p-4")
  var innerHTML = `
      <div class="flex items-center">
      <div class="input-box px-4">
        <input type="checkbox" name="" id=checkid-${checkBoxCounter}>
      </div>
      <div class="flex flex-col">
        <h3 class="text-lg font-bold">${projectName}</h3>
        <p>${valueName}</p>
        <a class='text-sky-500 underline' href=${valueLink}>Link</a>
      </div>
    </div>
    `
    let arry = []
    let storage = localStorage.getItem('checklist-storage')
    if (!storage) {
      arry = []
    } else {
      arry = JSON.parse(storage)
    }
    arry.push({
      id: checkBoxCounter,
      name: valueName,
      link: valueLink,
      projectName: projectName
    })
    localStorage.setItem('checklist-storage', JSON.stringify(arry))
    if (valueLink === '' && valueName === '') return false
    newDiv.innerHTML = innerHTML
    container.appendChild(newDiv)
    document.getElementById('task-id').value = ''
    document.getElementById('link-id').value = ''
}

const removeTask = () => {
  let checkboxes = document.querySelectorAll("input[type='checkbox']")
  let storage = JSON.parse(localStorage.getItem('checklist-storage'))
  checkboxes.forEach((e) => {
    if (e.checked) {
      let getCheckedID = e.id.replace("checkid-", "")
      storage = storage.filter(value => value.id !== ~~getCheckedID)
      localStorage.setItem('checklist-storage', JSON.stringify(storage))
      var parent = e.parentElement;
      while (parent !== null && !parent.classList.contains("w-1/2")) {
        parent = parent.parentElement;
      }
      // Log the highest parent element with the specified class
      if (parent !== null) parent.remove()
    }
  })
}
getLocalStorage()