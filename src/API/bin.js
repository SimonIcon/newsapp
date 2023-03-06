  const storageRef = storage.ref();
             const imagesRef = storageRef.child('userProfiles');
             const fileRef = imagesRef.child(file.name);

           // Upload the file and track the upload progress
          const uploadTask = fileRef.put(imageUrl);
         uploadTask.on('state_changed', (snapshot) => {
       // Calculate the upload progress as a percentage
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);

  // You could update the UI with the upload progress here
         }, (error) => {
         console.log(error);
          }, async () => {
  // Once the upload is complete, get the download URL and set the state
          const url = await fileRef.getDownloadURL();
          setImageUrl(url);
       });
   

    // Sign up user with email and password
        const auth = getAuth();
         createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
            setUserId(userCredential.user.uid);
               // ...
           })
           .catch((error) => {
               const errorCode = error.code;
              const errorMessage = error.message;
                 // ..
              });
             // Store data in Firestore
             const db = getFirestore();
           await db.collection('userDetails').doc(userId).set({
           username:username,
           email:email,
           profilePicture:imageUrl,
          });
