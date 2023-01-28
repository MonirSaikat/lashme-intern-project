## Available routes

### Non protected routes
- /auth/register post: { name, username, password, confirm_password }
- /auth/login post: { username, password }

### Protected routes
- /posts get
- /posts post { title, body }
- /posts/:id -> get, delete
- /users post { name, username, password, confirm_password }
- /users/:id get 
- /users/:id delete
- /users/:username/follow post 
- /users/:username/unfollow delete

    


