export default class JSONData {
  constructor(form) {
    const data = new FormData(form)

    data.forEach((val, key) => {
      this[key] = val
    })
  }
}
