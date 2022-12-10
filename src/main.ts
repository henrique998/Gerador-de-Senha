import './styles/global.scss'
import './styles/main.scss'

const passwordResultInput = document.querySelector<HTMLInputElement>('[data-element="password-result"]')
const slider = document.querySelector<HTMLInputElement>('[data-element="slider"]')
const passLength = document.querySelector('[data-element="pass-length"]')
const createButton = document.querySelector<HTMLButtonElement>('[data-element="create-button"]')
const passwordOptions = document.querySelectorAll<HTMLInputElement>('[data-element="password-option"]')
const copyToClipboadButton = document.querySelector<HTMLButtonElement>('[data-element="copy-to-clipboad-button"]')
const copyToClipboadIcon = document.querySelector<HTMLButtonElement>('[data-element="copy-to-clipboad-icon"]')

const options = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '1234567890',
    symbols: '^!$&|[](){}:;.,*+-#@<>~'
}

function setLength(e: any) {
    passLength.textContent = String(e.target.value).padStart(2, '0')
}

function createPass() {
    let password = ""
    let randomPassword = ""

    passwordOptions.forEach(option => {
        if (option.checked) {
            password += options[option.id]
        }
    })

    for (let i = 0; i < Number(slider.value); i++) {
        randomPassword += password[Math.floor(Math.random() * password.length)]
    }

    const generatedRandomPassword = randomPassword.split('undefined', 9).join('')

    passwordResultInput.value = generatedRandomPassword
}

function copyToClipboad() {
    if (passwordResultInput.value.length < 1) {
        return;
    }

    navigator.clipboard.writeText(passwordResultInput.value)

    copyToClipboadIcon.classList.remove('ph-copy-simple')
    copyToClipboadIcon.classList.add('ph-check')

    setTimeout(() => {
        copyToClipboadIcon.classList.remove('ph-check')
        copyToClipboadIcon.classList.add('ph-copy-simple')
    }, 2000)
}

slider!.addEventListener('input', setLength)
createButton!.addEventListener('click', createPass)
copyToClipboadButton!.addEventListener('click', copyToClipboad)