module.exports = {
    apps: [
        {
            name: "PROJECT-NAME", // ie. contact-book
            script: "./dist/app.js",
            time: true,
            instances: 1,
            autorestart: true,
            max_restarts: 50,
            watch: false,
            max_memory_restart: "1G",
            env: {
                // ADD all env variables here
                PORT: process.env.PORT,
                MONGO_URI: process.env.MONGO_URI
            },
        },
    ],
    deploy: {
        production: {
            user: "SERVER-HOSTNAME", // ie. root
            host: "SERVER-IP-ADDRESS", // ie. 100.14.103.199
            key: "deploy.key",
            ref: "origin/master", // Change branch
            repo: "GITHUB-REPO", // ie. https://github.com/user/project-name
            path: "ROOT-FOLDER", // either /root/source or /home/user/source
            "pre-setup": "rm -rf /root/source/", // either /root/source or /home/user/source
            "post-setup": "npm install && npm install -D && mkdir config && cp ~/.env config/ && npm run build && pm2 reload ecosystem.config.js --env production && pm2 save && git checkout package-lock.json",
            env: {
                // ADD all env variables here
                NODE_ENV: "production",
                PORT: process.env.PORT,
                MONGO_URI: process.env.MONGO_URI
            }
        }
    }
};