//Register the ServiceWorker

if ('serviceWorker' in navigator) { 
  console.log('registration...');
  navigator.serviceWorker.register('service-worker.js', {
    scope: './'
  }).then(function(registration) {
    console.log('The service worker has been registered ', registration);
  });
}

//Listen for claiming of our ServiceWorker

navigator.serviceWorker.addEventListener('controllerchange', function(event) {
  console.log(
    '[controllerchange] A "controllerchange" event has happened ' +
    'within navigator.serviceWorker: ', event
  );
  
        var opendb = new Promise(function(resolve){
            console.log("promise...open db");
            resolve(openDb());
        });
        opendb.
                then(function(){
                    var objVins = getVins();
                    createCheckboxRegion(objVins);
                    createCheckboxDomaine(objVins);
                    createCheckboxCouleur(objVins);
                    addLignesVins(objVins);

                    $('#listevins .tablesorter').tablesorter({sortList: [[0, 0]], headers: {2: {sorter: 'digit'}}});

                    $("#resultats_recherche").hide();
                    $("#search").val("");
                    search(objVins);
                    showHideLines(objVins);
                    createPopup(objVins);
                    checkAll(objVins);
                    getRequiredFiles(objVins);
                }).
                then(function(files){
            console.log('[promise] '+files);
            navigator.serviceWorker.controller.postMessage(files);
        });
    
//Listen for changes in the state of our ServiceWorker

  navigator.serviceWorker.controller.addEventListener('statechange',
    function() {
      console.log('[controllerchange][statechange] ' +
        'A "statechange" has occured: ', this.state
      );
      
//If the ServiceWorker becomes “activated”, let the user know they can go offline!

      if (this.state === 'activated') {
    
        alert("Le mode hors ligne peut être activé !");
      }
    }
  );
});
