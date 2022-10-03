const { uuid } = require("uuidv4");
var express = require("express");
var router = express.Router();

const { db } = require("../mongo");
const { _router } = require("../app");

const id = uuid();

///////////////////////////////////////////////////

router.get("/get-one/", async function (req, res, next) {
  const blogPosts = await db()
    .collection("blogs")
    .findOne({
      id: {
        $exists: true,
      },
    });
  res.json({
    success: true,
    blogs: blogPosts,
  });
});

router.get("/get-one-example", async function (req, res, next) {
  const blogPosts = await db()
    .collection("blogs")
    .findOne({
      id: {
        $exists: true,
      },
    });

  console.log(blogPosts);

  res.json({
    success: true,
    blogs: blogPosts,
  });
});

////////////////////////////////////////////////////

router.post("/create-one", async function (req, res, next) {
  try {
    const newPost = {
      title: req.body.title,
      text: req.body.text,
      author: req.body.author,
      email: req.body.email,
      categories: req.body.categories,
      starRating: Number(req.body.starRating),
    };

    await db().collection("blogs").insertOne();

    res.json({
      success: true,
      newPost,
    });
  } catch (e) {
    console.log(typeof(e))
    console.log(e)
    res.json({
      error: e.toString()
    })
  }
});

/////////////////////////////////////////////////////

router.delete('/delete-multi', async function (req, res){
  console.log(req.body);
const idsToDelete = req.body
  const deleteResult = await db().collection('blogs').deleteMany({
    id: {
      $in: idsToDelete
    }
  })
res.json({
  success: true,
  deleteResult: deleteResult
})
})


////////////////////////////////////////////////////

module.exports = router;
