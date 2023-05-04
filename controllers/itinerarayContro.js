const mongoose = require("mongoose");
const itineryModel = require("../models/itinerarySchema");
const TravellerModel = require("../models/userModel");

exports.createItinery = async (req, res) => {
  try {
    let data = req.body;
    // destination, travel dates, and a list of activities and accommodations
    let { destination, travelDates, activities, accommodations } = data;
    if (data.length == 0)
      return res.status(400).send({ status: false, message: "no data given" });
    if (!destination)
      return res
        .status(400)
        .send({ status: false, message: "no destination given" });
    if (!travelDates)
      return res
        .status(400)
        .send({ status: false, message: "no travelDates given" });
    if (!activities)
      return res
        .status(400)
        .send({ status: false, message: "no activities given" });
    if (!accommodations)
      return res
        .status(400)
        .send({ status: false, message: "no accommodations given" });
    const exprectedQueries = [
      "destination",
      "travelDates",
      "activities",
      "accommodations",
    ];
    let queries = Object.keys(data);
    let count = 0;
    for (let i = 0; i < queries.length; i++) {
      if (!exprectedQueries.includes(queries[i])) count++;
    }
    if (count > 0)
      return res.status(400).send({
        status: false,
        message:
          "queries can be only destination, travelDates, activities, accommodations",
      });

    userId = data.userId = req.userId;
    const itineryCreated = await itineryModel.create(data);

    return res.status(201).send({
      status: true,
      data: itineryCreated,
      message: "itinery created successfully",
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message }); 
  }
};

exports.getItinery = async (req, res) => {
  try {
    const getInfo = await itineryModel.find({ userId: req.userId }).populate({
      path: "userId",
      model: "Traveller",
      select: { _id: 0, name: 1, email: 1 },
    });

    if (!getInfo)
      return res.status(404).send({ status: false, message: "info not found" });
    // await SETEX_ASYNC(`${long}`,86400, JSON.stringify(getInfo));
    return res
      .status(200)
      .send({ status: true, message: "success Response", data: getInfo });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.updateItinery = async (req, res) => {
  try {
    let itineryId = req.params.Id;

    let data = req.body;
    let { destination, travelDates, activities, accommodations } = data;

    const exprectedQueries = [
      "destination",
      "travelDates",
      "activities",
      "accommodations",
    ];
    let queries = Object.keys(data);
    let count = 0;
    for (let i = 0; i < queries.length; i++) {
      if (!exprectedQueries.includes(queries[i])) count++;
    }
    if (count > 0)
      return res.status(400).send({
        status: false,
        message:
          "queries can be only destination, travelDates, activities, accommodations",
      });

    const updatedata = await itineryModel.findByIdAndUpdate(
      { _id: itineryId },
      {
        $set: {
          destination: destination,
          travelDates: travelDates,
          activities: activities,
          accommodations: accommodations,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "data is updated", data: updatedata });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

exports.deleteItinery = async (req, res) => {
  try {
    let itineryId = req.params.Id;
    if (!mongoose.isValidObjectId(itineryId))
      return res
        .status(400)
        .send({ status: false, message: "invlaid object Id " });
    let checkData = await itineryModel.findById(itineryId);
    if (!checkData)
      return res
        .status(404)
        .send({ status: false, message: "No Data found for this ID" });
    if (checkData.isDeleted == true)
      return res
        .status(400)
        .send({ status: false, message: "data already deleted" });
    await itineryModel.findOneAndUpdate(
      { _id: itineryId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res
      .status(200)
      .send({ status: true, message: "succesfully deleted" });
  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};
