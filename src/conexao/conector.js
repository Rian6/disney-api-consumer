export const get = async (local) => {

    let response = []
    await fetch('https://api.disneyapi.dev/' + local)
        .then(res => res.json())
        .then(
            (result) => {
                try {
                    response = result;
                } catch (e) {
                    console.log(e)
                }
            },
            (error) => {
                console.log(error)
            }
        )
    return response
}