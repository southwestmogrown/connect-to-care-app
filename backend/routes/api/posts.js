const express = require('express');
const {
  Post,
  FacilityAdmin,
  Facility,
  PostActivity,
  JobSeeker,
} = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll({
    include: [FacilityAdmin, Facility],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  res.json(posts);
});

router.get('/:id', async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });
  res.json(post);
});

router.post('/', async (req, res) => {
  const {
    userId,
    facilityId,
    department,
    position,
    specialQualifications,
    startDate,
    endDate,
    startTime,
    endTime,
    payRate,
  } = req.body;

  const newPost = await Post.create({
    userId,
    facilityId,
    department,
    position,
    specialQualifications,
    startDate,
    endDate,
    startTime,
    endTime,
    payRate,
  });

  const safePost = {
    userId: newPost.userId,
    facilityId: newPost.facilityId,
    department: newPost.department,
    position: newPost.position,
    specialQualifications: newPost.specialQualifications,
    startDate: newPost.startDate,
    endDate: newPost.endDate,
    startTime: newPost.startTime,
    endTime: newPost.endTime,
    payRate: newPost.payRate,
  };

  res.json(safePost);
});

router.put('/:id', async (req, res) => {
  const {
    userId,
    facilityId,
    department,
    position,
    specialQualifications,
    startDate,
    endDate,
    startTime,
    endTime,
    payRate,
  } = req.body;
  await Post.update(
    {
      userId,
      facilityId,
      department,
      position,
      specialQualifications,
      startDate,
      endDate,
      startTime,
      endTime,
      payRate,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.json({ message: 'Success' });
});

router.delete('/:id', async (req, res) => {
  await Post.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json({ message: 'success' });
});

router.get('/:id/activities', async (req, res) => {
  const activities = await PostActivity.findAll({
    where: {
      postId: req.params.id,
    },
    include: [Post, JobSeeker],
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  });

  res.json(activities);
});

router.post('/:id/activities', async (req, res) => {
  const { userId } = req.body;
  await PostActivity.create({
    postId: req.params.id,
    userId,
  });

  res.json({ message: 'success' });
});

module.exports = router;
