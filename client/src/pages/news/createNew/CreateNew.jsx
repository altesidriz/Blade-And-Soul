import { useEffect, useState } from 'react';
import styles from './createNew.module.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoCloseCircle } from "react-icons/io5";


const CreateNew = ({ setOpenModal }) => {
    const [image, setImage] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        });
    };

    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, 'news/' + fileName);
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
        const res = await axios.post("/api/news", { ...inputs })
        setOpenModal(false)
        res.status === 200 && navigate(`/news/${res.data._id}`)
    }


    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <span onClick={()=>setOpenModal(false)}><IoCloseCircle size={50}/></span>
                <div className={styles.modalImage}>
                    {uploadPerc ?
                        (<div>Uploading....{uploadPerc}%</div>
                        ) : (
                            <input type='file' accept='image/jpeg' onChange={e => setImage(e.target.files[0])} />)
                    }
                </div>
                <div className={styles.modalText}>
                    <input type="text" name="title" id="title" placeholder='Tittle ..' onChange={handleChange} />
                    <input type="text" name="category" id="title" placeholder='Category ..' onChange={handleChange} />
                    <textarea type="text" name="desc" id="desc" placeholder='Description ..' onChange={handleChange} />
                    <button className={styles.modalButton} onClick={handleUpload}>Create New</button>
                </div>
            </div>
        </div>
    );
};

export default CreateNew;