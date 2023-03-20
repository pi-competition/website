export function testStatus() {
    return new Promise((resolve, reject) => {
        fetch("https://ctrl.ben-services.eu.org/api/ping").then((res) => {
            if (res.status === 200) {
                resolve(true)
            } else {
                resolve(false)
            }
        })
    })
}