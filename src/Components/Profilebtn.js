// import React from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useState } from 'react';
import { snapshotEqual } from '@firebase/firestore';
import { db, app, storage } from './Firebase';
import { getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { ref } from "@firebase/storage";
import { getFirestore } from '@firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { auth} from "./Firebase"






const Profilebtn = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

export default function UploadButtons() {

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState('')

  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

    }

  };
  const handleUpload = () => {
  
    




    const storageRef = ref(storage, `images/${image.name}`)

    const uploadTask = uploadBytesResumable(storageRef, image);
    


    uploadTask.on(
      'state_changed',
      snapshot => { },
      error => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((




          
        ) => { console.log('image uploaded', url); setUrl(url)})
      }

    )
     

};

  const classes = Profilebtn();

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
      />
      <label htmlFor="contained-button-file">
      </label>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={handleChange} />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span"   >
          <PhotoCamera />
        </IconButton>
        <button onClick={handleUpload}> save</button>
      </label>
    </div>
  );
}






