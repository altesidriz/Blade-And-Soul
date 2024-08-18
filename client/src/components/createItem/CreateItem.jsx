import { useState, useEffect } from 'react';
import styles from './createItem.module.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase/firebase.js';
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const CreateItem = () => {
    const [image, setImage] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const navigte = useNavigate()

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'items/' + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {

                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPerc(Math.round(progress));

                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs(prev => {
                        return { ...prev, image: downloadURL }
                    });
                });
            }
        );
    }

    useEffect(() => {
        image && uploadFile(image)
    }, [image])

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post("/api/items", { ...inputs })
        res.status === 200 && navigte(`/shop/${res.data._id}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                {uploadPerc ?
                        (<div>Uploading....{uploadPerc}%</div>
                        ) : (
                            <input type='file' accept='image/*' onChange={e => setImage(e.target.files[0])} />)
                    }
                <input type="text" name='name' placeholder='Name...' onChange={handleChange}/>
                <input type="text" name='price' placeholder='Price..' onChange={handleChange}/>
                <input type="text" name='category' placeholder='Category' onChange={handleChange}/>
                <span onClick={handleUpload}>Create</span>
            </div>
        </div>
    )
}

export default CreateItem