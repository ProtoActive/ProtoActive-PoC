import http from 'http';
import express from 'express';

const app_config = {
    entities: [
        {
            class: 'image_uploader',
            name: 'image-file-upload',
            button_desc: 'Submit',
            parent: 'body',
            type: 'file',
            api: '/upload'
        }
    ]
};

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

app.use(express.static('public'));

app.get(
    "/preference",
    function (req, res) {
        res.json(app_config).status(200);
    }
)

import add_image_uploader from './modules/add_image_uploader.js';

for (const entity of app_config.entities) {
    if (entity.class === 'image_uploader') {
        add_image_uploader(app, entity);
    }
}