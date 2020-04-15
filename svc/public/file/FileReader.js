const fs = require('fs')

export class FileReader {
  getContent(filepath){
    // return fs.readFileSync(filepath) // BUFFER (lazy)
    return fs.readFileSync(filepath, 'utf8') // string (eager)
  }
}

export const fileReader = new FileReader()

// 👿 extends / roszerzanie / dziedziczenie = A JEST B
// 😇 kompozycja / zawieranie = A ZAWIERA B

// composition over inheritance
