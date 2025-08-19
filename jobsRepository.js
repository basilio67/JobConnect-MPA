const db = require('./database');

function getAllJobs(callback) {
  db.all('SELECT * FROM jobs', [], (err, rows) => {
    callback(err, rows);
  });
}

function addJob(title, description, callback) {
  db.run('INSERT INTO jobs (title, description) VALUES (?, ?)', [title, description], function(err) {
    callback(err, { id: this.lastID, title, description });
  });
}

module.exports = { getAllJobs, addJob };