import axios from "axios";

const handleDeletePicture = async (e, i, dispatch, arrayOfPictures) => {
    const payload = {
        id: arrayOfPictures[i].id,
        fileType: arrayOfPictures[i].fileType
    }
    await axios.post("http://192.168.0.149:4000/delete", payload).then(async (res) => {
        if (res.data.result === "success") {
            await axios.post("/api/pics/deletePic", { id: arrayOfPictures[i].id }).then((res) => {
                console.log(res.data.id)
                const newPicArray = arrayOfPictures.filter(pic => pic.id !== res.data.id)
                dispatch({
                    type: "SET_ARRAY_OF_PICTURES",
                    payload: newPicArray
                });
            })
        }
    })
}
export { handleDeletePicture }