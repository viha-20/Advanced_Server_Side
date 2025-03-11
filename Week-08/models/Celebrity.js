const celebrities = [
    { name: 'Emma Stone', age: 34, image: 'emma_stone.jpg', films: ['La La Land', 'Easy A', 'The Help'] },
    { name: 'Tom Hanks', age: 66, image: 'tom_hanks.jpg', films: ['Forrest Gump', 'Cast Away', 'Saving Private Ryan'] },
    { name: 'Dwayne Johnson', age: 50, image: 'dwayne_johnson.jpg', films: ['Jumanji', 'Fast & Furious', 'Moana'] },
  ];
  
  class Celebrity {
    static getAll() {
      return celebrities;
    }
  
    static getByName(name) {
      return celebrities.find(celebrity => celebrity.name.toLowerCase() === name.toLowerCase());
    }
  }
  
  module.exports = Celebrity;