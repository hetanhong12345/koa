module.exports = {
    apps: [{
        name: "dev",
        script: "server.js",
        watch: true,
        env: {
            "NODE_ENV": "development",
        },
        env_production: {
            "NODE_ENV": "production"
        },
        ignore_watch: ['node_modules', 'views', 'static']
    },
        {
            name: "test",
            script: "server.js",
            env: {
                "NODE_ENV": "test",
            }
        },
        {
            name: "stage",
            script: "server.js",
            env: {
                "NODE_ENV": "stage",
            }
        },
        {
            name: "build",
            script: "server.js",
            env: {
                "NODE_ENV": "production",
            }
        }]
};
