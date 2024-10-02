const fs = require('fs')

const fs = require('fs');
const promisify = require('util').promisify;

const readFileB = promisify(fs.readFile);
const appendFileB = promisify(fs.appendFile);

function new_register(username, password) {
  return readFileB('database.txt', 'utf8')
    .then(data => {
      const users = data.split('\n');
      const currentUser = users.find(user => user.split(',')[0] === username);

      if (currentUser) {
        throw new Error('User already exists');
      } else {
        const newRegisteredUser = `${username},${password}\n`;
        return appendFileB('database.txt', newRegisteredUser);
      }
    })
    .then(() => {
      return 'Your registration is completed';
    })
    .catch(err => {
      throw err;
    });
}
// This function will create a new directory, if that directorey already exists it will send an error message to the user
const mkdirN = promisify(fs.mkdir);

function createBlog(blogName) {
  return mkdirN(blogName)
    .then(() => {
      return 'Your Blog has been created';
    })
    .catch(err => {
      if (err.code === 'EEXIST') {
        throw new Error('That Blog already exists');
      } else {
        throw err;
      }
    });
}

const accessN = promisify(fs.access);
const writeFileN = promisify(fs.writeFile);

function createPost(postTitle, postContent, blogName) {
  return accessN(blogName)
    .then(() => {
      const fileName = postTitle.replace(/\s/g, '_');
      return writeFileN(`${blogName}/${fileName}.txt`, postContent);
    })
    .then(() => {
      return 'Post created successfully';
    })
    .catch(err => {
      throw err;
    });
}

const readFileO = promisify(fs.readFile);
const writeFileO = promisify(fs.writeFile);   


function likePost(blogName, postTitle, username) {
  return readFileO('database.txt', 'utf8')
    .then(data => {
      const users = data.split('\n');
      const existingUser = users.find(user => user.split(',')[0] === username);

      if (!existingUser) {
        throw new Error('User does not exist');
      } else {
        const fileName = postTitle.replace(/\s/g, '_');
        return readFileO(`${blogName}/${fileName}.txt`, 'utf8');
      }
    })
    .then(postContent => {
      const lines = postContent.split('\n');
      const likesLine = lines[0];
      const likes = parseInt(likesLine.split(' ')[1]) + 1;
      lines[0] = `Likes: ${likes}`;
      const likedByLine = lines[1];
      lines[1] = likedByLine.replace('you', `you,${username}`);
      const updatedPostContent = lines.join('\n');
      return writeFileO(`${blogName}/${fileName}.txt`, updatedPostContent);
    })
    .then(() => {
      return 'Post liked successfully';
    })
    .catch(err => {
      throw err;
    });
}