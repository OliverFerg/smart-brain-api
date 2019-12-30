const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '726529a40e6045eeb6e4ce973bd58bb7'
});

const handleAPICall = (req, res) => {
  app.models
     .predict(clarifai.FACE_DETECT_MODEL, req.body.input)
     .then(data => {
       res.json(data);
    })
    .catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db, bcrypt) => {
    const { id } = req.body;
    db('users ').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to get entries'))
}
    
module.exports = {
    handleImage: handleImage,
    handleAPICall: handleAPICall
};
        