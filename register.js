// const { error } = require('console')
//Importing Node modules

function register(username, password) {
    return new Promise((resolve, reject) => {
      fs.readFile('database.txt', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          const users = data.split('\n');
          const existingUser = users.find(user => user.split(',')[0] === username);
  
          if (existingUser) {
            reject(new Error('User already exists'));
          } else {
            const newUser = `${username},${password}\n`;
            fs.appendFile('database.txt', newUser, err => {
              if (err) {
                reject(err);
              } else {
                resolve('Registration successful');
              }
            });
          }
        }
      });
    });
  }

  const fs = require('fs');

function createBlog(blogName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(blogName, (err) => {
      if (err) {
        if (err.code === 'EEXIST') {
          reject(new Error('Blog with that name already exists'));
        } else {
          reject(err);
        }
      } else {
        resolve('Blog created successfully');
      }
    });
  });
}

function createPost(postTitle, postContent, blogName) {
  return new Promise((resolve, reject) => {
    fs.access(blogName, (err) => {
      if (err) {
        reject(new Error('Blog does not exist'));
      } else {
        const fileName = postTitle.replace(/\s/g, '_');
        fs.writeFile(`${blogName}/${fileName}.txt`, postContent, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('Post created successfully');
          }
        });
      }
    });
  });
}

const fs = require('fs');

function likePost(blogName, postTitle, username) {
  return new Promise((resolve, reject) => {
    // Check if the user exists in the database
    fs.readFile('database.txt', 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const users = data.split('\n');
        const existingUser = users.find(user => user.split(',')[0] === username);

        if (!existingUser) {
          reject(new Error('User does not exist'));
        } else {
          // Find the post and update the likes counter and likedBy line
          const fileName = postTitle.replace(/\s/g, '_');
          fs.readFile(`${blogName}/${fileName}.txt`, 'utf8', (err, postContent) => {
            if (err) {
              reject(err);
            } else {
              const lines = postContent.split('\n');
              const likesLine = lines[0];
              const likes = parseInt(likesLine.split(' ')[1]) + 1;
              lines[0] = `Likes: ${likes}`;
              const likedByLine = lines[1];
              lines[1] = likedByLine.replace('you', `you,${username}`);
              const updatedPostContent = lines.join('\n');
              fs.writeFile(`${blogName}/${fileName}.txt`, updatedPostContent, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve('Post liked successfully');
                }
              });
            }
          });
        }
      }
    });
  });
}
