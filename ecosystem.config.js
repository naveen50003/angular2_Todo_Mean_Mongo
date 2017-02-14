module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [

        // First application
        {
            name: "server.js",
            script: "./server.js",
            instances: 1,
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
                PORT: 4000

            },
            env_production: {
                NODE_ENV: "production",
                PORT: 3000
            }
        },

        // Second application
        /*{
    name: "WEB",
    script: "web.js"
}
*/
    ],

    /**
     * Deployment section
     * http://pm2.keymetrics.io/docs/usage/deployment/
     */
    deploy: {
        production: {
            user: "node",
            host: "212.83.163.1",
            ref: "origin/master",
            repo: "git@github.com:repo.git",
            path: "/var/www/production",
            "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env production"
        },
        dev: {
            user: "node",
            host: "212.83.163.1",
            ref: "origin/master",
            repo: "git@github.com:repo.git",
            path: "/var/www/development",
            "post-deploy": "npm install && pm2 startOrRestart ecosystem.json --env dev",
            env: {
                NODE_ENV: "dev"
            }
        }
    }
}
