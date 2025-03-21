import { useEffect, useState } from 'react';
import styles from './createNew.module.css';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../../firebase/firebase.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoCloseCircle } from "react-icons/io5";
import TextEditor from '../../../components/textEditor/TextEditor.jsx';

const CreateNew = ({ setOpenModal }) => {
    const [image, setImage] = useState(undefined);
    const [uploadPerc, setUploadPerc] = useState(0);
    const [inputs, setInputs] = useState({});
    const [editorContent, setEditorContent] = useState('');
    const [imageUrl, setImageUrl] = useState("");
    const [uploadTriggered, setUploadTriggered] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleUpload = () => {
        if (!image) return;

        const name = new Date().getTime() + image.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, `nnews/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadPerc(progress);
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageUrl(downloadURL);
                    setUploadTriggered(true);
                });
            }
        );
    };

    // useEffect(() => {
    //     const uploadFile = () => {
    //         const name = new Date().getTime() + image.name;
    //         const storage = getStorage(app);
    //         const storageRef = ref(storage, `nnews/${name}`);
    //         const uploadTask = uploadBytesResumable(storageRef, image);

    //         uploadTask.on('state_changed',
    //             (snapshot) => {
    //                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //                 setUploadPerc(progress);
    //                 switch (snapshot.state) {
    //                     case 'paused':
    //                         console.log('Upload is paused');
    //                         break;
    //                     case 'running':
    //                         console.log('Upload is running');
    //                         break;
    //                     default:
    //                         break;
    //                 }
    //             },
    //             (error) => {
    //                 console.log(error);
    //             },
    //             () => {
    //                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                     setImageUrl(downloadURL);
    //                     setUploadTriggered(true);
    //                 });
    //             }
    //         );
    //     };
    //     image && uploadFile();
    // }, [image]);

    const handleCreateNew = async () => {
        try {
            await axios.post('/api/news', {
                ...inputs,
                content: editorContent,
                image: imageUrl
            });
            setOpenModal(false);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.modal}>
                    <span onClick={() => setOpenModal(false)}><IoCloseCircle size={50} /></span>
                    <div className={styles.modalImage}>
                        <img src={imageUrl} alt="" />
                        {uploadPerc ?
                            (<div>Uploading....{uploadPerc}%</div>
                            ) : (
                                <>
                                <input type='file' accept='image/jpeg' onChange={e => setImage(e.target.files[0])} />
                                {image && !uploadTriggered && (
                                    <button className={styles.modalButton} onClick={handleUpload}>Upload</button>
                                )}
                                </>
                        )}
                    </div>
                    <div className={styles.modalText}>
                        <input type="text" name="title" id="title" placeholder='Tittle ..' onChange={handleChange} />
                        <select name="category" onChange={handleChange}>
                            <option value="">Select Category</option>
                            <option value="Sales">Sales</option>
                            <option value="Events">Events</option>
                            <option value="General">General</option>
                            <option value="General">Patch Notes</option>
                        </select>
                        <textarea type="text" name="desc" id="desc" placeholder='Description ..' onChange={handleChange} />
                        <button className={styles.modalButton} onClick={handleCreateNew}>Create New</button>
                    </div>
                </div>
                <TextEditor onChange={setEditorContent} />
            </div>
        </>
    );
};

export default CreateNew;