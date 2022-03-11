const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Post = require("./models/Post");
const Comment = require("./models/Comment");


const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [john, jane, tugol] = await User.create({
        email: 'john@test.com',
        password: '123',
        displayName: "John",
        token: '123123123'
    }, {
        email: 'jane@test.com',
        password: '123',
        displayName: "Jane",
        token: '456456456'
    }, {
        email: 'tugol@test.com',
        password: '321',
        displayName: "Tugolbai",
        token: '789789789'
    });

    const [johnPost, janePost, tugolPost] = await Post.create({
        title: 'First post',
        description: 'JOHN JOHN JOHN JOHN JOHN',
        dateTime: '2022-01-10T08:44:57.849Z',
        user: john
    }, {
        title: 'Seagate BarraCuda 4TB',
        image: 'jane.jpg',
        dateTime: '2022-02-10T21:30:57.849Z',
        user: jane
    }, {
        title: 'FORUM FORUM FORUM',
        description: 'LOREM LOREM LOREM',
        image: 'tugol.jpg',
        dateTime: '2022-03-10T17:44:57.849Z',
        user: tugol
    });

    await Comment.create({
        text: 'AMAZING',
        post: johnPost,
        user: jane
    }, {
        text: 'QWERTY',
        post: tugolPost,
        user: jane
    }, {
        text: 'AAAAAAAAAAAAAAAAA',
        post: tugolPost,
        user: john
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));