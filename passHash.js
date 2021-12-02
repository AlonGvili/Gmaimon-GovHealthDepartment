const bcrypt = require("bcrypt")
 async function getPassHash(pass) {
    const hash = await bcrypt.hash(pass, 10)
    console.log(hash)
    return hash
}
console.log(getPassHash("123456").then(x => x))