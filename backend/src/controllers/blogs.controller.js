const { getModel } = require('../config/db');

module.exports = (BlogModel) => {
  const PublishedBlogModel = getModel('publishedBlogs');
  const router = require('express').Router();

  router.get('/published', async (req, res) => {
    try {
      const result = await BlogModel.findAll({ where: { published: true } });

      return res.send(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the blog model do not hear you... or does not want to.'
      });
    }
  });

  router.put('/:id/publish', async (req, res) => {
    try {
      const { id } = req.params;
      const updateBlog = req.body;
      updateBlog.published = true;
      updateBlog.draftBlogId = id;
      await BlogModel.update(
        { published: true },
        {
          where: { id }
        }
      );
      /* const result = await BlogModel.update(
        { published: true },
        {
          where: { id }
        }
      );*/

      const foundItem = await PublishedBlogModel.findOne({ where: { draftBlogId: id } });
      if (!foundItem) {
        const result = await PublishedBlogModel.create(updateBlog);
        return res.send({ message: `${result}` });
      }

      const result = await PublishedBlogModel.update(updateBlog, {
        where: { id: foundItem.id }
      });
      return res.send({ message: `${result}` });
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  router.put('/:id/unpublish', async (req, res) => {
    try {
      const { id } = req.params;
      await BlogModel.update(
        { published: false },
        {
          where: { id }
        }
      );

      const result = await PublishedBlogModel.destroy({
        where: { draftBlogId: id }
      });
      return res.send({ message: `${result}` });
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  // get blog by url slug
  router.get('/published/:publishedUrl', async (req, res) => {
    try {
      const result = await BlogModel.findOne({ where: { publishedUrl: req.params.publishedUrl } });

      return res.send({ message: `${result}` });
    } catch (err) {
      return res.status(500).send({
        message: err.message || 'the model is ignoring you.'
      });
    }
  });

  return router;
};
