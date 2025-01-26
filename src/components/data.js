'use strict';

SwampHacks.prototype.addRestaurant = function(data) {
  var collection = firebase.firestore().collection('restaurants');
  return collection.add(data);
};

SwampHacks.prototype.getAllRestaurants = function(renderer) {
  var query = firebase.firestore()
      .collection('restaurants')
      .orderBy('avgRating', 'desc')
      .limit(50);

  this.getDocumentsInQuery(query, renderer);
}

SwampHacks.prototype.getDocumentsInQuery = function(query, renderer) {
  query.onSnapshot(function(snapshot) {
    if (!snapshot.size) return renderer.empty(); // Display "There are no restaurants".

    snapshot.docChanges().forEach(function(change) {
      if (change.type === 'removed') {
        renderer.remove(change.doc);
      } else {
        renderer.display(change.doc);
      }
    });
  });
};

SwampHacks.prototype.getRestaurant = function(id) {
  return firebase.firestore().collection('Question').doc(Question).get();
};

