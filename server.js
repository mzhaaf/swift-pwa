/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */

const { ApolloServer, gql } = require('apollo-server-express');
const cookieSession = require('cookie-session');
const express = require('express');
const next = require('next');
const fs = require('fs');
const http = require('http');
const https = require('https');

const nextI18NextMiddleware = require('next-i18next/middleware').default;
const nextI18next = require('./src/lib/i18n');

const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

/* change the cerification files path as needed */
const privateKey = '/etc/letsencrypt/live/swiftpwa.testingnow.me/privkey.pem';
const certificate = '/etc/letsencrypt/live/swiftpwa.testingnow.me/cert.pem';

const schema = require('./src/api');
const root = require('./src/api/root');
const { expiredToken, SESSION_SECRET } = require('./swift.config');

(async () => {
    await app.prepare();
    const server = express();

    await nextI18next.initPromise;
    server.use(nextI18NextMiddleware(nextI18next));
    server.use(cookieSession({
        name: 'qwt-swift',
        keys: [SESSION_SECRET],
        maxAge: expiredToken,
    }));

    // handle server graphql endpoint use `/graphql`
    const serverGraph = new ApolloServer({
        schema,
        rootValue: root,
        context: ({ req }) => req,
        playground: {
            endpoint: '/graphql',
            settings: {
                'editor.theme': 'light',
            },
        },
    });
    serverGraph.applyMiddleware({ app: server });


    server.get('*', (req, res) => handle(req, res));

    if (
        process.env.NODE_ENV === 'production'
        && fs.existsSync(privateKey)
        && fs.existsSync(certificate)
    ) {
        const credentials = {
            key: fs.readFileSync(privateKey),
            cert: fs.readFileSync(certificate),
        };

        // https
        const httpsServer = https.createServer(credentials, server);
        await httpsServer.listen(3030);
        console.log('> Ready on https://localhost:3030'); // eslint-disable-line no-console

        // http
        const httpServer = http.createServer(server);
        await httpServer.listen(3000);
        console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
    } else {
        // http
        const httpServer = http.createServer(server);
        await httpServer.listen(3000);
        console.log('> Ready on http://localhost:3000'); // eslint-disable-line no-console
    }
})();
