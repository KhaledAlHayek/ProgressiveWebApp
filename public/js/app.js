if("serviceWorker" in navigator){
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service worker has been registered"))
    .catch(err => console.log(err));
}