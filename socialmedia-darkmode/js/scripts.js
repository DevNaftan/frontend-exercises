const $switch = document.querySelector('.switch')
const $switchTitle = document.querySelector('.switch__title')
let mode = window.localStorage.getItem('mode')

function darkMode() {
  document.body.classList.add('dark-mode')
  document.body.classList.remove('light-mode')
  $switch.querySelector('strong').textContent = 'Dark Mode'
  window.localStorage.setItem('mode', 'dark')
}

function lightMode() {
  document.body.classList.add('light-mode')
  document.body.classList.remove('dark-mode')
  $switch.querySelector('strong').textContent = 'Light Mode'
  window.localStorage.setItem('mode', 'light')
}


if (mode) {
  document.body.classList.add(`${mode}-mode`)
  if (mode === 'dark') {
    $switch.querySelector('#checkbox').setAttribute('checked', true)
    $switch.querySelector('strong').textContent = `Dark Mode`
  } else if (mode === 'light')
    $switch.querySelector('strong').textContent = `Light Mode`
} else {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $switch.querySelector('#checkbox').setAttribute('checked', true)
    $switch.querySelector('strong').textContent = 'Dark Mode'
  } else {
    $switch.querySelector('strong').textContent = 'Light Mode'
  }
}


$switch.addEventListener('click', event => {
  if (event.target.checked) {
    darkMode()
  } else {
    lightMode()
  }
})