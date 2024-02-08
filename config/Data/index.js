
const min = 111
const max = 999
const UpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const specialCharacters = ['!', '@', '#', '$', '%']

const GeneratePassword = () => {

    const number = Math.floor(Math.random() * (max - min) + min)
    const spacialChar = specialCharacters[Math.floor(Math.random() * specialCharacters.length)]

    return `${UpperCase[Math.floor(Math.random() * UpperCase.length)]}${lowerCase[Math.floor(Math.random() * lowerCase.length)]}${lowerCase[Math.floor(Math.random() * lowerCase.length)]}${UpperCase[Math.floor(Math.random() * UpperCase.length)]}${spacialChar}${number}`

}

module.exports = { GeneratePassword }