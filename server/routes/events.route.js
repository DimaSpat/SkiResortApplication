const { Router } = require("express");
const router = Router();
const Events = require("../models/Events");
const sharp = require("sharp");
const multer = require("multer");
// const Image = require("../models/Image");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const convertToWebPAndSave = async (file) => {
  const webpBuffer = await sharp(file.buffer)
    .webp({ quality: 80 })
    .toBuffer();

  const imageDoc = {
    fullResData: webpBuffer,
    contentType: 'image/webp',
    filename: file.originalname,
  };

  // const imageDoc = new Image({
  //   fullResData: webpBuffer,
  //   contentType: 'image/webp',
  //   filename: file.originalname,
  // });
  //
  // await imageDoc.save();
  return imageDoc;
};

const createThumbnail = async (file) => {
  const thumbnailBuffer = await sharp(file.buffer)
    .resize(16, 16)
    .webp({ quality: 50 })
    .toBuffer();

  return thumbnailBuffer;
};

router.get("/", async (req, res) => {
  try {
    const events = await Events.find().lean();
    res.json(events);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error with fetching events" });
  }
});

router.post("/create", upload.array("file"), async (req, res) => {
  try {
    const { title, description, file } = req.body;
    console.log(file);
    console.log(req.body);
    const binaryData = Buffer.from(file, 'base64');
    console.log(typeof file)
    const thumbnailBuffer = await sharp(binaryData.buffer)
      .resize(16, 16)
      .webp({ quality: 50 })
      .toBuffer();
    const webpBuffer = await sharp(binaryData.buffer)
      .webp({ quality: 80 })
      .toBuffer();
    
    const event = new Events({
      title: form.title,
      description: form.description,
      thumbnail: thumbnailBuffer,
      webpImage: webpBuffer,
    });

    await event.save();
    console.log(2);
    console.log(event);

    res.json(form);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  {
    const { id } = req.params;
    try {
      await Events.findByIdAndDelete(id);
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }
});

router.post("/images/create", upload.array("images"), async (req, res) => {
  try {
    const files = req.files;
    const savedImages = [];

    for (let file of files) {
      const thumbnail = await createThumbnail(file);
      const webpImage = await convertToWebPAndSave(file);

      webpImage.thumbnailData = thumbnail;
      await webpImage.save();
      savedImages.push(webpImage);
    }

    res.status(200).json({ message: "Images uploaded successfully", images: savedImages });
  } catch (error) {
    console.error(error);
  }
});

// router.get("/images", async (req, res) => {
//   try {
//     const images = await Image.find().lean(); // Add .lean() to make it faster if it would work
//     res.status(200).json(images);
//   } catch (error) {
//     console.error(error);
//   }
// });
//
// router.get("/images/full/:id", async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//
//     if (!image || !image.fullResData) {
//       return res.status(404).json({ error: "Full resolution image is not found" });
//     }
//
//     res.set("Content-Type", image.contentType);
//     res.send(image.fullResData);
//   } catch (error) {
//     console.error(error);
//   }
// });
//
// router.get("/images/thumbnail/:id", async (req, res) => {
//   try {
//     const image = await Image.findById(req.params.id);
//
//     if (!image || !image.thumbnailData) {
//       return res.status(404).json({ error: "thumbnail not found" });
//     }
//
//     res.set("Content-Type", image.contentType);
//     res.send(image.thumbnailData);
//   } catch (error) {
//     console.error("Error fetching thumbnail: ", error);
//   }
// })
//
module.exports = router;
