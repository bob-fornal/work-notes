# Getters and Setters

```javascript
/*  Getter functions - bind any property to a function
    that will be called when that property is looked up.
    
    Setter functions - find an object property to a
    function to be called when there is an attempt to
    set that property source.
*/

class favorite {
  _songName = '';

  constructor(song) {
    this._songName = song;
  }

  get song() {
    return this._songName;
  }
  set newSong(updatedSong) {
    this._songName = updatedSong;
  }
}

const faveSong = new favorite('The Outside');
console.log(favorite.song); // 'The Outside'
favorite.newSong = 'No Chances';
console.log(favorite.song); // 'No Chances'
```