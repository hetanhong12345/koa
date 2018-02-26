module.exports = {
    apps: [{
        name: "dev",
        script: "app.js",
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
            script: "app.js",
            env: {
                "NODE_ENV": "test",
            }
        },
        {
            name: "stage",
            script: "app.js",
            env: {
                "NODE_ENV": "stage",
            }
        },
        {
            name: "build",
            script: "app.js",
            env: {
                "NODE_ENV": "production",
            }
        }]
};
